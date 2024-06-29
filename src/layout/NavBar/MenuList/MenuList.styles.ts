import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { styled } from "@mui/system";

export const StyledList = styled(List)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "0 1.5rem",
});

export const StyledListItem = styled(ListItem)({
  borderRadius: "1rem",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#333",
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
  color: "#727272",
  display: "flex",
  justifyContent: "center",
});

export const StyledListItemText = styled(ListItemText)({
  "& .MuiTypography-root": {
    fontSize: "1.5rem",
    color: "#727272",
    fontWeight: "bold",
  },
});
