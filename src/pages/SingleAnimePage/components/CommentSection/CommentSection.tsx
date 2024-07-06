import React, { useState, useEffect } from "react";
import { useAuth } from "../../../../context/AuthContext/AuthContext";
import { Box, IconButton, Typography, Avatar, Button } from "@mui/material";
import {
  AccountCircleRounded,
  MoreVert as MoreVertIcon,
} from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../../config/firebaseConfig";
import {
  CommentsSectionContainer,
  CommentsHeader,
  StyledDivider,
  CommentsForm,
  CommentsInput,
  SubmitButton,
  NoCommentsBox,
} from "./CommentSection.styles";
import { useFirebase } from "../../../../context/FirebaseContext/FirebaseContext";
import "./CommentSection.css";

interface Comment {
  id: string;
  userId: string;
  comment: string;
  timestamp: any;
}

interface CommentSectionProps {
  animeId: string;
  liked: boolean;
  disliked: boolean;
}

const CommentSection: React.FC<CommentSectionProps> = ({
  animeId,
  liked,
  disliked,
}) => {
  const { user } = useAuth();
  const { comments, addComment, deleteComment, editComment } = useFirebase();
  const [comment, setComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editedComment, setEditedComment] = useState<string>("");
  const [userAvatars, setUserAvatars] = useState<{ [key: string]: string }>({});
  const [isModalOpen, setIsModalOpen] = useState<string | null>(null);
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
    setIsModalOpen((prev) => (prev === commentId ? null : commentId));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!comment) return;
    await addComment(animeId, comment);
    setComment("");
  };

  const handleDeleteComment = async () => {
    if (selectedCommentId) {
      await deleteComment(animeId, selectedCommentId);
      setIsModalOpen(null);
      setSelectedCommentId(null);
    }
  };

  const handleEditComment = (commentObj: Comment) => {
    setEditingCommentId(commentObj.id);
    setEditedComment(commentObj.comment);
    setIsModalOpen(null);
  };

  const handleSaveEdit = async () => {
    if (editingCommentId) {
      await editComment(animeId, editingCommentId, editedComment);
      setEditingCommentId(null);
      setEditedComment("");
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
            flexWrap="wrap"
            justifyContent="space-between"
            mb={2}
            mt={2}
            position="relative"
            maxWidth="100rem"
          >
            <Box display="flex">
              <Avatar
                src={
                  userAvatars[commentObj.userId]
                    ? userAvatars[commentObj.userId]
                    : "/path/to/default/avatar.png" //* updated default avatar path
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
                  maxWidth: "50rem",
                  wordWrap: "break-word",
                  overflow: "hidden",
                  whiteSpace: "pre-wrap",
                }}
              >
                <Box display="flex" alignItems="center" gap="1rem">
                  <Typography sx={{ color: "white", fontSize: "1.4rem" }}>
                    {commentObj.userId === user?.uid
                      ? user.displayName
                      : "Anonymous"}
                  </Typography>
                  <Typography sx={{ color: "#ffffff83" }}>
                    {new Date(
                      commentObj.timestamp.seconds * 1000
                    ).toLocaleString()}
                  </Typography>
                </Box>
                {editingCommentId === commentObj.id ? (
                  <CommentsInput
                    value={editedComment}
                    onChange={(e) => setEditedComment(e.target.value)}
                  />
                ) : (
                  <Typography sx={{ color: "#ffffffe1", fontSize: "1.6rem" }}>
                    {commentObj.comment}
                  </Typography>
                )}
              </Box>
            </Box>
            {editingCommentId === commentObj.id && (
              <Box display="flex" justifyContent="center" mt={2}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSaveEdit}
                >
                  Save
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => setEditingCommentId(null)}
                  sx={{ ml: 2 }}
                >
                  Cancel
                </Button>
              </Box>
            )}
            {commentObj.userId === user?.uid && (
              <IconButton
                onClick={() => {
                  handleModalToggle(commentObj.id);
                  setSelectedCommentId(commentObj.id);
                }}
                sx={{ color: "white" }}
              >
                <MoreVertIcon sx={{ fontSize: "2rem" }} />
              </IconButton>
            )}
            {isModalOpen === commentObj.id && (
              <div className={`custom-modal open`}>
                <Box display="flex" flexDirection="column" gap="1rem">
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
                    <DeleteIcon style={{ fontSize: "2rem" }} />
                  </Button>
                  <StyledDivider />
                  <Button
                    onClick={() => handleEditComment(commentObj)}
                    sx={{
                      color: "white",
                      fontSize: "1.4rem",
                      "&:hover": {
                        bgcolor: "#07d823a7",
                      },
                    }}
                  >
                    <EditIcon style={{ fontSize: "2rem" }} />
                  </Button>
                </Box>
              </div>
            )}
          </Box>
        ))
      ) : (
        <NoCommentsBox>No Comments Yet</NoCommentsBox>
      )}
    </CommentsSectionContainer>
  );
};

export default CommentSection;
