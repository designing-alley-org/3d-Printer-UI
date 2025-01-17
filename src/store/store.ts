import fileReducer from './stlFile/reducer';
import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './auth/reducer';
import { registerReducer } from './auth/registerReducer';
import { printerReducer } from './printer/printerReducer';
import userReducer from './user/reducer';
import  fileDetailsReducer  from './customizeFilesDetails/reducer';
import  specificationReducer  from './customizeFilesDetails/SpecificationReducer';
import addressReducer from './Address/address.reducer.ts';
import DeliveryReducer from './Address/deliveryDetails.ts';

const store = configureStore({
  reducer: {
    auth: authReducer,
    fileState: fileReducer,
    register: registerReducer,
    printerDetails: printerReducer,
    user: userReducer,
    fileDetails: fileDetailsReducer,
    specification: specificationReducer,
    address: addressReducer,
    delivery: DeliveryReducer,
  },
});

export default store;

export type AppDispatch = typeof store.dispatch;
