import fileReducer from './stlFile/reducer';
import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './auth/reducer';
import { registerReducer } from './auth/registerReducer';
import { printerReducer } from './printer/printerReducer';
import userReducer from './user/reducer';
import  fileDetailsReducer  from './customizeFilesDetails/reducer';
import  specificationReducer  from './customizeFilesDetails/SpecificationReducer';
import addressReducerfrom from './Address/address.reducer.ts';

const store = configureStore({
  reducer: {
    auth: authReducer,
    fileState: fileReducer,
    register: registerReducer,
    printerDetails: printerReducer,
    user: userReducer,
    fileDetails: fileDetailsReducer,
    specification: specificationReducer,
    address: addressReducerfrom,

  },
});

export default store;

export type AppDispatch = typeof store.dispatch;
