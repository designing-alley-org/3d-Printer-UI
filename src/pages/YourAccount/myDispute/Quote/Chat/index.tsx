import { Box } from '@mui/material';
import { useEffect, useState, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import { useSelector } from 'react-redux';
import { DefaultEventsMap } from '@socket.io/component-emitter';
import ChatFooter from './Footer';
import ChatBody from './Body';
import api from '../../../../../axiosConfig';
import { RootState } from '../../../../../store/types';

interface Message {
  sender: string;
  content: string;
  sendBy: string;
  files: any[];
  id?: string;
}

interface IChatProps {
  disputeId: string;
  orderId: string; 
}

export default function Chat({ disputeId,orderId }: IChatProps) {
  const user = useSelector((state: RootState) => state.user);
  const [socket, setSocket] = useState<Socket<
    DefaultEventsMap,
    DefaultEventsMap
  > | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const defaultUserId = user?.user?._id;
  const defaultMerchantId = user?.user?._id;  

  useEffect(() => {
    const newSocket: Socket = io(import.meta.env.VITE_AWS_URL as string, {
      withCredentials: true,
      transports: ['websocket', 'polling'],
    });

    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Connected to the server:', newSocket.id);
      newSocket.emit('joinDispute', defaultUserId, disputeId, orderId);
    });

    // Only update messages when receiving messages from others
    newSocket.on('receiveDisputeMessage', (newMessage: Message) => {      
      // Check if the message is from another user
      if (newMessage.sender !== defaultUserId) {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from the server');
    });

    newSocket.on('connect_error', (error: Error) => {
      console.error('Connection error:', error);
    });

    // Fetch existing messages
    async function fetchMessages() {
      try {
        const response = await api.get(`/api/v1/get-disputes/${disputeId}`);
        const fetchedMessages = response.data.data.messages;
        const fetchMessages = fetchedMessages[0].messages.reverse();
        if(fetchMessages.length > 0)   setMessages(fetchMessages);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    }
    fetchMessages();

    return () => {
      newSocket.disconnect();
    };
  }, [disputeId, defaultUserId, defaultMerchantId]);

  // Function to handle sending messages
  const handleSendMessage = (content: string, files: any[] = []) => {
    if (socket) {
      const messageData = {
        senderId: defaultUserId,
        receiverId: defaultMerchantId,
        files,
        content,
        dispute_id: disputeId,
        sendBy: 'user',
        orderId: orderId,
      };

      // Update local messages state immediately
      const newMessage = {
        sender: defaultUserId,
        content,
        sendBy: 'user',
        files: files,
        // id: Date.now().toString(), // Add a temporary unique ID
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);

      // Emit message to server
      socket.emit('sendDisputeMessage', messageData);
    }
  };

  return (
    <Box sx={{ width: '100%', height: '110%', display: 'flex', flexDirection: 'column' }}>
      <ChatBody messages={messages} />
      <ChatFooter
        socket={socket}
        sender={defaultUserId}
        receiver={defaultMerchantId}
        disputeId={disputeId}
        onSendMessage={handleSendMessage}
      />
    </Box>
  );
}
