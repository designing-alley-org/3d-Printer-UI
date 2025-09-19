const messages = [
  {
    message: 'Hello, I need help with my order.',
    createdAt: '2025-09-20T10:00:00',
    isSender: true,
    attachments: [],
  },
  {
    message: "Sure, I'd be happy to assist you. Can you provide your order ID?",
    createdAt: '2025-09-20T10:02:00',
    isSender: false,
   attachments: [
      {
        type: "pdf",
        url: "https://s3.amazonaws.com/mybucket/invoice-68c8204a027a67fcc8c395cd.pdf"
      },
       { type: "pdf", url: "https://s3.amazonaws.com/mybucket/invoice.pdf" }
    ]
  },
  {
    message: "Yes, it's 68c8204a027a67fcc8c395cd.",
    createdAt: '2025-09-20T10:05:00',
    isSender: true,
    attachments: [
      { type: "pdf", url: "https://s3.amazonaws.com/mybucket/invoice.pdf" },
      { type: "doc", url: "https://s3.amazonaws.com/mybucket/specifications.docx" },
      { type: "xlsx", url: "https://s3.amazonaws.com/mybucket/order-summary.xlsx" }
    ]
  },
  {
    message: 'Thank you! Let me check the details for you.',
    createdAt: '2025-09-20T10:06:00',
    isSender: false,
    attachments: [],
  },
  {
    message: "I've found your order. It will be shipped by tomorrow.",
    createdAt: '2025-09-20T10:07:00',
    isSender: true,
  },
  {
    message: '',
    createdAt: '2025-09-20T10:08:00',
    isSender: false,
    attachments: [
      { type: "image", url: "https://s3.amazonaws.com/mybucket/product1.jpg" },
      { type: "image", url: "https://s3.amazonaws.com/mybucket/product2.jpg" },
      { type: "image", url: "https://s3.amazonaws.com/mybucket/product3.jpg" },
      { type: "image", url: "https://s3.amazonaws.com/mybucket/product4.jpg" },
      { type: "image", url: "https://s3.amazonaws.com/mybucket/product5.jpg" }
    ]
  },
  {
    message: 'Yes, can you confirm the delivery address?',
    createdAt: '2025-09-20T10:09:00',
    isSender: true,
  },
  {
    message: 'Sure, the address on file is 123 Main Street, New Delhi.',
    createdAt: '2025-09-20T10:10:00',
    isSender: false,
  },
  {
    message: "Yes, that's correct. Please ship it there.",
    createdAt: '2025-09-20T10:11:00',
    isSender: true,
  },
  {
    message: "Perfect, I'll confirm that for you.",
    createdAt: '2025-09-20T10:12:00',
    isSender: false,
  },
  {
    message: 'Do you know which courier will deliver it?',
    createdAt: '2025-09-20T10:13:00',
    isSender: true,
  },
  {
    message: 'Yes, it will be shipped via BlueDart.',
    createdAt: '2025-09-20T10:14:00',
    isSender: false,
  },
  {
    message: 'Great, thanks! Will I get a tracking ID?',
    createdAt: '2025-09-20T10:15:00',
    isSender: true,
  },
  {
    message:
      'Yes, once it is shipped you’ll receive an SMS and email with tracking details.',
    createdAt: '2025-09-20T10:16:00',
    isSender: false,
  },
  {
    message: 'Awesome. Thanks for your help today!',
    createdAt: '2025-09-20T10:17:00',
    isSender: true,
  },
  {
    message: 'You’re welcome! Have a great day ahead.',
    createdAt: '2025-09-20T10:18:00',
    isSender: false,
  },
];

export { messages };    
