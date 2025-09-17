import { Box, TextField } from '@mui/material';
import CustomButton from '../../stories/button/CustomButton';
import Pin from './Pin';
import ImagePreview from './ImagePreview';
import { formatDate } from '../../utils/function';
import LoadingScreen from '../LoadingScreen';
import MessageUI from './MessageUI';
import { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { getUserChat, sendMessage, setCurrentTicketId, addAutoResponse } from '../../store/Slice/chatSlice';

interface ChatUIProps {
  isLoading: boolean;
  ticketId: string;
}

const ChatUI = ({ isLoading, ticketId }: ChatUIProps) => {
    const [messageInput, setMessageInput] = useState('');
    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const dispatch = useDispatch<AppDispatch>();
    const { chatData, loading, sendingMessage } = useSelector((state: RootState) => state.chat);
    
    // Get messages for current ticket
    const messages = chatData[ticketId] || [];

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

    // Fetch chat data when ticketId changes
    useEffect(() => {
        if (ticketId) {
            dispatch(setCurrentTicketId(ticketId));
            dispatch(getUserChat(ticketId));
        }
    }, [dispatch, ticketId]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if ((!messageInput.trim() && selectedImages.length === 0) || !ticketId) return;
        
        // Convert images to attachments (for now, we'll create mock URLs)
        const imageAttachments = selectedImages.map((file) => ({
            type: 'image',
            url: URL.createObjectURL(file), // In production, upload to server first
            name: file.name,
            size: file.size
        }));
        
        const messageData = {
            ticketId,
            message: messageInput.trim() || (selectedImages.length > 0 ? `Sent ${selectedImages.length} image${selectedImages.length > 1 ? 's' : ''}` : ''),
            attachments: imageAttachments
        };
        
        dispatch(sendMessage(messageData));
        setMessageInput(''); // Clear input after sending
        setSelectedImages([]); // Clear selected images after sending
        
        // Simulate auto-response after 2 seconds
        setTimeout(() => {
            const autoResponse = {
                id: `auto_${Date.now()}`,
                message: 'Thank you for your message. Our support team will get back to you shortly.',
                createdAt: new Date().toISOString(),
                isSender: false,
                attachments: [],
            };
            dispatch(addAutoResponse({ ticketId, message: autoResponse }));
        }, 2000);
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

    if (isLoading || loading) {
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
            date={formatDate(msg.createdAt, true)} 
            isSender={msg.isSender}
            attachments={msg.attachments || []}
          />
        ))}
        {/* Empty div to scroll to bottom */}
        <div ref={messagesEndRef} />
      </Box>

      {/* Input */}
      <Box component={'form'} display={'flex'} gap={2} mt={2} onSubmit={handleSendMessage}>
        {selectedImages.length > 0 ? (
          // Show image preview when images are selected
          <Box sx={{ flex: 1, position: 'relative' }}>
            <ImagePreview
              files={selectedImages}
              onRemove={handleRemoveImage}
              onRemoveAll={handleRemoveAllImages}
            />
          </Box>
        ) : (
          // Show text input when no images are selected
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
              endAdornment: <Pin onImageSelect={handleImageSelect} />,
            }}
          />
        )}
        <CustomButton
          children={sendingMessage ? "Sending..." : "Send"}
          variant="contained"
          color="primary"
          type="submit"
          disabled={(!messageInput.trim() && selectedImages.length === 0) || sendingMessage}
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
