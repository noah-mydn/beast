import styled from "@emotion/styled";
import { Button, TextField } from "@mui/material";

export const CustomTextField = styled(TextField)(({ theme }) => ({
  width: 300,
  fontSize: 14,

  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: theme.palette.text.main,
    },
    "&:hover fieldset": {
      borderColor: theme.palette.secondary.dark,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.light,
    },
  },
}));

export const FormContainer = styled("form")(({ theme, register }) => ({
  maxWidth: register ? 350 : 300,
  height: register ? 500 : 400,
  padding: "1.2em 2em",
  backgroundColor: "white",
  boxShadow: "0 3px 5px 2px rgba(0, 0, 0, .7)",
  borderRadius: 8,
}));

export const CustomBtn = styled(Button)(({ theme }) => ({
  background: theme.palette.primary.main,
  color: "white",
  padding: "0.5em 1.5em",
  fontSize: 16,
  marginBottom: 2,
  "&:hover": {
    background: theme.palette.error.main,
  },
}));
