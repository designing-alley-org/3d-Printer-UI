// import api from "../axiosConfig";
// import { returnError, returnResponse } from "../utils/function";

export interface HelpTicket {
  id: string;
  type: string;
  title: string;
  date: string;
  orderId: string;
  status: string;
}

// Dummy data for development - replace with actual API call later
const dummyHelpTickets: HelpTicket[] = [
  {
    id: '1',
    type: 'Technical',
    title: 'Printer Not Working',
    date: '2024-01-15T10:30:00Z',
    orderId: 'ORD-2024-001',
    status: 'Hold'
  },
  {
    id: '2',
    type: 'Billing',
    title: 'Payment',
    date: '2024-01-14T14:20:00Z',
    orderId: 'ORD-2024-002',
    status: 'In Progress'
  },
  {
    id: '3',
    type: 'Inquiry',
    title: 'Material Options',
    date: '2024-01-13T09:15:00Z',
    orderId: 'ORD-2024-003',
    status: 'Resolved'
  },
  {
    id: '4',
    type: 'Quality',
    title: 'Print Quality Problem',
    date: '2024-01-12T16:45:00Z',
    orderId: 'ORD-2024-004',
    status: 'Open'
  },
  {
    id: '5',
    type: 'Delivery',
    title: 'Delayed Shipment',
    date: '2024-01-11T11:30:00Z',
    orderId: 'ORD-2024-005',
    status: 'Closed'
  },
  {
    id: '6',
    type: 'Technical',
    title: 'Software Issue',
    date: '2024-01-10T13:00:00Z',
    orderId: 'ORD-2024-006',
    status: 'In Progress'
  },
  {
    id: '7',
    type: 'Billing',
    title: 'Refund Request',
    date: '2024-01-09T15:30:00Z',
    orderId: 'ORD-2024-007',
    status: 'Resolved'
  },
];

export const getAllUserQueryService = async (): Promise<HelpTicket[]> => {
  try {
    // TODO: Replace with actual API call when backend is ready
    // Uncomment the lines below and comment out the dummy data section
    // const response = await api.get('/get-all-user-query');
    // return returnResponse(response);
    
    // Simulate API call delay for realistic UX
    await new Promise(resolve => setTimeout(resolve, 500));
    return dummyHelpTickets;
  } catch (error) {
    throw error;
  }
};