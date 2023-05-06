import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import { Tooltip, Typography } from "@mui/material";
import {
  BubbleText,
  BubbleTextContainer,
  BubbleTextImg,
} from "../../styledComponents/chatArea";

export const ScrollableChat = () => {
  return (
    <ScrollableFeed>
      return (
      <BubbleTextContainer>
        <Tooltip title="username">
          <BubbleTextImg component="img" src="" alt="" />
        </Tooltip>

        <BubbleText>
          <Typography variant="caption" color="#000">
            Some texts
          </Typography>
        </BubbleText>
      </BubbleTextContainer>
      );
    </ScrollableFeed>
  );
};
