import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserChatService, sendMessageService } from '../../services/chat';
import { ChatPayload, SendMessageRequest } from '../../types/chat';
import toast from 'react-hot-toast';
import { returnError } from '../../utils/function';

// Async thunk for fetching user chat
export const getUserChat = createAsyncThunk(
  'chat/getUserChat',
  async (ticketId: string, { rejectWithValue }) => {
    try {
      const data = await getUserChatService(ticketId);
      return { ticketId, messages: data };
    } catch (error: any) {
      toast.error(returnError(error) || 'Failed to fetch chat messages');
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch chat messages');
    }
  }
);

// Async thunk for sending a message
export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async (messageData: SendMessageRequest, { rejectWithValue }) => {
    try {
      const data = await sendMessageService(messageData);
      return { ticketId: messageData.conversationId, message: data };
    } catch (error: any) {
      toast.error(returnError(error) || 'Failed to send message');
      return rejectWithValue(error.response?.data?.message || 'Failed to send message');
    }
  }
);

interface ChatState {
  chatData: Record<string, ChatPayload[]>; 
  loading: boolean;
  sendingMessage: boolean;
  error: string | null;
  currentTicketId: string | null;
}

const initialState: ChatState = {
  chatData: {},
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
      state.chatData = {};
      state.currentTicketId = null;
    },
    // Action to add auto-response messages (for simulation)
    addAutoResponse: (state, action) => {
      const { ticketId, message } = action.payload;
      if (state.chatData[ticketId]) {
        state.chatData[ticketId].push(message);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Get user chat cases
      .addCase(getUserChat.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserChat.fulfilled, (state, action) => {
        state.loading = false;
        const { ticketId, messages } = action.payload;
        state.chatData[ticketId] = messages;
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
        const { ticketId, message } = action.payload;
        if (!state.chatData[ticketId]) {
          state.chatData[ticketId] = [];
        }
        state.chatData[ticketId].push(message);
        state.error = null;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.sendingMessage = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, setCurrentTicketId, clearChatData, addAutoResponse } = ChatSlice.actions;

export default ChatSlice.reducer;