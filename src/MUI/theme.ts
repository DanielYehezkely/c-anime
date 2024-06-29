import { createTheme } from "@mui/material/styles";

const theme = createTheme({

  palette: {
    primary: {
      main: "#0C0C0C",
    },
    background: {
      default: "#fafafa",
      paper: "#0C0C0C",
    },
  },

  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },

  typography: {
    fontFamily: "'DefaultFont', sans-serif",
  },
  
});

export default theme;
