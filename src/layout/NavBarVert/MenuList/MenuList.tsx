import React from "react";
import { useLocation } from "react-router-dom";
import { Tooltip } from "@mui/material";
import {
  BOTTOM_MENU_ITEMS,
  VERTICAL_MENU_ITEMS,
} from "../../../constants/navbarConstants";
import NavLogo from "../NavLogo/NavLogo";
import {
  StyledListItemIcon,
  StyledListItemText,
  StyledListItem,
  StyledBottomListItem,
  StyledTopList,
  StyledBottomList,
} from "./MenuList.styles";

interface MenuListProps {
  onItemClick: (pageName: string) => void;
  isMobile?: boolean;
}

const MenuList: React.FC<MenuListProps> = ({
  onItemClick,
  isMobile = true,
}) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <StyledTopList>
        {isMobile && <NavLogo />}
        {VERTICAL_MENU_ITEMS.map((item, index) => (
          <StyledListItem
            key={index}
            onClick={() => onItemClick(item.text)}
            className={isActive(item.path || "") ? "active" : ""}
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
          </StyledListItem>
        ))}
      </StyledTopList>

      <StyledBottomList>
        {BOTTOM_MENU_ITEMS.map((item, index) => (
          <StyledBottomListItem
            key={index}
            onClick={() => onItemClick(item.text)}
            className={isActive(item.path || "") ? "active" : ""}
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
