import {
  AppBar as MuiAppBar,
  Drawer as MuiDrawer,
  Toolbar as MuiToolbar,
} from "@mui/material";

import { styled } from "@mui/system";

export const StyledAppBar = styled(MuiAppBar)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  left: 0,
  top: 0,
  paddingTop: "1.5rem",
  width: "8rem",
  height: "100vh",
  borderRight: "1px solid #252525",
  backgroundColor: "#0C0C0C",
  position: "fixed",
  [theme.breakpoints.down("md")]: {
    width: "100%",
    height: "auto",
    borderRight: "none",
  },
}));

export const StyledToolbar = styled(MuiToolbar)(({ theme }) => ({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  [theme.breakpoints.down("md")]: {
    justifyContent: "space-between",
  },
}));

export const StyledDrawer = styled(MuiDrawer)({
  "& .MuiDrawer-paper": {
    width: "100%",
    backgroundColor: "#0C0C0C",
    padding: "3rem 0rem",
  },
});
