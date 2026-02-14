import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { Provider } from 'react-redux';
import store from './store/store';
import './index.css';
import ThemeProviderWrapper from './themes/ThemeProviderWrapper.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <ThemeProviderWrapper>
        <App />
      </ThemeProviderWrapper>
    </QueryClientProvider>
  </Provider>
);
