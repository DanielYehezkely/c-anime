import styled from "styled-components";
import { CardContent, Typography, Box, Button } from "@mui/material";


export const StyledCard = styled(Box)`
  display: flex;
  flex-direction: column;
  color: white;
  width: 50rem;
`;

export const StyledCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1 0 auto;
  color: white;
  text-align: center;
`;

export const StyledTitle = styled(Typography)`
  font-weight: bold;
`;

export const StyledSubtitle = styled(Typography)`
  font-size: 1.8rem;
  color: #ebeaea;
`;

export const StyledDescription = styled(Typography)`
  font-size: 1.4rem;
  color: #ebeaea;
  overflow: scroll;
  max-height: 12rem;

  &::-webkit-scrollbar {
    width: 8px;
    height: 0;
  }

  &::-webkit-scrollbar-thumb {
    background: #55555567;
    border-radius: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

export const StyledButtonBox = styled(Box)`
  display: flex;
  justify-content: center;
  height: 7rem;
  width: 100%;
  gap: 2rem;
  
`;

export const StyledButton = styled(Button)`
  font-size: 1.4rem;
  font-weight: bold;
  height: 4rem;
  color: #d3c8fd;
  border: #fff 1px solid;
  box-shadow: 0px 0px 0px 1px #9463d4;
  &:hover {
    background-color: #9463d4;
    color: #fff;
    border: #9463d4 1px solid;
  }
`;

