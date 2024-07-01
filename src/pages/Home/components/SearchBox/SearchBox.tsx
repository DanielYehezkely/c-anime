import React from "react";
import { useNavigate } from "react-router";

import {
  Stack,
  TextField,
  CircularProgress,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import { useAnimeApi } from "../../../../hooks/useAnimeApi";

import {
  StyledBox,
  StyledAutocomplete,
  inputLabelPropsStyle,
  startAdornmentStyle,
} from "./SearchBox.styles";

const SearchBox: React.FC = () => {
  const { animeList, loading, error } = useAnimeApi();

   const navigate = useNavigate();

   const handleOptionSelect = (event: any, value: string | null): void => {
     if (value) {
       const selectedAnime = animeList.find((anime) => anime.title === value);
       if (selectedAnime) {
         navigate(`/singleAnime/${selectedAnime.mal_id}`);
       }
     }
   };

  return (
    <StyledBox component="section">
      {error && <div>Error fetching data: {error}</div>}
      <Stack spacing={2} sx={{ width: 300 }}>
        <StyledAutocomplete
          freeSolo
          id="free-solo-2-demo"
          options={animeList.map((option) => option.title)}
          onChange={handleOptionSelect}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search Anime"
              InputLabelProps={{
                style: inputLabelPropsStyle,
              }}
              InputProps={{
                ...params.InputProps,
                type: "search",
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon style={startAdornmentStyle} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <>
                    {loading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
        />
      </Stack>
    </StyledBox>
  );
};

export default SearchBox;
