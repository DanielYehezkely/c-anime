import { styled } from "@mui/material/styles";
import { Box, Typography, Divider, Button } from "@mui/material";

export const CommentsSectionContainer = styled(Box)`
  width: 60%;
  align-self: flex-start;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem 0 2rem 2rem;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 1rem;
  margin-top: 2rem;
  padding-left: 9rem;
`;

export const CommentsHeader = styled(Typography)`
  color: white;
`;

export const StyledDivider = styled(Divider)`
  border-color: white;
`;

export const CommentsForm = styled(Box)`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

export const CommentsInput = styled("textarea")`
  width: 90%;
  border-radius: 0.5rem;
  padding: 1rem;
  font-size: 1rem;
  border-color: white;
  background-color: white;
`;

export const SubmitButton = styled(Button)`
  font-size: 1rem;
  background-color: #6327d1;
`;

export const NoCommentsBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
  color: white;
`;
