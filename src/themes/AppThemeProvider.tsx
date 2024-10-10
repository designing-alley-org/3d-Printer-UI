import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ReactNode } from 'react';

interface IAppThemeProvider {
  children: ReactNode;
}

function AppThemeProvider(props: IAppThemeProvider) {
  const { children } = props;
  const theme = createTheme({
    palette: {
      primary: {
        main: '#8638a0',
      },
      secondary: {
        main: '#8638a00d',
      },
      background: {},
    },
    typography: {
      fontFamily: ' "Michroma", sans-serif',
      subtitle1: {
        fontSize: '1.375rem',
      },
      subtitle2: {
        fontSize: '1.125rem',
      },
      body1: {
        fontSize: '1rem',
      },
      h1: {
        fontSize: '1.5rem',
        [`@media screen and (max-width: 540px)`]: {
          fontSize: '1.75rem',
        },
        fontWeight: 500,
      },
      h2:{
        fontSize: '2rem',
        fontWeight: 400,
      }
    },
  });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export default AppThemeProvider;
