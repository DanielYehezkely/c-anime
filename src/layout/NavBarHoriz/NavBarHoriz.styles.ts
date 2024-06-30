import { AppBar, Box, Button, Toolbar } from "@mui/material";
import { styled } from "@mui/system";
import bgImage from "/assets/svg/pattern-3.svg";

export const StyledAppBar = styled(AppBar)(({ theme }) => ({
  boxShadow: "none",
  backgroundColor: "transparent",
  width: "100%",
  height: "9rem",
  display: "flex",
  justifyContent: "center",
  position: "absolute",
  backgroundImage: `url(${bgImage})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  paddingLeft: "9rem",
  [theme.breakpoints.down("md")]: {
    display: "none"
  },
}));

export const StyledToolbar = styled(Toolbar)({
  display: "flex",
  gap: "3rem",
  zIndex: 2,
  minWidth: "55rem",
});

export const StyledBox = styled(Box)({
  position: "absolute",
  bottom: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundImage: "linear-gradient(to top, #0C0C0C, rgba(0, 0, 0, 0.541))",
  zIndex: 1,
});

export const StyledButton = styled(Button)({
  fontSize: "1.8rem",
  fontWeight: 600,
  color: "#cccccc",
  "&:hover": {
    backgroundColor: "#33333369",
    color: "#fff",
  },
});