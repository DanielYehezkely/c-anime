import React, { useState } from "react";
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

const CommentSection: React.FC<{ animeId: string; comments: any[] }> = ({
  animeId,
  comments,
}) => {
  const { addComment } = useAuth();
  const [comment, setComment] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      await addComment(animeId, comment);
      setComment("");
    }
  };

  return (
    <CommentsSectionContainer>
      <CommentsHeader variant="h5">{comments.length} Comments</CommentsHeader>
      <StyledDivider />
      <CommentsForm component="form" onSubmit={handleSubmit}>
        <AccountCircleRounded sx={{ color: "white", fontSize: "4rem" }} />
        <CommentsInput
          placeholder="Leave a comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <SubmitButton variant="contained" color="primary" type="submit">
          Submit
        </SubmitButton>
      </CommentsForm>
      {comments.length > 0 ? (
        comments.map((commentObj, index) => (
          <div key={index}>
            <p>{commentObj.comment}</p>
          </div>
        ))
      ) : (
        <NoCommentsBox>No Comments Yet</NoCommentsBox>
      )}
    </CommentsSectionContainer>
  );
};

export default CommentSection;
