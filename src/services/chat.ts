// import api from "../axiosConfig";
// import { returnError, returnResponse } from "../utils/function";

import api from "../axiosConfig";
import {  SendMessageRequest } from "../types/chat";
import { returnResponse } from "../utils/function";




export interface SendMessageResponse {
  id: string;
  message: string;
  createdAt: string;
  isSender: boolean;
  ticketId: string;
}


export const getUserChatService = async (id: string) => {
  try {
   const response = await api.get(`/api/v1/chat/conversations/${id}/messages`);
    return returnResponse(response);
  } catch (error) {
    throw error;
  }
};

export const sendMessageService = async (data: SendMessageRequest): Promise<SendMessageResponse> => {
  try {
    const response = await api.post(`/api/v1/chat/messages`, data);
    return returnResponse(response);
  } catch (error) {
    throw error;
  }
};  
