import { styled } from "@mui/material/styles";
import { CardContent, Typography } from "@mui/material";

export const StyledCardContent = styled(CardContent)`
  width: 95%;
  color: white;
  display: flex;
  flex-direction: column;
  z-index: 2;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
`;

export const BackgroundInfoTypography = styled(Typography)`
  max-width: 80%;
  margin-bottom: 1rem;
  font-size: 1.2rem;
  color: #f0f0f0;
  line-height: 1.5;
`;

export const RankTypography = styled(Typography)`
  color: #ffd700;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

export const BodyTypography = styled(Typography)`
  font-size: 1.2rem;
  color: #b0c4de;
  margin-bottom: 1rem;
`;

export const StreamTypography = styled(Typography)`
  color: #87cefa;
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

export const RatingTypography = styled(Typography)`
  color: #ff4500;
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;
