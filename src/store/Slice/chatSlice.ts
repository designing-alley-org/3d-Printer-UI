import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserChatService, sendMessageService } from '../../services/chat';
import { ChatPayload, SendMessageRequest, MessageType } from '../../types/chat';
import toast from 'react-hot-toast';
import { returnError } from '../../utils/function';
import { getSignedUrl, uploadFromS3, deleteFromS3 } from '../../services/s3';
import { Pagination } from '../../types';

// Async thunk for fetching user chat
export const getUserChat = createAsyncThunk(
  'chat/getUserChat',
  async (id: string, { rejectWithValue }) => {
    try {
      const data = await getUserChatService(id);
      return { id, messages: data };
    } catch (error: any) {
      toast.error(returnError(error) || 'Failed to fetch chat messages');
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch chat messages'
      );
    }
  }
);

// Async thunk for sending a message
export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async (messageData: SendMessageRequest, { rejectWithValue }) => {
    const uploadedS3Keys: string[] = []; // Track uploaded files for cleanup on error

    try {
      let messageType: MessageType = 'text';
      let attachments: any[] = [];

      // Handle image uploads if selectedImages provided
      if (messageData.selectedImages && messageData.selectedImages.length > 0) {
        const imageAttachments = await Promise.all(
          messageData.selectedImages.map(async (file) => {
            try {
              const s3URL = await getSignedUrl(file.name, 'image', file.type);

              // Upload file to S3
              await uploadFromS3(file, s3URL.url, (progress) => {
                if (messageData.setUploadProgress) {
                  messageData.setUploadProgress(progress);
                }
              });

              // Track uploaded file key for potential cleanup
              uploadedS3Keys.push(s3URL.key);

              return {
                type: 'image',
                url: s3URL.storeUrl,
                filename: file.name,
                size: file.size,
              };
            } catch (error) {
              console.error(`Error uploading image ${file.name}:`, error);
              throw new Error(`Failed to upload image: ${file.name}`);
            }
          })
        );

        attachments = [...attachments, ...imageAttachments];
        messageType = 'image';
      }

      // Handle file uploads if selectedFiles provided
      if (messageData.selectedFiles && messageData.selectedFiles.length > 0) {
        const fileAttachments = await Promise.all(
          messageData.selectedFiles.map(async (file) => {
            try {
              const isSTLFile = file.name.toLowerCase().endsWith('.stl');
              const s3URL = await getSignedUrl(
                file.name,
                isSTLFile ? 'stl' : 'document',
                file.type
              );

              // Upload file to S3
              await uploadFromS3(file, s3URL.url, (progress) => {
                if (messageData.setUploadProgress) {
                  messageData.setUploadProgress(progress);
                }
              });

              // Track uploaded file key for potential cleanup
              uploadedS3Keys.push(s3URL.key);

              return {
                type: file.name.split('.').pop()?.toLowerCase() || 'file',
                url: s3URL.storeUrl,
                filename: file.name,
                size: file.size,
              };
            } catch (error) {
              console.error(`Error uploading file ${file.name}:`, error);
              throw new Error(`Failed to upload file: ${file.name}`);
            }
          })
        );

        attachments = [...attachments, ...fileAttachments];
        // If no images, set messageType to 'file'
        if (messageType === 'text') {
          messageType = 'file';
        }
      }

      // Prepare message data for API (remove selectedImages and selectedFiles)
      const { selectedImages, selectedFiles, ...apiMessageData } = messageData;

      // Add attachments and messageType to the API call
      const finalMessageData = {
        ...apiMessageData,
        messageType,
        attachments: attachments.length > 0 ? attachments : undefined,
      };

      const data = await sendMessageService(finalMessageData);
      return { ticketId: messageData.conversationId, message: data };
    } catch (error: any) {
      console.error('Error in sendMessage:', error);

      // Cleanup uploaded files from S3 if message sending failed
      if (uploadedS3Keys.length > 0) {
        console.log('Cleaning up uploaded files from S3...');

        // Delete uploaded files from S3
        await Promise.all(
          uploadedS3Keys.map(async (key) => {
            try {
              await deleteFromS3(key);
              console.log(`Successfully deleted ${key} from S3`);
            } catch (deleteError) {
              console.error(`Failed to delete ${key} from S3:`, deleteError);
            }
          })
        );
      }

      toast.error(returnError(error) || 'Failed to send message');
      return rejectWithValue(
        error.response?.data?.message || 'Failed to send message'
      );
    }
  }
);

interface ChatState {
  chatData: ChatPayload[];
  loading: boolean;
  sendingMessage: boolean;
  error: string | null;
  currentTicketId: string | null;
}

const initialState: ChatState = {
  chatData: [],
  loading: false,
  sendingMessage: false,
  error: null,
  currentTicketId: null,
};

export const ChatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCurrentTicketId: (state, action) => {
      state.currentTicketId = action.payload;
    },
    clearChatData: (state) => {
      state.chatData = [];
      state.currentTicketId = null;
    },
    // Action to add auto-response messages (for simulation)
    addAutoResponse: (state, action) => {
      const { message } = action.payload;
      state.chatData.push(message);
    },
  },
  extraReducers: (builder) => {
    builder
      // Get user chat cases
      .addCase(getUserChat.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserChat.fulfilled, (state, action) => {
        state.loading = false;
        state.chatData = action.payload.messages;
        state.error = null;
      })
      .addCase(getUserChat.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Send message cases
      .addCase(sendMessage.pending, (state) => {
        state.sendingMessage = true;
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.sendingMessage = false;
        const { message } = action.payload;
        if (!state.chatData) {
          state.chatData = [];
        }
        state.chatData.push(message);
        state.error = null;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.sendingMessage = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  clearError,
  setCurrentTicketId,
  clearChatData,
  addAutoResponse,
} = ChatSlice.actions;

export default ChatSlice.reducer;
