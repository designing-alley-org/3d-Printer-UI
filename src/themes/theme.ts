// theme.ts
import { createTheme } from "@mui/material/styles";

// 1️⃣ Extend MUI's Palette types to include customColors
declare module "@mui/material/styles" {
  interface Palette {
    customColors: {
      primaryDark: string;
      primaryLight: string;
      textDark: string;
      textLight: string;
      lightTextOverDark: string;
      linkBlue: string;
      success: string;
      pending: string;
      warning: string;
      inProgress: string;
    };
  }
  interface PaletteOptions {
    customColors?: {
      primaryDark: string;
      primaryLight: string;
      textDark: string;
      textLight: string;
      lightTextOverDark: string;
      linkBlue: string;
      success: string;
      pending: string;
      warning: string;
      inProgress: string;
    };
  }
}

// 2️⃣ Create theme with MUI defaults + custom colors
const theme = createTheme({
  palette: {
    primary: {
      main: "#060B35", // Primary Dark
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#2A2D2F", // Text Dark
    },
    text: {
      primary: "#2A2D2F", // Text Dark
      secondary: "#5F6368", // Text Light
    },
    divider: "#D7D7D7",
    background: {
      default: "#F5F5F5", // App background
      paper: "#FFFFFF", // Card background
    },
    success: {
      main: "#00C247",
    },
    warning: {
      main: "#EA1701",
    },
    info: {
      main: "#3B82F6",
    },

    // Custom non-standard colors
    customColors: {
      primaryDark: "#060B35",
      primaryLight: "#FFFFFF",
      textDark: "#2A2D2F",
      textLight: "#5F6368",
      lightTextOverDark: "#DDDDDD",
      linkBlue: "#006BCD",
      success: "#00C247",
      pending: "#DEA300",
      warning: "#EA1701",
      inProgress: "#3B82F6",
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
      color: "#5F6368",
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },

  shape: {
    borderRadius: 24,
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
