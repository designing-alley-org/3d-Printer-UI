type LineItem = {
  id: string;
  description: string;
  qty: number;
  unitPrice: number;
};

type Invoice = {
  orderNumber: string;
  date: string;
  status: string;
  company: {
    name: string;
    address: string;
    city: string;
    email: string;
    phone?: string;
  };
  billTo: {
    name: string;
    addressLine1: string;
    cityStateZip?: string;
    email?: string;
  };
  items: LineItem[];
  subtotal: number;
  discount: number;
  taxPercent: number;
  taxAmount: number;
  total: number;
};


export type { Invoice, LineItem };