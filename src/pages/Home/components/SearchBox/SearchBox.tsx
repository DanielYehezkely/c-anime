import React from "react";
import {
  Box,
  Stack,
  Autocomplete,
  TextField,
  CircularProgress,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useAnimeApi } from "../../../../hooks/useAnimeApi";

const SearchBox: React.FC = () => {
  const { animeList, loading, error } = useAnimeApi();

  return (
    <Box
      component="section"
      sx={{
        height: "auto",
        width: "95%",
        zIndex: 10,
        padding: "20px",
      }}
    >
      {error && <div>Error fetching data: {error}</div>}
      <Stack spacing={2} sx={{ width: 300 }}>
        <Autocomplete
          freeSolo
          id="free-solo-2-demo"
          options={animeList.map((option) => option.title)}
          sx={{
            height: "6rem",
            width: "38.5rem",
            color: "white",
            bgcolor: "#101010",
            border: "1px solid #252525",
            borderRadius: "0.5rem",
            "& input": {
              fontSize: "1.8rem",
              color: "white",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#252525",
              },
              "&:hover fieldset": {
                borderColor: "#252525",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#252525",
              },
            },
            "& .MuiAutocomplete-option": {
              color: "white",
              backgroundColor: "#101010",
              "&[data-focus='true']": {
                backgroundColor: "#303030",
              },
              "&[aria-selected='true']": {
                backgroundColor: "#303030",
              },
            },
            "& .MuiAutocomplete-paper": {
              backgroundColor: "#101010",
            },
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search Anime"
              InputLabelProps={{
                style: { color: "white", fontSize: "2rem" },
              }}
              InputProps={{
                ...params.InputProps,
                type: "search",
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon style={{ color: "white", fontSize: "3rem" }} />
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
