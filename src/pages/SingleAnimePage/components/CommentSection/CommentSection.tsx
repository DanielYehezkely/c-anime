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

const CommentSection: React.FC = () => {
  return (
    <CommentsSectionContainer>
      <CommentsHeader variant="h5">
        0 Comments
        {/* //*TODO - put the number of comments based on api comments array */}
      </CommentsHeader>
      <StyledDivider />
      <CommentsForm component="form">
        <AccountCircleRounded sx={{ color: "white", fontSize: "4rem" }} />
        <CommentsInput placeholder="Leave a comment" />
        <SubmitButton variant="contained" color="primary">
          Submit
        </SubmitButton>
      </CommentsForm>
      <NoCommentsBox>No Comments Yet</NoCommentsBox>
    </CommentsSectionContainer>
  );
};

export default CommentSection;
