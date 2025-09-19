export interface ChatPayload {
  _id: string;
  message: string;
  conversationId: string;
  createdAt: string;
  sender: string;
  updatedAt: string;
  readBy: string[];
  messageType: MessageType;
  attachments?: Attachment[];
}

export type MessageType = "text" | "image" | "file" | "system";

export type Attachment = {
  type: string;
  url: string;
  filename: string;
  size: number;
};

/**
 * SendMessageRequest = ChatPayload without auto-generated fields
 * (_id, createdAt, updatedAt, sender, readBy)
 */
export interface SendMessageRequest
  extends Omit<
    ChatPayload,
    "_id" | "createdAt" | "updatedAt" | "sender" | "readBy"
  > {}
