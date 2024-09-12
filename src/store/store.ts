// src/store/store.ts

import { createStore, combineReducers } from 'redux';
import authReducer from './auth/reducer';

// Combine multiple reducers if needed
const rootReducer = combineReducers({
  auth: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer);
