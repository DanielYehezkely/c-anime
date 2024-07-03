import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { styled, css } from "@mui/system";

export const StyledList = styled(List)(
  css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  `
);

export const StyledTopList = styled(List)(
  css`
    display: flex;
    flex-direction: column;
    align-items: center;
  `
);

export const StyledBottomList = styled(List)(
  ({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 0 2rem 0;
    margin-top: auto;
    ${theme.breakpoints.down("md")} {
      margin: 0;
      padding: 0;
    }
  `
);

export const StyledListItem = styled(ListItem)(
  ({ theme }) => css`
    width: 5rem;
    border-radius: 1rem;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
      background-color: #33333369;
      & .MuiListItemIcon-root {
        color: #fff;
      }
      & .MuiTypography-root {
        color: #fff;
      }
    }
    &.Mui-selected,
    &.active {
      background-color: #33333369;
    }
    ${theme.breakpoints.down("md")} {
      width: 100%;
    }
  `
);

export const StyledListItemIcon = styled(ListItemIcon)(
  css`
    color: #727272;
    display: flex;
    justify-content: center;
  `
);

export const StyledListItemText = styled(ListItemText)(
  css`
    & .MuiTypography-root {
      font-size: 1.5rem;
      color: #727272;
      font-weight: bold;
    }
  `
);
