import React, { useState, useEffect } from "react";
import { useAuth } from "../../../../context/AuthContext/AuthContext";
import { Box, IconButton, Typography, Avatar, Button, Divider } from "@mui/material";
import {
  AccountCircleRounded,
  MoreVert as MoreVertIcon,
} from "@mui/icons-material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from "@mui/icons-material/Edit";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../../../config/firebaseConfig";
import { Timestamp } from "firebase/firestore";
import {
  CommentsSectionContainer,
  CommentsHeader,
  StyledDivider,
  CommentsForm,
  CommentsInput,
  SubmitButton,
  NoCommentsBox,
} from "./CommentSection.styles";
import "./CommentSection.css"; // Import CSS for custom modal styles

interface Comment {
  userId: string;
  comment: string;
  timestamp: any;
}

interface CommentSectionProps {
  animeId: string;
  comments: Comment[];
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  liked: boolean;
  disliked: boolean;
}

const CommentSection: React.FC<CommentSectionProps> = ({
  animeId,
  comments,
  setComments,
  liked,
  disliked,
}) => {
  const { user, addComment, deleteComment } = useAuth();
  const [comment, setComment] = useState("");
  const [userAvatars, setUserAvatars] = useState<{ [key: string]: string }>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState<string | null>(
    null
  );

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

  const handleModalToggle = (commentId: string) => {
    setSelectedCommentId(commentId);
    setIsModalOpen((prev) => !prev);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!comment) return;
    const newComment = {
      userId: user!.uid,
      comment,
      timestamp: Timestamp.now(),
    };
    await addComment(animeId, comment);
    setComments((prevComments) => [...prevComments, newComment]);
    setComment("");
  };

  const handleDeleteComment = async () => {
    if (selectedCommentId) {
      await deleteComment(animeId, selectedCommentId);
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.userId !== selectedCommentId)
      );
      setIsModalOpen(false);
    }
  };

  return (
    <CommentsSectionContainer sx={{ bgcolor: "transparent" }}>
      <CommentsHeader variant="h5">{comments.length} Comments</CommentsHeader>
      <StyledDivider />
      {liked || disliked ? (
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
      ) : (
        <Typography sx={{ color: "white", fontSize: "1.2rem" }}>
          You need to like or dislike the anime to leave a comment.
        </Typography>
      )}
      {comments.length > 0 ? (
        comments.map((commentObj, index) => (
          <Box
            key={index}
            display="flex"
            alignItems="flex-start"
            justifyContent="space-between"
            mb={2}
            mt={2}
            position="relative"
          >
            <Box display="flex">
              <Avatar
                src={
                  userAvatars[commentObj.userId] ||
                  "/path/to/default/avatar.png"
                }
                alt="user-avatar"
                sx={{ mr: 2, alignSelf: "flex-start" }}
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                  mb: "1rem",
                }}
              >
                <Box display="flex" alignItems="center" gap="1rem">
                  <Typography sx={{ color: "white", fontSize: "1.4rem" }}>
                    {user?.displayName ? user.displayName : user?.email}
                  </Typography>
                  <Typography sx={{ color: "#ffffff83" }}>
                    {new Date(
                      commentObj.timestamp.seconds * 1000
                    ).toLocaleString()}
                  </Typography>
                </Box>
                <Typography sx={{ color: "#ffffffe1", fontSize: "1.6rem" }}>
                  {commentObj.comment}
                </Typography>
              </Box>
            </Box>
            {commentObj.userId === user?.uid && (
              <IconButton
                onClick={() => handleModalToggle(commentObj.userId)}
                sx={{ color: "white" }}
              >
                <MoreVertIcon sx={{fontSize: "2rem"}} />
              </IconButton>
            )}
            <div
              className={`custom-modal ${isModalOpen ? "open" : ""}`}
            >
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
              >
                <Button
                  onClick={handleDeleteComment}
                  sx={{
                    color: "white",
                    fontSize: "1.4rem",
                    "&:hover": {
                      bgcolor: "#bd0606d6",
                    },
                  }}
                >
                  <DeleteIcon />
                </Button>
                <StyledDivider />
                <Button
                  onClick={() => setIsModalOpen(false)}
                  sx={{
                    color: "white",
                    fontSize: "1.4rem",
                    "&:hover": {
                      bgcolor: "#07d823a7",
                    },
                  }}
                >
                  <EditIcon />
                </Button>
              </Box>
            </div>
          </Box>
        ))
      ) : (
        <NoCommentsBox>No Comments Yet</NoCommentsBox>
      )}
    </CommentsSectionContainer>
  );
};

export default CommentSection;
