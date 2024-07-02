import { styled } from "@mui/material/styles";
import { Box, CardContent, CardMedia, Typography } from "@mui/material";

export const SingleAnimeCardBox = styled(Box)`
  width: 95%;
  height: 25rem;
  z-index: 2;
  margin-top: 10rem;
  display: flex;
  padding: 2rem 0 0 2rem;
`;

export const SingleAnimeImage = styled(CardMedia)`
  width: 20rem;
  height: 22.5rem;
  object-fit: cover;
  border-radius: 1rem;
`;

export const SingleAnimeContent = styled(CardContent)`
  width: 50%;
  color: white;
  display: flex;
  flex-direction: column;
`;

export const SingleAnimeTitle = styled(Typography)`
  font-weight: bold;
`;

export const SingleAnimeSynopsis = styled(Typography)`
  font-size: 1.4rem;
  max-height: 70%;
  overflow: scroll;
`;

export const SingleAnimeYear = styled(Typography)`
  color: #9b9a9a;
`;
