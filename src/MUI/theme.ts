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

  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "none", 
        },
      },
    },
      MuiAutocomplete: {
      styleOverrides: {
        option: {
          color: 'white',
          backgroundColor: '#101010',
          '&[data-focus="true"]': {
            backgroundColor: '#303030', // Change background color when focused
          },
          '&[aria-selected="true"]': {
            backgroundColor: '#505050', // Change background color when selected
          },
        },
        paper: {
          backgroundColor: '#101010',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#252525', // Border color for outlined input
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#252525', // Border color on hover
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#252525', // Border color when focused
          },
        },
        input: {
          color: 'white', // Input text color
          '&::placeholder': {
            color: 'rgba(255, 255, 255, 0.6)', // Placeholder text color
            opacity: 1, // Ensure the placeholder is fully visible
          },
        },
      },
    },
  },

  
});

export default theme;
