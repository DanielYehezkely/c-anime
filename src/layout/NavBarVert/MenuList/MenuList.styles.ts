import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { styled } from "@mui/system";
import theme from "../../../MUI/theme";

export const StyledList = styled(List)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "0 1.5rem",
  [theme.breakpoints.down("md")]: {
    gap: 0,
  },
});

export const StyledListItem = styled(ListItem)({
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
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
});

export const StyledListItemIcon = styled(ListItemIcon)({
  color: "#727272",
  display: "flex",
  justifyContent: "center",
  alignItems: "center", 
});

export const StyledListItemText = styled(ListItemText)({
  "& .MuiTypography-root": {
    fontSize: "1.5rem",
    color: "#727272",
    fontWeight: "bold",
  },
});
