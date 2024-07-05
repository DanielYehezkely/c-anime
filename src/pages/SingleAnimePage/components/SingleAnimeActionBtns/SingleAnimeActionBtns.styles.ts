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
  font-size: 1.2rem;
  font-weight: bold;
  padding: 0.8rem 1.2rem;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);
  }
`;

export const TrailerButton = styled(StyledButton)`
  background: linear-gradient(45deg, #ff6b6b, #ff8e53);
  border: none;

  &:hover {
    background: linear-gradient(45deg, #ff8e53, #ff6b6b);
  }
`;

export const MangaButton = styled(StyledButton)`
  background: linear-gradient(45deg, #2196f3, #21cbf3);
  border: none;

  &:hover {
    background: linear-gradient(45deg, #21cbf3, #2196f3);
  }
`;

export const LikeButton = styled(StyledButton)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(45deg, #4caf50, #81c784);
  border: none;

  &:hover {
    background: linear-gradient(45deg, #81c784, #4caf50);
  }
`;

export const UnlikeButton = styled(StyledButton)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(45deg, #f44336, #e57373);
  border: none;

  &:hover {
    background: linear-gradient(45deg, #e57373, #f44336);
  }
`;

export const WatchlistButton = styled(StyledButton)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(45deg, #ff9800, #ffb74d);
  border: none;

  &:hover {
    background: linear-gradient(45deg, #ffb74d, #ff9800);
  }
`;
