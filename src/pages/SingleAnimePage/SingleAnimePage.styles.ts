import { styled } from "@mui/material/styles";
import { Box, Container } from "@mui/material";

export const SingleAnimePageContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  min-height: 100vh;
  position: relative;
`;

export const UnderlayBackgroundBox = styled(Box)`
  position: fixed;
  z-index: 1;
  left: 0;
  width: 100%;
  min-height: 85%;
  /* filter: blur(1px); */
  transition: all 0.4s ease;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: linear-gradient(
      to right,
      #000000 10%,
      rgba(0, 0, 0, 0.425) 50%
    ),
    linear-gradient(to top, #0c0c0c, #00000000 20%);
  opacity: 1;
`;
