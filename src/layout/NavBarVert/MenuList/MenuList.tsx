import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Avatar, Typography, Button, Box } from "@mui/material";
import { VERTICAL_MENU_ITEMS } from "../../../constants/navbarConstants";
import NavLogo from "../NavLogo/NavLogo";
import {
  StyledListItemIcon,
  StyledListItemText,
  StyledListItem,
  StyledTopList,
  StyledBottomList,
} from "./MenuList.styles";
import { useAuth } from "../../../context/AuthContext/AuthContext";
import { AccountCircle } from "@mui/icons-material";
import { Popover } from "react-tiny-popover";
import { Loader } from "../../../components";


interface MenuListProps {
  onItemClick: (pageName: string) => void;
  isMobile?: boolean;
}

const MenuList: React.FC<MenuListProps> = ({
  onItemClick,
  isMobile = true,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user, loading } = useAuth();
  const isActive = (path: string) => location.pathname === path;

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  

  const handleAvatarClick = () => {
    setIsPopoverOpen(!isPopoverOpen);
  };

  const handleLogout = () => {
    logout(() => {
      setIsPopoverOpen(false);
      navigate("/login");
    });
  };

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
            <StyledListItemIcon>{item.icon}</StyledListItemIcon>
            {isMobile && <StyledListItemText primary={item.text} />}
          </StyledListItem>
        ))}
      </StyledTopList>

      <StyledBottomList>
        <Popover
          containerStyle={{ zIndex: "10" }}
          positions={["top"]}
          isOpen={isPopoverOpen}
          padding={10}
          onClickOutside={() => setIsPopoverOpen(false)}
          content={
            <Box
              sx={{
                backgroundColor: "#2e2c2c",
                color: "#fdfdfd",
                padding: "1rem",
                borderRadius: "0.5rem",
                boxShadow: "0px 0px 1px 1px rgba(253, 253, 253, 0.5)",
                marginLeft: "1rem",
              }}
            >
              <Typography variant="body1">
                {user
                  ? "Are you sure you want to sign out?"
                  : "You are not registered yet , join us now !"}
              </Typography>
              <Box mt={2} display="flex" justifyContent="space-between">
                <Button
                  onClick={handleLogout}
                  sx={{
                    color: "white",
                    fontSize: "1.4rem",
                    backgroundColor: "#b93f3f60",
                    "&:hover": {
                      bgcolor: "#bd0606d6",
                    },
                  }}
                >
                  {user ? "Yes" : "Not now "}
                </Button>
                <Button
                  onClick={() => setIsPopoverOpen(false)}
                  sx={{
                    color: "white",
                    fontSize: "1.4rem",
                    backgroundColor: "#2eb93a5f",
                    "&:hover": {
                      bgcolor: "#07d823a7",
                    },
                  }}
                >
                  {user ? "No" : "Register"}
                </Button>
              </Box>
            </Box>
          }
        >
          {loading ?  (<Loader actionLabel="Logging..." />) : (
          <Avatar
            alt="user-avatar"
            src={user && user.photoURL ? user.photoURL : ""}
            onClick={handleAvatarClick}
            style={{ cursor: "pointer" }}
          >
            {!user || !user.photoURL ? <AccountCircle /> : null}
          </Avatar>
          )}
        </Popover>
      </StyledBottomList>
    </>
  );
};
export default MenuList;

