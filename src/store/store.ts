import fileReducer from './stlFile/reducer';
import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './auth/reducer';
import { registerReducer } from './auth/registerReducer';
import { printerReducer } from './printer/printerReducer';
import userReducer from './user/reducer';
import  specificationReducer  from './customizeFilesDetails/SpecificationReducer';
import addressReducer from './Address/address.reducer.ts';
import DeliveryReducer from './Address/deliveryDetails.ts';
import { NotificationSlice } from './notification/notification.ts';
import  QuoteSlice from './quote/quote.ts';
import { CustomizationSlice } from './customizeFilesDetails/CustomizationSlice.ts';

const store = configureStore({
  reducer: {
    auth: authReducer,
    fileState: fileReducer,
    register: registerReducer,
    printerDetails: printerReducer,
    customization: CustomizationSlice.reducer,
    user: userReducer,
    specification: specificationReducer,
    address: addressReducer,
    delivery: DeliveryReducer,
    notification: NotificationSlice.reducer,
    quoteData: QuoteSlice
  },
});

export default store;

export type AppDispatch = typeof store.dispatch;
