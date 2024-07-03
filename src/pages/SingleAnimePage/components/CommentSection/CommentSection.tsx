import React, { useState, useEffect } from "react";
import { useAuth } from "../../../../context/AuthContext/AuthContext";
import { Box, Typography} from "@mui/material";
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
import { Avatar } from "@mui/material";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../../../config/firebaseConfig";

interface Comment {
  userId: string;
  comment: string;
  timestamp: any;
}

interface CommentSectionProps {
  animeId: string;
  comments: Comment[];
}

const CommentSection: React.FC<CommentSectionProps> = ({
  animeId,
  comments,
}) => {
  const { addComment } = useAuth();
  const [comment, setComment] = useState("");
  const [userAvatars, setUserAvatars] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchUserAvatars = async () => {
      const avatars: { [key: string]: string } = {};
      for (const comment of comments) {
        if (!avatars[comment.userId]) {
          const userRef = doc(db, "users", comment.userId);
          const userDoc = await getDoc(userRef);
          if (userDoc.exists()) {
            const userData = userDoc.data();
            avatars[comment.userId] = userData.photoURL || "";
          }
        }
      }
      setUserAvatars(avatars);
    };

    fetchUserAvatars();
  }, [comments]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!comment) return;
    await addComment(animeId, comment);
    setComment("");
  };

  return (
    <CommentsSectionContainer>
      <CommentsHeader variant="h5">{comments.length} Comments</CommentsHeader>
      <StyledDivider />
      <CommentsForm
        component="form"
        onSubmit={
          handleSubmit as unknown as React.FormEventHandler<HTMLDivElement>
        }
      >
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
          <Box key={index} display="flex" alignItems="center" mb={2}>
            <Avatar
              src={userAvatars[commentObj.userId]}
              alt="user-avatar"
              sx={{ mr: 2 }}
            />
            <Box>
              <Typography variant="body1" color="white">
                {commentObj.comment}
              </Typography>
              <Typography variant="caption" color="gray">
                {new Date(commentObj.timestamp.toDate()).toLocaleString()}
              </Typography>
            </Box>
          </Box>
        ))
      ) : (
        <NoCommentsBox>No Comments Yet</NoCommentsBox>
      )}
    </CommentsSectionContainer>
  );
};

export default CommentSection;
