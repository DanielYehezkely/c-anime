import React from "react";
import { Avatar, Box, Tabs, Tab } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

interface AvatarSectionProps {
  tabValue: number;
  handleTabChange: (event: React.SyntheticEvent, newValue: number) => void;
  a11yProps: (index: number) => { id: string; "aria-controls": string };
  children: React.ReactNode;
}

const ControlTabsSection: React.FC<AvatarSectionProps> = ({
  tabValue,
  handleTabChange,
  a11yProps,
  children,
}) => {
  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        aria-label="sign in and sign up tabs"
      >
        <Tab label="Sign In" {...a11yProps(0)} />
        <Tab label="Sign Up" {...a11yProps(1)} />
      </Tabs>
      {children}
    </Box>
  );
};

export default ControlTabsSection;
