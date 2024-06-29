import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { styled } from "@mui/system";
import theme from "../../../MUI/theme";

export const StyledList = styled(List)({
  [theme.breakpoints.down("md")]: {
    gap: 0,
  },
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
  alignItems: "center",
});

export const StyledListItem = styled(ListItem)({
  [theme.breakpoints.down("md")]: {
    width: "95%",
  },
  width: "5rem",
  borderRadius: "1rem",
  cursor: "pointer",
  display: "flex",
  justifyContent: "center",
  alignItems: "center", 
  "&:hover": {
    backgroundColor: "#33333369",
    "& .MuiListItemIcon-root": {
      color: "#fff",
    },
    "& .MuiTypography-root": {
      color: "#fff",
    },
  },
  "&.Mui-selected": {
    backgroundColor: "#444",
  },
});

export const StyledListItemIcon = styled(ListItemIcon)({
  [theme.breakpoints.down("md")]: {
    maxWidth: "5rem",
  },
  color: "#727272",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "100%",
});

export const StyledListItemText = styled(ListItemText)({
  "& .MuiTypography-root": {
    fontSize: "1.5rem",
    color: "#727272",
    fontWeight: "bold",
  },
});
