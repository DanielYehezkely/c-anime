import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Stack,
  Autocomplete,
  TextField,
  CircularProgress,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {
  boxStyle,
  autoCompleteStyle,
  inputLabelPropsStyle,
  startAdornmentStyle,
} from "./SearchBox.styles";
import { Anime } from "../../../../types/Anime";
import { useAnime } from "../../../../context/FetchMalAnimeContext/FetchMalAnimeContext";

const SearchBox: React.FC = () => {
  const { combinedAnimeList, loading, error } = useAnime();
  const navigate = useNavigate();

  const handleOptionSelect = (value: string | Anime | null | undefined) => {
    if (value && typeof value !== "string" && typeof value !== "number") {
      navigate(`/singleAnime/${value.mal_id}`);
    }
  };

  return (
    <Box component="section" sx={boxStyle}>
      {error && <div>Error fetching data: {error}</div>}
      <Stack spacing={2} sx={{ width: 300 }}>
        <Autocomplete
          freeSolo
          id="free-solo-2-demo"
          options={combinedAnimeList.map((option) => option.title)}
          getOptionLabel={(option: string) => option}
          onChange={(_, value) => handleOptionSelect(value)}
          sx={autoCompleteStyle}
          renderOption={(props, option) => {
            const selectedAnime = combinedAnimeList.find(
              (anime) => anime.title === option
            );
            return (
              <li
                {...props}
                key={selectedAnime?.mal_id}
                onClick={() => handleOptionSelect(selectedAnime)}
                style={{ cursor: "pointer" }}
              >
                {option}
              </li>
            );
          }}
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
    </Box>
  );
};

export default SearchBox;
