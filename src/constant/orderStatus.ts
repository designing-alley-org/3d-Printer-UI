
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

export {
  ORDER_STATUS,
  ORDER_STATUS_GROUPS,
}
