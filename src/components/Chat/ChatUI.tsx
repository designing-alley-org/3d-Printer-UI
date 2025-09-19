import { Box, TextField } from '@mui/material';
import CustomButton from '../../stories/button/CustomButton';
import Pin from './Pin';
import ImagePreview from './ImagePreview';
import FilePreview from './FilePreview';
import { formatChatTime, formatDate } from '../../utils/function';
import LoadingScreen from '../LoadingScreen';
import MessageUI from './MessageUI';
import { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { getUserChat, sendMessage, setCurrentTicketId } from '../../store/Slice/chatSlice';
import { MessageType } from '../../types/chat';

interface ChatUIProps {
  isOpen: boolean | undefined;
  conversationId: string;
}

const ChatUI = ({ isOpen, conversationId }: ChatUIProps) => {
    const [messageInput, setMessageInput] = useState('');
    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const dispatch = useDispatch<AppDispatch>();
    const { chatData, loading, sendingMessage } = useSelector((state: RootState) => state.chat);

    const { user } = useSelector((state: RootState) => state.user);

    // Get messages for current conversation
    const messages = chatData[conversationId] || [];

    // useRef and useEffect to scroll to bottom on new message
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ 
            behavior: "smooth",
            block: "end"
        });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]); // Scroll when messages change

    // Fetch chat data when conversationId changes
    useEffect(() => {
        if (conversationId && isOpen) {
            dispatch(setCurrentTicketId(conversationId));
            dispatch(getUserChat(conversationId));
        }
    }, [dispatch, conversationId, isOpen]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();

        if ((!messageInput.trim() && selectedImages.length === 0 && selectedFiles.length === 0) || !conversationId) return;

        let messageType : MessageType = 'text';
        
        // Convert images to attachments (for now, we'll create mock URLs)
        const imageAttachments = selectedImages.map((file) => ({
            type: 'image',
            url: URL.createObjectURL(file), // In production, upload to server first
            filename: file.name,
            size: file.size
        }));

        // If there are images, set messageType to 'image'
        if (imageAttachments.length > 0) {
            messageType = 'image';
        }
        
        // Convert files to attachments
        const fileAttachments = selectedFiles.map((file) => ({
            type: file.name.split('.').pop()?.toLowerCase() || 'file',
            url: URL.createObjectURL(file), // In production, upload to server first
            filename: file.name,
            size: file.size
        }));

        // If there are files (and no images), set messageType to 'file'
        if (fileAttachments.length > 0 && imageAttachments.length === 0) {
            messageType = 'file';
        }

        
        // Combine all attachments
        const allAttachments = [...imageAttachments, ...fileAttachments];
        
        // Create message text
        let messageText = messageInput.trim();
     
        dispatch(sendMessage({
            conversationId,
            message: messageText,
            messageType,
            attachments: allAttachments.length > 0 ? allAttachments : undefined,
        }));
        setMessageInput(''); // Clear input after sending
        setSelectedImages([]); // Clear selected images after sending
        setSelectedFiles([]); // Clear selected files after sending
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage(e as any);
        }
    };

    const handleImageSelect = (files: File[]) => {
        setSelectedImages(prev => [...prev, ...files]);
    };

    const handleRemoveImage = (index: number) => {
        setSelectedImages(prev => prev.filter((_, i) => i !== index));
    };

    const handleRemoveAllImages = () => {
        setSelectedImages([]);
    };

    const handleFileSelect = (files: File[]) => {
        setSelectedFiles(prev => [...prev, ...files]);
    };

    const handleRemoveFile = (index: number) => {
        setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    };

    const handleRemoveAllFiles = () => {
        setSelectedFiles([]);
    };

    if ( loading) {
        return <LoadingScreen />;
    }




  return (
    <Box>
      {/* Chat UI components go here */}
      <Box minHeight={300} maxHeight={400} overflow="auto"  borderColor="grey.300" borderRadius={0.5} p={2}>
        {messages.map((msg, index) => (
          <MessageUI
            key={index} 
            message={msg.message || ''} 
            date={formatChatTime(msg.createdAt)} 
            isSender={msg.sender === user?._id}
            attachments={msg.attachments || []}
          />
        ))}
        {/* Empty div to scroll to bottom */}
        <div ref={messagesEndRef} />
      </Box>

      {/* Input */}
      <Box component={'form'} display={'flex'} gap={2} mt={2} onSubmit={handleSendMessage}>
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
          {/* Image Preview */}
          {selectedImages.length > 0 && (
            <ImagePreview
              files={selectedImages}
              onRemove={handleRemoveImage}
              onRemoveAll={handleRemoveAllImages}
            />
          )}
          
          {/* File Preview */}
          {selectedFiles.length > 0 && (
            <FilePreview
              files={selectedFiles}
              onRemove={handleRemoveFile}
              onRemoveAll={handleRemoveAllFiles}
            />
          )}
          
          {/* Text Input - show when no images/files selected, or always if user wants to add message */}
          {(selectedImages.length === 0 && selectedFiles.length === 0) && (
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
                endAdornment: <Pin onImageSelect={handleImageSelect} onDocumentSelect={handleFileSelect} />,
              }}
            />
          )}
        </Box>
        
        <CustomButton
          children={sendingMessage ? "Sending..." : "Send"}
          variant="contained"
          color="primary"
          type="submit"
          disabled={(!messageInput.trim() && selectedImages.length === 0 && selectedFiles.length === 0) || sendingMessage}
          sx={{
            borderRadius: '8px',
            height: '40px',
          }}
        />
      </Box>
    </Box>
  );
};

export default ChatUI;
