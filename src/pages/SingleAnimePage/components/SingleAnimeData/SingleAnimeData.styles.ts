import { styled } from "@mui/material/styles";
import { CardContent, Typography } from "@mui/material";

export const StyledCardContent = styled(CardContent)`
  width: 95%;
  color: white;
  display: flex;
  flex-direction: column;
  z-index: 2;
`;

export const BackgroundInfoTypography = styled(Typography)`
  max-width: 50% ;
`;

export const RankTypography = styled(Typography)`
  color: #b967da;
`;

export const BodyTypography = styled(Typography)`
  font-size: 1.4rem;
`;

export const StreamTypography = styled(Typography)`
  color: #9b9a9a;
`;

export const RatingTypography = styled(Typography)`
  color: #d10707;
`;
