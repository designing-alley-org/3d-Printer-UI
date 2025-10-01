// Notification type
export interface Notification {
  id: number;
  title: string;
  conversationId?: string; // Added conversationId to link to specific ticket
  messageId?: string;
  message: string;
  type: 'admin' | 'order' | 'ticket';
  timestamp: Date;
  isRead: boolean;
}
