import { Tabs } from "@mui/material";
import styled from "styled-components";

export const StyledTabs = styled(Tabs)`
  & .MuiTab-root {
    color: white;
  }
  & .css-bjr47-MuiButtonBase-root-MuiTab-root.Mui-selected {
    color: #ffffe0;
    font-size: 1.6rem;
    font-weight: bold;
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
    background-color: #0c0c0c;
    border: 1px solid #ffffff57;
    border-bottom: none;
  }
  & .MuiTabs-indicator {
    display: none;
  }
`;
