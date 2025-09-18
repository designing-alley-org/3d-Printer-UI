
export interface ChatPayload {
  id: string;
  message: string;
  conversationId: string;
  createdAt: string;
  sender: string;
  updatedAt: string;
  readBy: string[];
  attachments?: {
    type: string;
    url: string;
  }[];
}