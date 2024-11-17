import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { Provider } from 'react-redux';
import  store  from './store/store';
import './index.css';
import React from 'react';
import AppThemeProvider from './themes/AppThemeProvider.js';

createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
    <Provider store={store}>
      <AppThemeProvider>
        <App />
      </AppThemeProvider>
    </Provider>
  // </React.StrictMode>
);
