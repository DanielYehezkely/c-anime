import { styled } from "@mui/material/styles";
import { CardContent, Typography } from "@mui/material";

export const StyledCardContent = styled(CardContent)`
  width: 50%;
  color: white;
  display: flex;
  flex-direction: column;
`;

export const StyledTypography = styled(Typography)``;

export const RankTypography = styled(StyledTypography)`
  color: #b967da;
`;

export const BodyTypography = styled(StyledTypography)`
  font-size: 1.4rem;
`;

export const StreamTypography = styled(StyledTypography)`
  color: #9b9a9a;
`;

export const RatingTypography = styled(StyledTypography)`
  color: #d10707;
`;
