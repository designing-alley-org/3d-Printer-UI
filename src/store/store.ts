import fileReducer from './stlFile/reducer';
import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './auth/reducer';
import { registerReducer } from './auth/registerReducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    fileState: fileReducer,
    register: registerReducer,
  },
});

export default store;

export type AppDispatch = typeof store.dispatch;
