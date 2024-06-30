import {
  AppBar as MuiAppBar,
  Drawer as MuiDrawer,
  Toolbar as MuiToolbar,
} from "@mui/material";
import { styled, css } from "@mui/system";

export const StyledAppBar = styled(MuiAppBar)(
  ({ theme }) => css`
    display: flex;
    z-index: 8;
    flex-direction: column;
    align-items: center;
    left: 0;
    top: 0;
    padding-top: 1.5rem;
    width: 8rem;
    height: 100vh;
    border-right: 1px solid #252525;
    background-color: #0c0c0c;
    position: fixed;
    ${theme.breakpoints.down("md")} {
      width: 100%;
      height: auto;
      border-right: none;
    }
  `
);

export const StyledToolbar = styled(MuiToolbar)(
  ({ theme }) => css`
    width: 100%;
    display: flex;
    justify-content: center;
    ${theme.breakpoints.down("md")} {
      justify-content: space-between;
    }
  `
);

export const StyledDrawer = styled(MuiDrawer)(
  css`
    & .MuiDrawer-paper {
      width: 100%;
      background-color: #0c0c0c;
      padding: 3rem 0rem;
    }
  `
);
