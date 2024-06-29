import React from "react";

import {
  Home as HomeIcon,
  LibraryBooks as InfoIcon,
  Mail as MailIcon,
  AccountCircleRounded as AccountIcon,
  TravelExplore as ExploreIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import { Tooltip } from "@mui/material";

import NavLogo from "../NavLogo/NavLogo";
import {
  StyledListItemIcon,
  StyledListItemText,
  StyledListItem,
  StyledBottomListItem,
  StyledTopList,
  StyledBottomList,
} from "./MenuList.styles";

const menuItems = [
  { text: "Home", icon: <HomeIcon sx={{ fontSize: "2.5rem" }} /> },
  { text: "Watch List", icon: <InfoIcon sx={{ fontSize: "2.5rem" }} /> },
  { text: "Explore", icon: <ExploreIcon sx={{ fontSize: "2.5rem" }} /> },
  { text: "Search", icon: <SearchIcon sx={{ fontSize: "2.5rem" }} /> },
];

const bottomMenuItems = [
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
    <>
      <StyledTopList>
        {isMobile && <NavLogo />}
        {menuItems.map((item, index) => (
          <StyledListItem key={index} onClick={() => onItemClick(item.text)}>
            {!isMobile ? (
              <Tooltip   //*? I can take this out to the styles file but with changing it to tsx file , the problem is with the tooltip syntax requiring tsx ...
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
      </StyledTopList>

      <StyledBottomList>
        {bottomMenuItems.map((item, index) => (
          <StyledBottomListItem
            key={index}
            onClick={() => onItemClick(item.text)}
          >
            {!isMobile ? (
              <Tooltip
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
          </StyledBottomListItem>
        ))}
      </StyledBottomList>
    </>
  );
};

export default MenuList;
