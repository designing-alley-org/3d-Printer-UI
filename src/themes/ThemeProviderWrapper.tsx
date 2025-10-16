// src/ThemeProviderWrapper.js
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';

export default function ThemeProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
