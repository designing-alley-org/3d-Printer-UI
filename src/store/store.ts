// src/store/store.ts

import { createStore, combineReducers } from 'redux';
import authReducer from './auth/reducer';
import fileReducer from './stlFile/reducer';

// Combine multiple reducers if needed
const rootReducer = combineReducers({
  auth: authReducer,
  fileState: fileReducer, // Added file reducer
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer);
