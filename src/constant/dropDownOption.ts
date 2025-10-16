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

// // New filter options based on ORDER_STATUS_GROUPS
// export const filterStatusGroups: Option[] = [
//   { id: 1, value: 'all', label: 'All' },
//   { id: 2, value: 'pending', label: 'Pending' },
//   { id: 3, value: 'active', label: 'Active' },
//   { id: 4, value: 'completed', label: 'Completed' },
//   { id: 5, value: 'failed', label: 'Failed' },
// ];

// Updated filter options based on ORDER_STATUS_GROUPS
export const filterStatusGroups: Option[] = [
  { id: 1, value: 'all', label: 'All' },

  // Pending group
  { id: 2, value: 'Pending Customisation', label: 'Pending Customisation' },
  { id: 3, value: 'Incomplete Order', label: 'Incomplete Order' },
  { id: 4, value: 'Failed Payment', label: 'Failed Payment' },
  { id: 5, value: 'Order Placed', label: 'Order Placed' },

  // Active group
  { id: 6, value: 'In Print', label: 'In Print' },
  { id: 7, value: 'Print Completed', label: 'Print Completed' },
  { id: 8, value: 'Shipped', label: 'Shipped' },

  // Completed group
  { id: 9, value: 'Delivered', label: 'Delivered' },

  // Failed group
  { id: 10, value: 'Failed Delivery', label: 'Failed Delivery' },
];
