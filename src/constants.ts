// import all svg
import uploadIcon from './assets/icons/upload.svg';
import deliveryIcon from './assets/icons/local_shipping.svg';
import customizeIcon from './assets/icons/inbox_customize.svg';
import quoteIcon from './assets/icons/quoteIcon.svg';
import { ROUTES } from './routes/routes-constants';
import cross from './assets/icons/cross.svg';
import plus from './assets/icons/plus.svg';
import minus from './assets/icons/minus.svg';
import vector from './assets/icons/Vector.svg';
import vector_black from './assets/icons/Vector-black.svg';
import arrow_left from './assets/icons/arrow_left.svg';
import arrow_right from './assets/icons/arrow_right.svg';
import precision from './assets/images/precision_manufacturing.svg';
import shape from './assets/images/shapes.svg';
import instant from './assets/images/instant_mix.svg';
import eos from './assets/images/eos-icons_3d-print.svg';
import bolt from './assets/images/bolt.svg';
import demography from './assets/images/demography.svg';
import info from './assets/icons/info.svg';
import group from './assets/icons/Group.svg';
import arrow_dropdown_blue from './assets/icons/arrow_drop_down_blue_circle.svg';
import aboutUs from './assets/images/aboutUS.svg';
import aboutUs1 from './assets/images/aboutUs1.svg';
import aboutUs2 from './assets/images/aboutUs2.svg';
import notificationIcon from './assets/icons/notifications.svg';
import arrowRight from './assets/icons/right-arrow.svg';
import navtabSmallScreen from './assets/icons/navtabSmallScreen.svg';
import HowISWork from './assets/images/HowISWork.svg'
import footerImg from './assets/images/Footer.svg';
// export svg
export {
  uploadIcon,
  cross,
  plus,
  minus,
  vector,
  vector_black,
  arrow_left,
  arrow_right,
  info,
  group,
  arrow_dropdown_blue,
  notificationIcon,
  arrowRight,
  navtabSmallScreen,
  HowISWork,
  footerImg
};

// Data for Tab
export const tabData = [
  {
    id: 0,
    label: '3D PRINT YOUR FUTURE',
    path: 'dashboard',
  },
  { id: 1, label: 'GET QUOTE', path: ROUTES.GET_QUOTES },
  { id: 4, label: ''}, // This is created for notification... 
  { id: 3, label: 'YOUR ACCOUNT', path: ROUTES.ACCOUNT },
];

export const DesktoptabData = [
  { id: 1, label: 'Get Quote', path: ROUTES.GET_QUOTES },
  { id: 2, label: 'Account', path: ROUTES.ACCOUNT },
];

export const MobiltabData = [
  { id: 0, label: '3D PRINT YOUR FUTURE', path: 'dashboard',},
  { id: 1, label: 'GET QUOTE', path: ROUTES.GET_QUOTES },
  { id: 2, label: 'YOUR ACCOUNT', path: ROUTES.ACCOUNT },
];

// Data for QuoteText
export const quoteTexts = [
  { id: 1, label: '1. UPLOAD STL', path: ROUTES.UPLOAD_STL },
  { id: 2, label: '2. CUSTOMIZE', path: ROUTES.CUSTOMIZE },
  { id: 3, label: '3. QUOTE', path: ROUTES.QUOTE },
  { id: 4, label: '4. CHECKOUT', path: ROUTES.CHECKOUT },
];

export const accTab = [
  { id: 1, label: 'My Profile', path: ROUTES.MY_PROFILE, icon: 'Person' },
  { id: 2, label: 'My Orders', path: ROUTES.MY_ORDERS, icon: 'ShoppingBag' },
  { id: 3, label: 'Help', path: ROUTES.HELP, icon: 'Help' },
  { id: 5, label: 'Account Settings', path: ROUTES.PASSWORD, icon: 'Settings' },
];

export const notificationTab = [
  { id: 1, label: 'ONGOING ORDER' },
  { id: 2, label: 'PLACED ORDER' },
  { id: 3, label: 'MY DISPUTES' },
 ];
 
// Data for Card
export const cardItems = [
  {
    id: '1',
    icon: uploadIcon, // Use the imported SVG icon
    upperText: 'UPLOAD STL',
    bottomText: 'upload one or more STL files and start customizing',
  },
  {
    id: '2',
    icon: customizeIcon, // Use the imported SVG icon
    upperText: 'CUSTOMIZE',
    bottomText: 'upload one or more STL files and start customizing',
  },
  {
    id: '3',
    icon: quoteIcon, // Use the imported SVG icon
    upperText: 'QUOTE',
    bottomText: 'upload one or more STL files and start customizing',
  },
  {
    id: '4',
    icon: deliveryIcon, // Use the imported SVG icon
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
    label: 'Name',
    name: 'personName',
    type: 'text',
    placeholder: 'Enter your first name',
  },
  {
    label: 'Street Address',
    name: 'streetLines',
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
    label: 'Country',
    name: 'countryCode',
    type: 'text',
    placeholder: 'Enter your country (GB)',
  },
  {
    label: 'Postal Code',
    name: 'postalCode',
    type: 'text',
    placeholder: 'Enter your zip code',
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
    label: 'State',
    name: 'state',
    type: 'text',
    placeholder: 'Enter your state',
  },
];
export const scaleFields = [
 {
    label: 'Height',
    name: 'height',
    type: 'text',
    placeholder: 'Enter Height',
  },
  {
    label: 'Width',
    name: 'width',
    type: 'text',
    placeholder: 'Enter Width',
  },
  
  {
    label: 'Length',
    name: 'length',
    type: 'text',
    placeholder: 'Enter Length',
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
    value: 'inch',
  },
];

export const uploadDimBtnData = [
  {
    id: 'mm',
    name: 'MM',
  },
  {
    id: 'inch',
    name: 'IN',
  },
];

export const notifyData = [
  {
    id: 1,
    value: 'immediately',
    label: 'Immediately',
  },
  {
    id: 2,
    value: 'daily',
    label: 'Daily',
  },
  {
    id: 3,
    value: 'never',
    label: 'Never',
  },
  {
    id: 4,
    value: 'working Hours',
    label: 'Working hours',
  },
];



export const PrinterData = [
  {
    title: 'printer name',
    subTitle: ' printer',
    desc: 'Ultra High Resolution',
    data: [
      {
        name: 'Build Volume',
        val: 'X: 220 mm, Y: 220 mm, Z: 250 mm',
      },
      {
        name: 'Layer Resolution',
        val: 'Min: 50 microns, Max: 400 microns',
      },
      {
        name: 'Material Compatibility',
        val: 'PLA, ABS, TPU',
      },
      {
        name: 'Technology Type',
        val: 'FDM ',
      },
      {
        name: 'Nozzle Size',
        val: '0.4 mm ',
      },
      {
        name: 'Print Speed',
        val: '0.4 mm ',
      },
      {
        name: 'Extruders',
        val: 'Single Extruder',
      },
    ],
  },
];

export const footerData = [
  {
    name: 'ABOUT US',
    url: '',
  },
  {
    name: 'FACEBOOK',
    url: '',
  },
  {
    name: 'WORKS',
    url: '',
  },
  {
    name: 'INSTAGRAM',
    url: '',
  },
  {
    name: 'BLOGS',
    url: '',
  },
  {
    name: 'TWITTER',
    url: '',
  },
  {
    name: 'CONTACT US',
    url: '',
  },
  {
    name: 'LINKEDIN',
    url: '',
  },
];

export const whyUSData = [
  {
    img: precision,
    title: 'Quality Assurance',
    subTitle:
      'Our rigorous testing guarantees high-performance and flawless final products.',
  },
  {
    img: bolt,
    title: 'Fast Prototyping',
    subTitle: 'Get rapid, high-quality 3D prints with quick turnaround times.',
  },
  {
    img: shape,
    title: 'Material Variety',
    subTitle:
      'Select the perfect material to suit the functionality and aesthetic of your project.',
  },
  {
    img: eos,
    title: 'Comprehensive Printer Library: ',
    subTitle:
      'Browse a vast library of meticulously categorized 3D models, complete with detailed specifications, to find the perfect asset for your projects.',
  },
  {
    img: demography,
    title: 'Expert Services and Support',
    subTitle:
      'Our platform connects you with skilled merchants for quality 3D printing, from prototypes to large-scale production.',
  },
  {
    img: instant,
    title: 'Flexibility & Customization: ',
    subTitle:
      'Customize your 3D prints with various materials and finishes to meet your specific needs, from simple to complex projects.',
  },
];
export const AboutUsData = [
  {
    img: aboutUs,
    title: 'Quality Assurance',
    subTitle:
      'Our rigorous testing guarantees high-performance and flawless final products.',
  },
  {
    img: aboutUs1,
    title: 'Fast Prototyping',
    subTitle: 'Get rapid, high-quality 3D prints with quick turnaround times.',
  },
  {
    img: aboutUs2,
    title: 'Material Variety',
    subTitle:
      'Select the perfect material to suit the functionality and aesthetic of your project.',
  },
];
