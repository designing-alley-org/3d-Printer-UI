import { Box, CircularProgress, TextField } from '@mui/material';
import CustomButton from '../../stories/button/CustomButton';
import Pin from './Pin';
import ImagePreview from './ImagePreview';
import FilePreview from './FilePreview';
import { formatChatTime } from '../../utils/function';
import LoadingScreen from '../LoadingScreen';
import MessageUI from './MessageUI';
import { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import {
  getUserChat,
  sendMessage,
  setCurrentTicketId,
  clearChatData,
} from '../../store/Slice/chatSlice';
import { hideInput } from '../../constant/const';
import { markNotificationAsRead } from '../../store/Slice/notificationSlice';
import PriceTable from '../../pages/PriceChart/PriceTabel';
import { getCheckoutDetailsService } from '../../services/order';
import { useSearchParams } from 'react-router-dom';
import NegotiationTabel from '../NegotiationTabel';
import { acceptDiscount } from '../../store/Slice/discountSlicer';
import { resolveQuery, updateHelpStatus } from '../../store/Slice/querySlice';
import { PriceTableProps } from '../../types/priceChart';

interface ChatUIProps {
  isOpen: boolean | undefined;
  status: string;
  type: string | undefined;
  orderNumber: string | undefined;
  helpId: string | undefined;
}

type fetchOrderProps = {
  orderNumber: string;
  setData: React.Dispatch<React.SetStateAction<PriceTableProps>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  conversationId?: string;
};

const fetchOrder = async ({
  orderNumber,
  setData,
  setIsLoading,
  conversationId,
}: fetchOrderProps) => {
  const response = await getCheckoutDetailsService({ orderNumber, conversationId });
  setData(response);
  setIsLoading(false);
};

const ChatUI = ({ isOpen, status, type, orderNumber, helpId }: ChatUIProps) => {
  const [messageInput, setMessageInput] = useState('');
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const { chatData, loading, sendingMessage } = useSelector(
    (state: RootState) => state.chat
  );
  const conversationId = searchParams.get('conversationId') || '';

  const messages = Array.isArray(chatData) ? chatData : [];

  const { user } = useSelector((state: RootState) => state.user);

  const [data, setData] = useState<PriceTableProps>({
    subtotal: 0,
    taxes: 0,
    taxRate: 0,
    fileTable: [],
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (orderNumber && isOpen && conversationId)
      fetchOrder({ orderNumber, setData, setIsLoading, conversationId });
  }, [orderNumber, isOpen, conversationId]);

  useEffect(() => {
    if (!conversationId || !user?._id || !Array.isArray(messages)) return;

    const unreadMessages = messages.filter(
      (msg) => !msg.readBy.includes(user._id) && msg.sender !== user._id
    );

    if (unreadMessages.length > 0) {
      for (const msg of unreadMessages) {
        dispatch(
          markNotificationAsRead({ messageId: msg._id, conversationId })
        );
      }
    }
  }, [messages, dispatch, conversationId, user?._id]);

  // useRef and useEffect to scroll to bottom on new message
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]); // Scroll when messages change

  // Fetch chat data when conversationId changes
  useEffect(() => {
    if (conversationId && isOpen) {
      // Clear previous chat data when switching conversations
      dispatch(clearChatData());
      dispatch(setCurrentTicketId(conversationId));
      dispatch(getUserChat(conversationId));
    }
  }, [dispatch, conversationId, isOpen]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      (!messageInput.trim() &&
        selectedImages.length === 0 &&
        selectedFiles.length === 0) ||
      !conversationId
    )
      return;

    try {
      // Send message with files - let the dispatch handle all S3 upload logic
      await dispatch(
        sendMessage({
          conversationId,
          message: messageInput.trim(),

          messageType: 'text', // This will be determined in the dispatch based on files
          selectedImages:
            selectedImages.length > 0 ? selectedImages : undefined,
          selectedFiles: selectedFiles.length > 0 ? selectedFiles : undefined,
          setUploadProgress,
        })
      ).unwrap(); // Use unwrap() to catch dispatch errors

      // Clear inputs only after successful send
      setMessageInput('');
      setSelectedImages([]);
      setSelectedFiles([]);
      setUploadProgress(0); // Reset upload progress
    } catch (error) {
      console.error('Error in handleSendMessage:', error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e as any);
    }
  };

  const handleImageSelect = (files: File[]) => {
    setSelectedImages((prev) => [...prev, ...files]);
  };

  const handleRemoveImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveAllImages = () => {
    setSelectedImages([]);
  };

  const handleFileSelect = (files: File[]) => {
    setSelectedFiles((prev) => [...prev, ...files]);
  };

  const handleRemoveFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveAllFiles = () => {
    setSelectedFiles([]);
  };

  const handelAcceptDiscount = async () => {
    await dispatch(
      acceptDiscount(data.discountAvailable!._id)
    ).unwrap();

    await dispatch(
      resolveQuery(helpId || '')
    ).unwrap();

    await dispatch(
      updateHelpStatus({
        conversationId: conversationId || '',
        status: 'Resolved',
      })
    );

    setData((prevData) => ({
      ...prevData,
      discountAvailable: prevData.discountAvailable
        ? { ...prevData.discountAvailable, isUserAccepted: true }
        : prevData.discountAvailable,
    }));
    
  };

  if (loading && messages.length === 0) {
    return <LoadingScreen />;
  }

  return (
    <Box>
      {/* Chat UI components go here */}
      <Box
        ref={chatContainerRef}
        minHeight={300}
        maxHeight={400}
        overflow="auto"
        borderColor="grey.300"
        borderRadius={0.5}
        p={2}
      >
        {/* If type is Negotiation */}
        {type === 'Negotiation' && (
          <Box mb={2}>
            {isLoading ? (
              <Box display={'flex'} justifyContent={'center'}>
                <CircularProgress size={20} color="primary" />
              </Box>
            ) : (
              <PriceTable
                subtotal={data?.subtotal || 0}
                taxRate={data?.taxRate || 0}
                fileTable={data?.fileTable || []}
              />
            )}
          </Box>
        )}
        <Box ref={messagesEndRef}>
          {messages.map((msg, index) => (
            <MessageUI
              key={msg._id || index}
              message={msg?.message || ''}
              date={formatChatTime(msg?.createdAt)}
              isSender={msg?.sender === user?._id}
              attachments={msg?.attachments || []}
            />
          ))}
          {/* Empty div to scroll to bottom */}
        </Box>

        {type === 'Negotiation' && data.discountAvailable && (
          <Box
            mt={2}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'start',
            }}
          >
            <NegotiationTabel data={data} onAccept={handelAcceptDiscount} />
          </Box>
        )}
      </Box>

      {/* Input */}
      {!hideInput.includes(status) && (
        <Box
          component={'form'}
          display={'flex'}
          gap={2}
          mt={2}
          onSubmit={handleSendMessage}
        >
          <Box
            sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1 }}
          >
            {/* Image Preview */}
            {selectedImages.length > 0 && (
              <ImagePreview
                files={selectedImages}
                onRemove={handleRemoveImage}
                onRemoveAll={handleRemoveAllImages}
                isSending={sendingMessage}
              />
            )}

            {/* File Preview */}
            {selectedFiles.length > 0 && (
              <FilePreview
                files={selectedFiles}
                onRemove={handleRemoveFile}
                onRemoveAll={handleRemoveAllFiles}
                isSending={sendingMessage}
              />
            )}

            {/* Text Input - show when no images/files selected, or always if user wants to add message */}
            {selectedImages.length === 0 && selectedFiles.length === 0 && (
              <TextField
                type="text"
                placeholder="Type your message..."
                variant="outlined"
                fullWidth
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={sendingMessage}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    height: '40px',
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <Pin
                      onImageSelect={handleImageSelect}
                      onDocumentSelect={handleFileSelect}
                    />
                  ),
                }}
              />
            )}
          </Box>

          <CustomButton
            children={
              sendingMessage && uploadProgress > 0 && uploadProgress < 100
                ? `Uploading... ${uploadProgress}%`
                : sendingMessage
                  ? 'Sending...'
                  : 'Send'
            }
            variant="contained"
            color="primary"
            type="submit"
            disabled={
              (!messageInput.trim() &&
                selectedImages.length === 0 &&
                selectedFiles.length === 0) ||
              sendingMessage
            }
            sx={{
              borderRadius: '8px',
              height: '40px',
              alignSelf: 'flex-end',
            }}
          />
        </Box>
      )}

      {hideInput.includes(status) && (
        <Box mt={2} textAlign={'center'}>
          <em>You can't send messages in this status: {status}</em>
        </Box>
      )}
    </Box>
  );
};

export default ChatUI;
