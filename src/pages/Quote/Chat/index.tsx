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
  sendBy: string;
  files: any[];
  id?: string; // Add an id field to track unique messages
}

export default function Chat() {
  const [socket, setSocket] = useState<Socket<
    DefaultEventsMap,
    DefaultEventsMap
  > | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const user = useSelector((state: any) => state.user);
  const { orderId } = useParams();

  const defaultUserId = user.user._id;
  const defaultMerchantId = user.user._id;

  useEffect(() => {
    const newSocket: Socket = io('http://localhost:5000', {
      withCredentials: true,
      transports: ['websocket', 'polling'],
    });

    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Connected to the server:', newSocket.id);
      newSocket.emit('joinChat', defaultUserId, orderId);
      newSocket.emit('joinChat', defaultMerchantId, orderId);
    });

    // Only update messages when receiving messages from others
    newSocket.on('receiveMessage', (newMessage: Message) => {
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
        const response = await api.get(`/get-message/${orderId}`);
        if (response.data.status === 'error') {
          throw new Error(response.data.message);
        }
        const fetchedMessages = response.data.data.messages;

        const fetchMessages = fetchedMessages.reverse();
        setMessages(fetchMessages[0].messages);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    }
    fetchMessages();

    return () => {
      newSocket.disconnect();
    };
  }, [orderId, defaultUserId, defaultMerchantId]);

  // Function to handle sending messages
  const handleSendMessage = (content: string, files: any[] = []) => {
    if (socket) {
      const messageData = {
        senderId: defaultUserId,
        receiverId: defaultMerchantId,
        files,
        content,
        order_id: orderId,
        sendBy: 'user',
      };

      // Update local messages state immediately
      const newMessage = {
        sender: defaultUserId,
        content,
        sendBy: 'user',
        files,
        // id: Date.now().toString(), // Add a temporary unique ID
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);

      // Emit message to server
      socket.emit('sendMessage', messageData);
    }
  };

  return (
    <Box sx={{ width: '100%', height: '110%', display: 'flex', flexDirection: 'column' }}>
      <ChatBody messages={messages} />
      <ChatFooter
        socket={socket}
        sender={defaultUserId}
        receiver={defaultMerchantId}
        orderId={orderId}
        onSendMessage={handleSendMessage}
      />
    </Box>
  );
}
