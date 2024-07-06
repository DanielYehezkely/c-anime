import { Box } from "@mui/material";
import React from "react";
import { Anime } from "../../../../../types/Anime";

interface HeaderBoxUnderlayProps {
  bannerImage: string | null;
  currentAnime: Anime | null;
  opacity: number;
}

const HeaderBoxUnderlay: React.FC<HeaderBoxUnderlayProps> = ({
  bannerImage,
  currentAnime,
  opacity,
}) => {
  return (
    <Box
      position="absolute"
      sx={{
        right: 0,
        height: "54rem",
        width: "95%",
        zIndex: 1,
        transition:
          "background-image 0.5s ease-in-out, opacity 0.5s ease-in-out",
        backgroundImage: `linear-gradient(to top, rgba(12, 12, 12, 1), rgba(0, 0, 0, 0.445) 30%),linear-gradient(to bottom, #0c0c0cb2, rgba(0, 0, 0, 0) 20%), url(${
          bannerImage ||
          (currentAnime && currentAnime.images.webp.large_image_url)
        })`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        opacity: opacity,
      }}
    />
  );
};

export default HeaderBoxUnderlay;
