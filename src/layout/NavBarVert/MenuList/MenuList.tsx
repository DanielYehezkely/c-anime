import React from "react";

import {
  Home as HomeIcon,
  LibraryBooks as InfoIcon,
  Mail as MailIcon,
  AccountCircleRounded as AccountIcon,
  TravelExplore as ExploreIcon,
  Search,
} from "@mui/icons-material";
import { Tooltip } from "@mui/material";

import NavLogo from "../NavLogo/NavLogo";
import {
  StyledListItemIcon,
  StyledListItemText,
  StyledListItem,
  StyledList,
} from "./MenuList.styles";

const menuItems = [
  { text: "Home", icon: <HomeIcon sx={{ fontSize: "2.5rem" }} /> },
  { text: "Watch List", icon: <InfoIcon sx={{ fontSize: "2.5rem" }} /> },
  { text: "Explore", icon: <ExploreIcon sx={{ fontSize: "2.5rem" }} /> },
  { text: "Search", icon: <Search sx={{ fontSize: "2.5rem" }} /> },
  { text: "Contact", icon: <MailIcon sx={{ fontSize: "2.5rem" }} /> },
  { text: "Sign-In", icon: <AccountIcon sx={{ fontSize: "2.5rem" }} /> },
];

interface MenuListProps {
  onItemClick: (pageName: string) => void;
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
        <StyledListItem key={index} onClick={() => onItemClick(item.text)}>
          {!isMobile ? (
            <Tooltip //*? The syntax of customizing tooltip in MUI is requiring tsx file , what should i do ? put it here or change the file of th styles.ts to tsx ?
              title={item.text}
              placement="right"
              componentsProps={{
                tooltip: {
                  sx: {
                    backgroundColor: "#333",
                    color: "white",
                    fontSize: "1.6rem",
                    borderRadius: "0.5rem",
                    padding: "0.5rem",
                  },
                },
              }}
            >
              <StyledListItemIcon>{item.icon}</StyledListItemIcon>
            </Tooltip>
          ) : (
            <StyledListItemIcon>{item.icon}</StyledListItemIcon>
          )}
          {isMobile && <StyledListItemText primary={item.text} />}
        </StyledListItem>
      ))}
    </StyledList>
  );
};

export default MenuList;
