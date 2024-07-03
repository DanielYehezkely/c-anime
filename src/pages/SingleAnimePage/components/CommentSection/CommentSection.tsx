import React from "react";
import { AccountCircleRounded } from "@mui/icons-material";
import {
  CommentsSectionContainer,
  CommentsHeader,
  StyledDivider,
  CommentsForm,
  CommentsInput,
  SubmitButton,
  NoCommentsBox,
} from "./CommentSection.styles";
import { useAuth } from "../../../../context/AuthContext/AuthContext";


const CommentSection: React.FC<{ animeId: string }> = ({ animeId }) => {
  const { addComment } = useAuth();
  const [comment, setComment] = React.useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    addComment(animeId, comment);
    setComment("");
  };

  return (
    <CommentsSectionContainer>
      <CommentsHeader variant="h5">0 Comments</CommentsHeader>
      <StyledDivider />
      <CommentsForm component="form" onSubmit={handleSubmit}>
        <AccountCircleRounded sx={{ color: "white", fontSize: "4rem" }} />
        <CommentsInput
          placeholder="Leave a comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <SubmitButton variant="contained" color="primary">
          Submit
        </SubmitButton>
      </CommentsForm>
      <NoCommentsBox>No Comments Yet</NoCommentsBox>
    </CommentsSectionContainer>
  );
};

export default CommentSection;
