import { Box } from "@mui/material";
import { styled, css } from "@mui/system";

export const StyledLogoBox = styled(Box)(
  css`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
  `
);

export const StyledLogoImage = styled("img")(
  css`
    width: 4rem;
    height: auto;
    background: linear-gradient(to bottom, white 40%, rgb(124, 100, 209) 100%);
    border-radius: 0.5rem;
    border: 1px solid white;
  `
);
