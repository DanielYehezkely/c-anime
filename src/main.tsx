import ReactDOM from "react-dom/client";


import { ThemeProvider } from "@mui/material/styles";
import { AuthProvider } from "./context/AuthContext/AuthContext";
import { AnimeProvider } from "./context/FetchMalAnimeContext/FetchMalAnimeContext";

import theme from "./MUI/theme";
import App from "./App";

import "./styles/reset.css";
import "./styles/variables.css";
import "./styles/style.css";
import "./styles/responsive.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <AnimeProvider>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </AnimeProvider>
  </AuthProvider>
);
