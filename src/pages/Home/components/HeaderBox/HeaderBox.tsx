import { Box } from "@mui/material";
import React from "react";
import { useAnimeApi } from "../../../../hooks/useAnimeApi";


const HeaderBox: React.FC = () => {


  const { animeList } = useAnimeApi(); 


  return (
    <>
      <Box
        position="absolute"
        sx={{
          right: 0,
          bgcolor: "#00ff0036",
          height: "54rem",
          width: "95%",
          backgroundImage:
            "linear-gradient(to top, #0C0C0C , rgba(0, 0, 0, 0) 30%)",
          zIndex: 1,
        }}
      ></Box>
      <Box
        component="header"
        sx={{
          border: "1px solid white",
          height: "30rem",
          width: "95%",
          zIndex: 10,
          marginTop: "10rem",
        }}
      >
        {animeList.map((anime) => {
          return (
            <div className="div" key={anime.id}>
              <h1>{anime.title}</h1>
              {anime.main_picture && anime.main_picture.medium && (
                <img src={anime.main_picture.medium} alt={anime.title} />
              )}
            </div>
          );
        })}
      </Box>
    </>
  );
};

export default HeaderBox;
