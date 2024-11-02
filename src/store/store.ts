import fileReducer from './stlFile/reducer';
import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './auth/reducer';
import { registerReducer } from './auth/registerReducer';
import { printerReducer } from './printer/printerReducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    fileState: fileReducer,
    register: registerReducer,
    printerDetails: printerReducer,
  },
});

export default store;

export type AppDispatch = typeof store.dispatch;
