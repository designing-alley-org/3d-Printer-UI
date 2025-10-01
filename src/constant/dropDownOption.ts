import { Option } from '../stories/Dropdown/SingleSelectDropdown';

export const addressLabelOptions: Option[] = [
  { id: 'home', label: 'Home', value: 'home' },
  { id: 'workshop', label: 'Workshop', value: 'workshop' },
  { id: 'office', label: 'Office', value: 'office' },
  { id: 'other', label: 'Other', value: 'other' },
];

export const queryTypeOptions: Option[] = [
  { id: 'technical', label: 'Technical', value: 'Technical' },
  { id: 'billing', label: 'Billing', value: 'Billing' },
  { id: 'inquiry', label: 'Inquiry', value: 'Inquiry' },
  { id: 'order-issue', label: 'Order Issue', value: 'Order Issue' },
  { id: 'general-support', label: 'General Support', value: 'General Support' },
];

export const filterStatus: Option[] = [
  { id: 1, value: 'all', label: 'All' },
  { id: 2, value: 'pending', label: 'Pending' },
  { id: 3, value: 'completed', label: 'Completed' },
  { id: 4, value: 'processing', label: 'Processing' },
  { id: 5, value: 'shipped', label: 'Shipped' },
  { id: 6, value: 'delivered', label: 'Delivered' },
];
