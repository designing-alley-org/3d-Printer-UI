import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { Provider } from 'react-redux';
import store from './store/store';
import './index.css';
import ThemeProviderWrapper from './themes/ThemeProviderWrapper.tsx';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <ThemeProviderWrapper>
      <App />
    </ThemeProviderWrapper>
  </Provider>
);
