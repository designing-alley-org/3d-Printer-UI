// import all svg
import uploadIcon from './assets/icons/upload.svg';
import { ROUTES } from './routes/routes-constants';
import cross from './assets/icons/cross.svg';
import plus from './assets/icons/plus.svg';
import minus from './assets/icons/minus.svg';
import vector from './assets/icons/Vector.svg';
import vector_black from './assets/icons/Vector-black.svg';
import arrow_left from './assets/icons/arrow_left.svg';
import arrow_right from './assets/icons/arrow_right.svg';
import info from './assets/icons/info.svg';
import group from './assets/icons/Group.svg';
import arrow_dropdown_blue from './assets/icons/arrow_drop_down_blue_circle.svg';
import notificationIcon from './assets/icons/notifications.svg';
import arrowRight from './assets/icons/right-arrow.svg';
import navtabSmallScreen from './assets/icons/navtabSmallScreen.svg';
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
  navtabSmallScreen
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

