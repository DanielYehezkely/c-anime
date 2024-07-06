import styled, { keyframes } from "styled-components";
import {
  ThumbDown as DislikeIconBase,
  ThumbUp as LikeIconBase,
} from "@mui/icons-material";
import { Box, Button } from "@mui/material";

export const pop = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
`;

export const ActionButtonsContainer = styled(Box)`
  width: 95%;
  padding-left: 2rem;
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
  background: transparent;
  border: none;
  border-right: 1px solid white;
`;

export const LikeIcon = styled(LikeIconBase)<{
  isLikedClicked: boolean;
  liked: boolean;
}>`
  transition: fill 0.3s, transform 0.2s;
  fill: ${(props) => (props.liked ? "#46f436" : "white")};
  animation: ${(props) => (props.isLikedClicked ? pop : "none")} 0.5s ease;
  &:hover {
    transform: scale(1.5);
  }
`;

export const DislikeButton = styled(StyledButton)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: transparent;
  border: none;
`;

export const DislikeIcon = styled(DislikeIconBase)<{
  isDislikedClicked: boolean;
  disliked: boolean;
}>`
  transition: fill 0.3s, transform 0.2s;
  fill: ${(props) => (props.disliked ? "#f44336" : "white")};
  animation: ${(props) => (props.isDislikedClicked ? pop : "none")} 0.5s ease;
  &:hover {
    transform: scale(1.5);
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
