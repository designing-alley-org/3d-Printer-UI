
export interface HelpPayload {
  conversationId: string;
  help: Help
}

interface Help {
    id: string;
  type: string;
  subject: string;
  createdAt: string;
  orderId: string;
  status: string;
}