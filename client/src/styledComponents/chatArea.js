import { theme } from "../theme/theme";
const { default: styled } = require("@emotion/styled");
const { Box } = require("@mui/material");

export const ChatListContainer = styled(Box)(({ theme }) => ({
  width: "90%",
  height: "100%",
  padding: 0,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  borderRight: `2px solid ${theme.palette.info.light}`,
}));

export const ChatListItem = styled(Box)({
  marginTop: "1em",
  padding: "0.3em",
  boxShadow: 4,
  width: "95%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  background: "#fff",
  borderRadius: 4,
  boxShadow: "0 0 7px 1px rgba(0, 0, 0, .3)",
});

export const MainChatArea = styled(Box)({
  borderRadius: 8,
  height: "95%",
  width: "97%",
  paddingBottom: "0.5em",
  background: "#d9e4f5",
  backgroundImage: "#fff",
  boxShadow: "0 0 3px 2px rgba(0, 0, 0, .3)",
});
