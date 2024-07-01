import styled from "styled-components";
import { Box, Autocomplete } from "@mui/material";
import { Anime } from "../../../../types/Anime";

export const StyledBox = styled(Box)`
  height: auto;
  width: 95%;
  z-index: 10;
  padding: 20px;
`;

export const StyledAutocomplete = styled(Autocomplete)<{ options: Anime[] }>`
  height: 6rem;
  width: 38.5rem;
  color: white;
  background-color: #101010;
  border: 1px solid #252525;
  border-radius: 0.5rem;

  & input {
    font-size: 1.8rem;
    color: white;
  }

  & .MuiOutlinedInput-root {
    & fieldset {
      border-color: #252525;
    }
    &:hover fieldset {
      border-color: #252525;
    }
    &.Mui-focused fieldset {
      border-color: #252525;
    }
  }

  & .MuiAutocomplete-option {
    color: white;
    background-color: #101010;

    &[data-focus="true"] {
      background-color: #303030;
    }

    &[aria-selected="true"] {
      background-color: #303030;
    }
  }

  & .MuiAutocomplete-paper {
    background-color: #101010;
  }
`;

export const inputLabelPropsStyle = {
  color: "white",
  fontSize: "2rem",
};

export const startAdornmentStyle = {
  color: "white",
  fontSize: "3rem",
};
