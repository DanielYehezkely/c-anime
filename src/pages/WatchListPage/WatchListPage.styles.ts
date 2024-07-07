import styled from "styled-components";
import { Container, Box, Typography, Grid } from "@mui/material";

export const StyledContainer = styled(Container)`
  padding-top: 10rem;
`;

export const StyledTypography = styled(Typography)`
  color: white;
  margin-bottom: 4rem;
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
