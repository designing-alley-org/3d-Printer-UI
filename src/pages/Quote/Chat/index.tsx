/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box } from '@mui/material';
import ChatFooter from './Footer';
import ChatBody from './Body';
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { DefaultEventsMap } from '@socket.io/component-emitter';
import api from '../../../axiosConfig';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

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
  const user = useSelector((state: any) => state.user);
  console.log(messages);
  const {orderId} =useParams();
  console.log(orderId);
    
  // Use default test IDs for sender and receiver (User and Merchant)
  const defaultUserId = user.user._id; // Replace with actual user ID
  const defaultMerchantId = user.user._id; // Replace with actual merchant ID

  useEffect(() => {
    const newSocket: Socket = io('http://localhost:5000', {
      withCredentials: true,
      transports: ['websocket', 'polling'],
    });

    setSocket(newSocket);

    // Join the chat room with both user and merchant IDs
    newSocket.on('connect', () => {
      console.log('Connected to the server:', newSocket.id);
      newSocket.emit('joinChat', defaultUserId,orderId);
      newSocket.emit('joinChat', defaultMerchantId,orderId);
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
        const response = await api.get(`/get-message/${orderId}`);
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
      <ChatFooter
        socket={socket}
        sender={defaultUserId}
        receiver={defaultMerchantId}
        orderId={orderId}
      />
    </Box>
  );
}
