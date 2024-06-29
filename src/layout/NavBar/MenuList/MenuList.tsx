import React from "react";

import {
  Home as HomeIcon,
  Info as InfoIcon,
  Mail as MailIcon,
} from "@mui/icons-material";
import NavLogo from "../NavLogo/NavLogo";

import {
  StyledListItemIcon,
  StyledListItemText,
  StyledListItem,
  StyledList,
} from "./MenuList.styles";

const menuItems = [
  { text: "Home", icon: <HomeIcon sx={{ fontSize: "2.5rem" }} /> },
  { text: "About", icon: <InfoIcon sx={{ fontSize: "2.5rem" }} /> },
  { text: "Contact", icon: <MailIcon sx={{ fontSize: "2.5rem" }} /> },
];

interface MenuListProps {
  onItemClick?: () => void;
  isMobile?: boolean;
}

const MenuList: React.FC<MenuListProps> = ({
  onItemClick,
  isMobile = true,
}) => {
  return (
    <StyledList>
      {isMobile && <NavLogo />}
      {menuItems.map((item, index) => (
        <StyledListItem key={index} onClick={onItemClick}>
          <StyledListItemIcon>{item.icon}</StyledListItemIcon>
          {isMobile && (
            <StyledListItemText
              primary={item.text}
            />
          )}
        </StyledListItem>
      ))}
    </StyledList>
  );
};

export default MenuList;
