import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { Provider } from 'react-redux';
import store from './store/store';
import './index.css';
import ThemeProviderWrapper from './themes/ThemeProviderWrapper.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1 * 60 * 1000, // 1 minute default
      gcTime: 5 * 60 * 1000, // 5 minutes cache time
      refetchOnWindowFocus: false, // Don't refetch on window focus
      retry: 1, // Retry failed requests once
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <ThemeProviderWrapper>
        <App />
      </ThemeProviderWrapper>
    </QueryClientProvider>
  </Provider>
);
