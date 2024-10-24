import { Box } from '@mui/material';
import ChatFooter from './Footer';
import ChatBody from './Body';
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { DefaultEventsMap } from '@socket.io/component-emitter';

import api from '../../../axiosConfig';

interface Message {
  sender: string;
  content: string;
}

export default function Chat() {
  const [socket, setSocket] = useState<Socket<
    DefaultEventsMap,
    DefaultEventsMap
  > | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  // Use default test IDs for sender and receiver (User and Merchant)
  const defaultUserId = 'TestUser'; // Replace with actual user ID
  const defaultMerchantId = 'TestMerchant'; // Replace with actual merchant ID

  useEffect(() => {
    const newSocket: Socket = io('http://localhost:5000', {
      withCredentials: true,
      transports: ['websocket', 'polling'],
    });

    setSocket(newSocket);

    // Join the chat room with both user and merchant IDs
    newSocket.on('connect', () => {
      console.log('Connected to the server:', newSocket.id);
      newSocket.emit('joinChat', defaultUserId);
      newSocket.emit('joinChat', defaultMerchantId);
    });

    // Listen for incoming messages
    newSocket.on('receiveMessage', (newMessage: Message) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    // Handle disconnection and connection errors
    newSocket.on('disconnect', () => {
      console.log('Disconnected from the server');
    });

    newSocket.on('connect_error', (error: Error) => {
      console.error('Connection error:', error);
    });
    async function fetchMessages() {
      try {
        const response = await api.get('/get-message/TestUser/TestMerchant');
        const fetchedMessages = response.data.data.messages;
        const fetchMessages = fetchedMessages.reverse();
        setMessages(fetchMessages);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    }
    fetchMessages();

    // Cleanup function
    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <ChatBody messages={messages} />
      <ChatFooter socket={socket} />
    </Box>
  );
}
