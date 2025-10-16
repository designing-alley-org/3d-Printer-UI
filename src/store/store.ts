import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './auth/reducer';
import { registerReducer } from './auth/registerReducer';
import { printerReducer } from './printer/printerReducer';
import userReducer from './user/reducer';
import specificationReducer from './customizeFilesDetails/SpecificationReducer';
import addressReducer from './Address/address.reducer.ts';
import DeliveryReducer from './Address/deliveryDetails.ts';
import { CustomizationSlice } from './customizeFilesDetails/CustomizationSlice.ts';
import queryReducer from './Slice/querySlice';
import chatReducer from './Slice/chatSlice';
import notificationReducer from './Slice/notificationSlice.ts';

const store = configureStore({
  reducer: {
    auth: authReducer,
    register: registerReducer,
    printerDetails: printerReducer,
    customization: CustomizationSlice.reducer,
    user: userReducer,
    specification: specificationReducer,
    address: addressReducer,
    delivery: DeliveryReducer,
    query: queryReducer,
    chat: chatReducer,
    notification: notificationReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
