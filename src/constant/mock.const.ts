import { Invoice } from "../types/invoice.type";

const sampleInvoice: Invoice = {
  orderNumber: 'ORD-002',
  date: '12/01/2024',
  status: 'Processing',
  company: {
    name: '3D Print Shop',
    address: '123 Manufacturing Ave',
    city: 'Tech City, TC 12345',
    email: 'orders@3dprint.com',
    phone: '(555) 123-4567',
  },
  billTo: {
    name: 'Customer Name',
    addressLine1: 'Customer Address Line 1',
    cityStateZip: 'City, State ZIP',
    email: 'customer@email.com',
  },
  items: [
    {
      id: '1',
      description: '3D Printed Part - Custom Design',
      qty: 1,
      unitPrice: 25.99,
    },
    { id: '2', description: 'SLA Resin Print', qty: 1, unitPrice: 15.0 },
    { id: '3', description: 'Post-Processing Service', qty: 1, unitPrice: 5.0 },
  ],
  subtotal: 45.99,
  discount: 0,
  taxPercent: 10,
  taxAmount: 4.6,
  total: 50.59,
};

export { sampleInvoice };