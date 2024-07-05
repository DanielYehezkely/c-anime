import { styled } from "@mui/material/styles";
import { Box, CardContent, Typography } from "@mui/material";

export const SingleAnimeCardBox = styled(Box)`
  width: 95%;
  height: 25rem;
  z-index: 2;
  margin-top: 10rem;
  display: flex;
  padding: 2rem 0 0 2rem;
`;

export const SingleAnimeContent = styled(CardContent)`
  width: 50%;
  color: white;
  display: flex;
  gap: 1rem;
  flex-direction: column;
`;

export const TitleTypography = styled(Typography)`
  font-weight: bold;
`;

export const SynopsisTypography = styled(Typography)`
  font-size: 1.4rem;
  max-height: 70%;
  overflow: scroll;
  &::-webkit-scrollbar {
    width: 10px;
    height: 0px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: #ffffff50;
    border-radius: 5px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #ffffffef;
  }
`;

export const YearTypography = styled(Typography)`
  color: #9b9a9a;
`;
