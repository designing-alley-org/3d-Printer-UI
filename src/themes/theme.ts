import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#060B35", // your primary blue
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#2A2D2F", // text black
    },
    text: {
      primary: "#2A2D2F",
      secondary: "#6B6B6B",
    },
    divider: "#D7D7D7",
    background: {
      default: "#060B35", // app background
      paper: "#FFFFFF", // card background
    },
  },

  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h5: {
      fontSize: "1.5rem",
      fontWeight: 700,
      color: "#2A2D2F",
    },
    body1: {
      fontSize: "0.875rem",
      color: "#6B6B6B",
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },

  shape: {
    borderRadius: 24, // card default
  },

  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "2px 2px 4px 0px #0000003D",
          border: "1px solid #EDEDED",
          borderRadius: "24px",
          padding: "40px",
          gap: "24px",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: "32px",
            "& fieldset": {
              borderColor: "#D7D7D7",
            },
            "&:hover fieldset": {
              borderColor: "#060B35",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#060B35",
              borderWidth: "2px",
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "32px",
          padding: "10px 16px",
        },
      },
    },
  },
});

export default theme;
