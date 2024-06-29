import React from "react";

import { List, ListItem } from "@mui/material";
import {
  Home as HomeIcon,
  Info as InfoIcon,
  Mail as MailIcon,
} from "@mui/icons-material";

import { StyledListItemIcon, StyledListItemText } from "./MenuList.styles";

const menuItems = [
  { text: "Home", icon: <HomeIcon sx={{ fontSize: "2.5rem" }} /> },
  { text: "About", icon: <InfoIcon sx={{ fontSize: "2.5rem" }} /> },
  { text: "Contact", icon: <MailIcon sx={{ fontSize: "2.5rem" }} /> },
];

interface MenuListProps {
  onItemClick?: () => void;
  isMobile?: boolean;
}

const MenuList: React.FC<MenuListProps> = ({ onItemClick, isMobile }) => {
  return (
    <List>
      {menuItems.map((item, index) => (
        <ListItem button key={index} onClick={onItemClick}>
          <StyledListItemIcon>{item.icon}</StyledListItemIcon>
          {isMobile && <StyledListItemText primary={item.text} />}
        </ListItem>
      ))}
    </List>
  );
};

export default MenuList;
