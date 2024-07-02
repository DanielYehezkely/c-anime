import { styled } from "@mui/material/styles";
import { Box, Button } from "@mui/material";

export const ActionButtonsContainer = styled(Box)`
  width: 90%;
  margin-top: 2rem;
  display: flex;
  gap: 1rem;
  z-index: 2;
`;

export const StyledButton = styled(Button)`
  color: white;
  font-size: 1.4rem;
  transition: all 0.3s ease;
`;

export const TrailerButton = styled(StyledButton)`
  border: 1px solid white;
  &:hover {
    color: gold;
    border-color: gold;
  }
`;

export const MangaButton = styled(StyledButton)`
  background-color: secondary;
`;

export const LikeButton = styled(StyledButton)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: success;
`;

export const UnlikeButton = styled(StyledButton)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: error;
`;

export const WatchlistButton = styled(StyledButton)`
  border: 1px solid transparent;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #806900;
  &:hover {
    color: #d47100;
    border-color: gold;
    background-color: #dadada;
  }
`;
