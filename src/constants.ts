// import all svg
import uploadIcon from './assets/icons/upload.svg';

export const tabData = [
  {
    id: 0,
    label: '3D PRINT YOUR FUTURE',
  },
  { id: 1, label: 'GET QUOTE' },
  { id: 2, label: 'OUR SERVICES' },
  { id: 3, label: 'YOUR ACCOUNT' },
  { id: 4, label: 'CART' },
];

// Data for QuoteText
export const quoteTexts = [
  { id: 1, label: 'UPLOAD TEXT' },
  { id: 2, label: 'CUSTOMIZE' },
  { id: 3, label: 'DELIVERY PLAN' },
  { id: 4, label: 'CHECKOUT' },
];

// Data for Card
export const cardItems = [
  {
    id: '1.',
    icon: uploadIcon, // Use the imported SVG icon
    upperText: 'UPLOAD STL',
    bottomText: 'upload one or more STL files and start customizing',
  },
  {
    id: '2.',
    icon: uploadIcon, // Use the imported SVG icon
    upperText: 'CUSTOMIZE',
    bottomText: 'upload one or more STL files and start customizing',
  },
  {
    id: '3.',
    icon: uploadIcon, // Use the imported SVG icon
    upperText: 'DELIVERY',
    bottomText: 'upload one or more STL files and start customizing',
  },
];
