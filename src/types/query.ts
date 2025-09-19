
export interface HelpPayload {
  conversationId: string;
  help: Help
}

interface Help {
  _id: string;
  type: string;
  subject: string;
  createdAt: string;
  orderId: string;
  status: string;
}