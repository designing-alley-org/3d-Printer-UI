import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { ReactNode } from 'react';

interface IAppThemeProvider {
  children: ReactNode;
}

const AppThemeProvider = ({ children }: IAppThemeProvider) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#1E65F5',
      },
      secondary: {
        main: '#0f60d9ff',
      },
      background: {
        default: '#ffffff',
        paper: '#f9f9f9',
      },
    },
    typography: {
      fontFamily: '"Roboto", sans-serif',
      subtitle1: {
        fontSize: '1.375rem',
        textTransform: 'none',
      },
      subtitle2: {
        fontSize: '1.25rem',
        textTransform: 'none',
      },
      body1: {
        fontSize: '1rem',
        textTransform: 'none',
      },
      h1: {
        fontSize: '1.5rem',
        fontWeight: 500,
        textTransform: 'none',
        '@media screen and (max-width: 540px)': {
          fontSize: '1.75rem',
        },
      },
      h2: {
        fontSize: '2rem',
        fontWeight: 400,
        textTransform: 'none',
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default AppThemeProvider;
