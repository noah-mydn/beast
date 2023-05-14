import { theme } from "../theme/theme";

const { default: styled } = require("@emotion/styled");
const { Box } = require("@mui/material");

export const ChatListContainer = styled(Box)({
  padding: 0,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

export const ChatListItem = styled(Box)({
  cursor: "pointer",
  marginTop: "1em",
  padding: "0.4em",
  width: "95%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  background: "#fff",
  // background: theme.palette.info.dark,
  borderRadius: 4,
  boxShadow: "0 2px 6px 1px rgba(0, 0, 0, .2)",
});

export const MainChatArea = styled(Box)({
  borderRadius: 8,
  margin: "0.2em auto 0 auto",
  height: "95%",
  width: "97%",
  paddingBottom: "0.5em",
  background: "#fff",
  boxShadow: "0 0 4px 1px rgba(0, 0, 0, .5)",
  overflow: "hidden",
  position: "relative",
});

export const ChatTitle = styled(Box)(({ theme }) => ({
  //background: theme.palette.primary.light,
  borderBottom: `2px double ${theme.palette.primary.light}`,
  margin: "0 0.5em",
  borderTopLeftRadius: 8,
  borderTopRightRadius: 8,
  padding: "0.5em",
  display: "flex",
  alignItems: "center",
}));

export const Avatar = styled(Box)({
  borderRadius: "50%",
  width: "40px",
  height: "40px",
  objectFit: "cover",
});

export const ChatContent = styled(Box)({
  margin: "0 auto",
  width: "100%",
  height: "80%",
  display: "flex",
  flexDirection: "column",
  overflowY: "auto",
  scrollBehavior: "smooth",
  scrollbarWidth: "2px",
});

export const TextRegion = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: 0,
  width: "100%",
  height: "auto",
  marginTop: "0.5em",
  padding: "0.5em 0.2em",
  borderRadius: theme.shape.borderRadius,
  background: `linear-gradient(90deg , ${theme.palette.secondary.light},${theme.palette.primary.light})`,
  display: "flex",
  WebkitOverflowScrolling: "auto",
  justifyContent: "space-between",
  alignItems: "center",
}));

export const AttachMentIconWrapper = styled(Box)(({ theme }) => ({
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
}));

export const BubbleTextContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  margin: "1em 0",
  padding: " 0 0.5em",
});

export const BubbleTextImg = styled(Box)({
  width: 40,
  height: 40,
  borderRadius: "50%",
  objectFit: "cover",
  marginRight: "0.3em",
});

export const BubbleText = styled(Box)(({ IsMeTheSender }) => ({
  width: "50%",
  borderRadius: 8,
  background: IsMeTheSender
    ? theme.palette.secondary.main
    : theme.palette.primary.light,
  padding: "0.5em",
  marginLeft: IsMeTheSender ? "auto" : "0.3em",
  marginRight: IsMeTheSender ? "0.3em" : "auto",
  color: "#fff",
}));

export const TimeStamp = styled("span")(({ IsMeTheSender }) => ({
  marginLeft: IsMeTheSender ? "auto" : "4em",
  marginRight: IsMeTheSender ? "1em" : "auto",
  color: "#9f9f9f",
  fontSize: 12,
  fontStyle: "italic",
  fontFamily: "Dosis",
}));
