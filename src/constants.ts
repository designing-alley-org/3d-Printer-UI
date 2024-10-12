// import all svg
import uploadIcon from './assets/icons/upload.svg';
import scaleIcon from './assets/icons/scaleIcon.svg';
import technologyIcon from './assets/icons/technologyIcon.svg';
import materialIcon from './assets/icons/materialIcon.svg';
import colorIcon from './assets/icons/colorIcon.svg';
import printerIcon from './assets/icons/printerIcon.svg';
import infillIcon from './assets/icons/infillIcon.svg';

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
  { id: 1, label: 'UPLOAD STL' },
  { id: 2, label: 'CUSTOMIZE' },
  { id: 3, label: 'QUOTE' },
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

// Data for DeliveryPlan

export const deliveryPlans = [
  {
    deliveryName: 'Standard Shipping',
    deliveryTime: '3-5 days',
    deliveryCost: '$10',
  },
  {
    deliveryName: 'Express Shipping',
    deliveryTime: '1-2 days',
    deliveryCost: '$20',
  },
  {
    deliveryName: 'Premium Shipping',
    deliveryTime: '1 day',
    deliveryCost: '$30',
  },
];

//Input fields for ShippingDetails
export const inputFields = [
  {
    label: 'First Name',
    name: 'firstName',
    type: 'text',
    placeholder: 'Enter your first name',
  },
  {
    label: 'Last Name',
    name: 'lastName',
    type: 'text',
    placeholder: 'Enter your last name',
  },
  {
    label: 'Phone Number',
    name: 'phoneNumber',
    type: 'text',
    placeholder: 'Enter your phone number',
  },
  {
    label: 'Email',
    name: 'email',
    type: 'email',
    placeholder: 'Enter your email',
  },
  {
    label: 'Street Address',
    name: 'streetAddress',
    type: 'text',
    placeholder: 'Enter your address',
  },
  {
    label: 'State/Region',
    name: 'state',
    type: 'text',
    placeholder: 'Enter your state',
  },
  {
    label: 'Country',
    name: 'country',
    type: 'text',
    placeholder: 'Enter your country',
  },
  {
    label: 'Extended Address',
    name: 'extendedAddress',
    type: 'text',
    placeholder: 'Enter your address',
  },
  {
    label: 'City',
    name: 'city',
    type: 'text',
    placeholder: 'Enter your city',
  },

  {
    label: 'Zip Code',
    name: 'zipCode',
    type: 'text',
    placeholder: 'Enter your zip code',
  },
];
export const customize = [
  {
    id: '1',
    icon: scaleIcon,
    name: 'Scale',
  },
  {
    id: '2',
    icon: technologyIcon,
    name: 'Technology',
  },
  {
    id: '3',
    icon: materialIcon,
    name: 'Material',
  },
  {
    id: '4',
    icon: colorIcon,
    name: 'Colors',
  },
  {
    id: '5',
    icon: printerIcon,
    name: 'Printers',
  },
  {
    id: '6',
    icon: infillIcon,
    name: 'Infill',
  },
];

export const dimensionsOption = [
  {
    id: 1,
    label: 'Dimensions',
    value: 'dimensions',
  },
  {
    id: 2,
    label: 'Ratio',
    value: 'ratio',
  },
  {
    id: 3,
    label: 'Percentage',
    value: 'percentage',
  },
];
