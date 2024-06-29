import React from "react";

import Box from "@mui/material/Box";
import styled from "styled-components";

const LogoBox = styled(Box)`
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NavLogo: React.FC = () => (
  <LogoBox>
    <img src="/public/assets/images/C-icon.png" alt="logo" className="logo" />
  </LogoBox>
);

export default NavLogo;
