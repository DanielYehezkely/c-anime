import { SxProps } from "@mui/material";

export const boxStyle: SxProps = {
  height: "auto",
  width: "95%",
  zIndex: 10,
  padding: "20px",
};

export const autoCompleteStyle: SxProps = {
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
};

export const inputLabelPropsStyle = {
  color: "white",
  fontSize: "2rem",
};

export const startAdornmentStyle = {
  color: "white",
  fontSize: "3rem",
};
