// Notification type
export interface Notification {
  id: number;
  title: string;
  messageId: string;
  message: string;
  type: 'admin' | 'order' | 'ticket';
  timestamp: Date;
  isRead: boolean;
}
