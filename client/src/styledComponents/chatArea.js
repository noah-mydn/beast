const { default: styled } = require("@emotion/styled");
const { Box } = require("@mui/material");

export const ChatListContainer = styled(Box)({
  width: "90%",
  height: "100%",
  padding: 0,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

export const ChatListItem = styled(Box)({
  marginTop: "1em",
  padding: "0.3em",
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
  margin: "0.2em auto 0 auto",
  height: "95%",
  width: "97%",
  paddingBottom: "0.5em",
  background: "#d9e4f5",
  backgroundImage: "#fff",
  boxShadow: "0 0 4px 1px rgba(0, 0, 0, .5)",
  overflow: "hidden",
});

export const ChatTitle = styled(Box)(({ theme }) => ({
  background: theme.palette.primary.light,
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
  scrollbarWidth: "none",
  overflowY: "auto",
});

export const TextRegion = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "auto",
  marginTop: "0.5em",
  padding: "0.5em 0.2em",
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#fff",
  display: "flex",
  WebkitOverflowScrolling: "auto",
  justifyContent: "space-between",
  alignItems: "center",
}));

export const AttachMentIconWrapper = styled(Box)(({ theme }) => ({
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
}));

export const BubbleTextContainer = styled(Box)({
  display: "flex",
  margin: "1em 0",
  alignItems: "center",
});

export const BubbleTextImg = styled(Box)({
  width: 40,
  height: 40,
  borderRadius: "50%",
  objectFit: "cover",
  marginRight: "0.3em",
});

export const BubbleText = styled(Box)({
  borderRadius: 8,
  background: "#cecece",
  padding: "0.5em",
});
