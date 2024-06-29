import { Box } from "@mui/material";
import { styled } from "@mui/system";

export const StyledLogoBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "1rem",
});

export const StyledLogoImage = styled("img")({
  width: "4rem",
  height: "auto",
  background: "linear-gradient(to bottom, white 50%, rgb(129, 129, 129) 100%)",
  borderRadius: "0.5rem",
  border: "1px solid white",
});
