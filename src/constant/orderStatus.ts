//  Define all main statuses
const ORDER_STATUS = Object.freeze({
  PENDING_CUSTOMISATION: 'Pending Customisation',
  INCOMPLETE_ORDER: 'Incomplete Order',
  FAILED_PAYMENT: 'Failed Payment',
  ORDER_PLACED: 'Order Placed',
  IN_PRINT: 'In Print',
  PRINT_COMPLETED: 'Print Completed',
  SHIPPED: 'Shipped',
  DELIVERED: 'Delivered',
  FAILED_DELIVERY: 'Failed Delivery',
});

//  Define grouped statuses for easy filtering or logic
const ORDER_STATUS_GROUPS = Object.freeze({
  PENDING: [
    ORDER_STATUS.PENDING_CUSTOMISATION,
    ORDER_STATUS.INCOMPLETE_ORDER,
    ORDER_STATUS.FAILED_PAYMENT,
  ],
  ACTIVE: [
    ORDER_STATUS.ORDER_PLACED,
    ORDER_STATUS.IN_PRINT,
    ORDER_STATUS.PRINT_COMPLETED,
    ORDER_STATUS.SHIPPED,
  ],
  COMPLETED: [ORDER_STATUS.DELIVERED],
  FAILED: [ORDER_STATUS.FAILED_DELIVERY],
});

// Define colors for each order status
const ORDER_STATUS_COLORS = Object.freeze({
  [ORDER_STATUS.PENDING_CUSTOMISATION]: {
    backgroundColor: '#FFC71E',
  },
  [ORDER_STATUS.INCOMPLETE_ORDER]: {
    backgroundColor: '#FFB349',
  },
  [ORDER_STATUS.ORDER_PLACED]: {
    backgroundColor: '#4ECDC4',
  },
  [ORDER_STATUS.FAILED_PAYMENT]: {
    backgroundColor: '#FF5252',
  },
  [ORDER_STATUS.IN_PRINT]: {
    backgroundColor: '#E3F2FD',
  },
  [ORDER_STATUS.PRINT_COMPLETED]: {
    backgroundColor: '#BBDEFB',
  },
  [ORDER_STATUS.SHIPPED]: {
    backgroundColor: '#81D4FA',
  },
  [ORDER_STATUS.DELIVERED]: {
    backgroundColor: '#4CAF50',
  },
  [ORDER_STATUS.FAILED_DELIVERY]: {
    backgroundColor: '#F44336',
  },
});

export { ORDER_STATUS, ORDER_STATUS_GROUPS, ORDER_STATUS_COLORS };
