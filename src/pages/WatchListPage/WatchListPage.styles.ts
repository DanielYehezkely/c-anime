import styled from "styled-components";
import { Container, Box, Typography, Tabs, Grid } from "@mui/material";

export const StyledContainer = styled(Container)`
  padding-top: 10rem;
`;

export const StyledTypography = styled(Typography)`
  color: white;
`;

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

export const CustomTabPanelBox = styled(Box)`
  padding: 3rem;
  margin-top: -0.2rem;
  border: 1px solid #ffffff57;
  border-radius: 0.5rem;
  border-top-left-radius: 0;
`;

export const EmptyListMessage = styled(Typography)`
  color: white;
`;

export const AnimeGrid = styled(Grid)`
  & .MuiGrid-item {
    margin-bottom: 1.5rem;
  }
`;
