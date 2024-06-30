import { AppBar, Box, Button, Toolbar } from "@mui/material";
import { styled, css } from "@mui/system";
import bgImage from "/assets/svg/pattern-3.svg";

export const StyledAppBar = styled(AppBar)(
  ({ theme }) => css`
    box-shadow: none;
    background-color: transparent;
    width: 100%;
    height: 9rem;
    display: flex;
    justify-content: center;
    position: absolute;
    background-image: url(${bgImage});
    background-size: cover;
    background-position: center;
    padding-left: 9rem;
    ${theme.breakpoints.down("md")} {
      display: none;
    }
  `
);

export const StyledToolbar = styled(Toolbar)(
  css`
    display: flex;
    gap: 3rem;
    z-index: 2;
    min-width: 55rem;
  `
);

export const StyledBox = styled(Box)(
  css`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(to top, #0c0c0c, rgba(0, 0, 0, 0.541));
    z-index: 1;
  `
);

export const StyledButton = styled(Button)(
  css`
    font-size: 1.8rem;
    font-weight: 600;
    color: #ccccccbd;
    &:hover {
      background-color: #33333369;
      color: #fff;
    }
  `
);

export const ActiveStyledButton = styled(StyledButton)(
  css`
    color: #d3c8fd;
  `
);