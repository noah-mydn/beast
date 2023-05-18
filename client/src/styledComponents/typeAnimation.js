import styled from "@emotion/styled";
import {Box} from "@mui/material"

export const TypingAnimationContainer = styled(Box)({
  width: "1em",
  height: "1em",
  position: "relative",
  padding: "0.2em",
  background: "#e6e6e6",
  borderRadius: 2,
});

export const TypingDot = styled(Box)({
  float: "left",
  width: "5px",
  height: "5px",
  margin: "0 0.05em",
  background: "#8d8c91",
  borderRadius: "50%",
  animation: "typing 2s infinite",
  opacity: 0,

  "&:nth-child(1)": {
    animationDelay: "0s",
  },
  "&:nth-child(2)": {
    animationDelay: "200ms",
  },
  "&:nth-child(3)": {
    animationDelay: "400ms",
  },
  "@keyframes typing": {
    "0%": {
      opacity: 0,
    },
    "50%": {
      opacity: 0.8,
    },
    "100%": {
      opacity: 0,
    },
  },
});
