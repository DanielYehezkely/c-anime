import React from "react";

import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";

import {
  Home as HomeIcon,
  Info as InfoIcon,
  Mail as MailIcon,
} from "@mui/icons-material";

import styled from "styled-components";

const StyledListItemIcon = styled(ListItemIcon)`
  color: #fff;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const menuItems = [
  { text: "Home", icon: <HomeIcon sx={{ fontSize: "2.5rem" }} /> },
  { text: "About", icon: <InfoIcon sx={{ fontSize: "2.5rem" }} /> },
  { text: "Contact", icon: <MailIcon sx={{ fontSize: "2.5rem" }} /> },
];

const MenuList: React.FC<{ onItemClick?: () => void }> = ({ onItemClick }) => (
  <List>
    {menuItems.map((item, index) => (
      <ListItem button key={index} onClick={onItemClick}>
        <StyledListItemIcon>{item.icon}</StyledListItemIcon>
        <ListItemText primary={item.text} sx={{ color: "#fff" }} />
      </ListItem>
    ))}
  </List>
);

export default MenuList;
