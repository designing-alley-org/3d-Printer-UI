// import api from "../axiosConfig";
// import { returnError, returnResponse } from "../utils/function";

import api from "../axiosConfig";
import { ChatPayload } from "../types/chat";
import { returnResponse } from "../utils/function";


export interface SendMessageRequest {
  ticketId: string;
  message: string;
  attachments?: {
    type: string;
    url: string;
  }[];
}

export interface SendMessageResponse {
  id: string;
  message: string;
  createdAt: string;
  isSender: boolean;
  ticketId: string;
}

// Dummy chat data for different tickets
// const dummyChatData: Record<string, ChatMessage[]> = {
//   '1': [
//     {
//       id: 'msg1',
//       message: 'Hello, I need help with my printer. It\'s not working properly.',
//       createdAt: '2024-01-15T10:30:00Z',
//       isSender: true,
//       attachments: [],
//     },
//     {
//       id: 'msg2',
//       message: 'I\'m sorry to hear that. Can you tell me what specific issue you\'re experiencing?',
//       createdAt: '2024-01-15T10:32:00Z',
//       isSender: false,
//       attachments: [],
//     },
//     {
//       id: 'msg3',
//       message: 'The printer keeps jamming and the print quality is very poor.',
//       createdAt: '2024-01-15T10:35:00Z',
//       isSender: true,
//       attachments: [
//         {
//           type: 'image',
//           url: 'https://example.com/printer-issue.jpg'
//         }
//       ],
//     },
//   ],
//   '2': [
//     {
//       id: 'msg4',
//       message: 'I have a question about my payment for order ORD-2024-002.',
//       createdAt: '2024-01-14T14:20:00Z',
//       isSender: true,
//       attachments: [],
//     },
//     {
//       id: 'msg5',
//       message: 'I can help you with that. What specific payment issue are you experiencing?',
//       createdAt: '2024-01-14T14:22:00Z',
//       isSender: false,
//       attachments: [],
//     },
//   ],
//   '3': [
//     {
//       id: 'msg6',
//       message: 'What material options do you have for 3D printing?',
//       createdAt: '2024-01-13T09:15:00Z',
//       isSender: true,
//       attachments: [],
//     },
//     {
//       id: 'msg7',
//       message: 'We offer various materials including PLA, ABS, PETG, and more specialized materials. Here\'s our material guide.',
//       createdAt: '2024-01-13T09:17:00Z',
//       isSender: false,
//       attachments: [
//         {
//           type: 'pdf',
//           url: 'https://example.com/material-guide.pdf'
//         }
//       ],
//     },
//   ],
// };

export const getUserChatService = async (ticketId: string): Promise<ChatPayload[]> => {
  try {
   const response = await api.get(`/api/v1/chat/conversations/${ticketId}/messages`);
    return returnResponse(response);
  } catch (error) {
    throw error;
  }
};

export const sendMessageService = async (data: SendMessageRequest): Promise<SendMessageResponse> => {
  try {
    // Using dummy data for now - replace with actual API call
    // const response = await api.post('/send-message', data);
    // return returnResponse(response);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Create a new message response
    const newMessage: SendMessageResponse = {
      id: `msg_${Date.now()}`,
      message: data.message,
      createdAt: new Date().toISOString(),
      isSender: true,
      ticketId: data.ticketId,
    };
    
    // // Add to dummy data for persistence during session
    // if (!dummyChatData[data.ticketId]) {
    //   dummyChatData[data.ticketId] = [];
    // }
    // dummyChatData[data.ticketId].push({
    //   id: newMessage.id,
    //   message: newMessage.message,
    //   createdAt: newMessage.createdAt,
    //   isSender: newMessage.isSender,
    //   attachments: data.attachments || [],
    // });
    
    // Auto-response will be handled by Redux middleware or component
    // We'll return the message first, then handle auto-response in the component
    
    return newMessage;
  } catch (error) {
    throw error;
  }
};