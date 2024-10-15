// import all svg
import uploadIcon from './assets/icons/upload.svg';
import scaleIcon from './assets/icons/scaleIcon.svg';
import technologyIcon from './assets/icons/technologyIcon.svg';
import materialIcon from './assets/icons/materialIcon.svg';
import colorIcon from './assets/icons/colorIcon.svg';
import printerIcon from './assets/icons/printerIcon.svg';
import infillIcon from './assets/icons/infillIcon.svg';
import { ROUTES } from './routes/routes-constants';

export const tabData = [
  {
    id: 0,
    label: '3D PRINT YOUR FUTURE',
    path: 'dashboard',
  },
  { id: 1, label: 'GET QUOTE', path: ROUTES.GET_QUOTES },
  { id: 2, label: 'OUR SERVICES', path: ROUTES.SERVICES },
  { id: 3, label: 'YOUR ACCOUNT', path: ROUTES.ACCOUNT },
  { id: 4, label: 'CART', path: ROUTES.CART },
];

// Data for QuoteText
export const quoteTexts = [
  { id: 1, label: 'UPLOAD STL', path: ROUTES.UPLOAD_STL },
  { id: 2, label: 'CUSTOMIZE', path: ROUTES.CUSTOMIZE },
  { id: 3, label: 'QUOTE', path: ROUTES.QUOTE },
  { id: 4, label: 'CHECKOUT', path: ROUTES.CHECKOUT },
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
export const scaleFields = [
  {
    label: 'Length',
    name: 'length',
    type: 'text',
    placeholder: 'Enter Length',
  },
  {
    label: 'Width',
    name: 'width',
    type: 'text',
    placeholder: 'Enter Width',
  },
  {
    label: 'Height',
    name: 'height',
    type: 'text',
    placeholder: 'Enter Height',
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
export const sizeOption = [
  {
    id: 1,
    label: 'MM',
    value: 'mm',
  },
  {
    id: 2,
    label: 'IN',
    value: 'in',
  },
];

export const uploadDimBtnData = [
  {
    id: 'MM',
    name: 'MM',
  },
  {
    id: 'IN',
    name: 'IN',
  },
];
export const technologyBtnData = [
  {
    id: 'FDM',
    name: 'FDM',
  },
  {
    id: 'SLA',
    name: 'SLA',
  },
];
export const materialBtnData = [
  {
    id: 'nylons',
    name: 'Nylons',
  },
  {
    id: 'poly',
    name: 'Polyester/PTEG',
  },
  {
    id: 'abs',
    name: 'ABS',
  },
  {
    id: 'plastic',
    name: 'Durable Plastics',
  },
  {
    id: 'tpu',
    name: 'Flexible TPU/TPE',
  },
  {
    id: 'pla',
    name: 'PLA',
  },
];
export const colorBtnData = [
  {
    id: 'white',
    name: 'White',
  },
  {
    id: 'black',
    name: 'Black',
  },
];

export const PrinterData = [
  {
    title: 'printer name',
    subTitle: ' printer',
    desc: 'Ultra High Resolution',
    data: [
      {
        name: "Build Volume",
        val: "X: 220 mm, Y: 220 mm, Z: 250 mm", 
      },
      {
        name: "Layer Resolution",
        val: 'Min: 50 microns, Max: 400 microns'
      },
      {
        name: "Material Compatibility",
        val: "PLA, ABS, TPU"
      },
      {
        name: "Technology Type",
        val: "FDM (Fused Deposition Modeling)"
      },
      {
        name: "Nozzle Size",
        val: "0.4 mm (Interchangeable)"
      },
      {
        name: "Print Speed",
        val: "0.4 mm (Interchangeable)"
      },
      {
        name: "Extruders",
        val: "Single Extruder"
      },
    ],
  }
]
