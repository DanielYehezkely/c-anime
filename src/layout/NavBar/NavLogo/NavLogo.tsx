import React from "react";

import { StyledLogoBox, StyledLogoImage } from "./NavLogo.styles";

const Logo: React.FC = () => {
  return (
    <StyledLogoBox>
      <StyledLogoImage src="/assets/images/C-icon.png" alt="logo" />
    </StyledLogoBox>
  );
};

export default Logo;
