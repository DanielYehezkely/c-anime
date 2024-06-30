import React from "react";
import ReactDOM from "react-dom/client";

import { ThemeProvider } from "@mui/material/styles";
import theme from "./MUI/theme";

import { AuthProvider } from "./context/AuthContext/AuthContext";
import App from "./App";

import "./styles/reset.css";
import "./styles/variables.css";
import "./styles/style.css";
import "./styles/responsive.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </AuthProvider>
  
);
