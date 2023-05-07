import { Skeleton, Stack } from "@mui/material";
import React from "react";

export const ChatSkeletons = () => {
  return (
    <Stack
      direction="column"
      display="flex"
      justifyContent="space-around"
      minHeight="70vh"
    >
      <Skeleton
        variant="rectangle"
        width="95%"
        height={50}
        animation="pulse"
        sx={{ borderRadius: 2 }}
      />
      <Skeleton
        variant="rectangle"
        width="95%"
        height={50}
        animation="pulse"
        sx={{ borderRadius: 2 }}
      />
      <Skeleton
        variant="rectangle"
        width="95%"
        height={50}
        animation="pulse"
        sx={{ borderRadius: 2 }}
      />
      <Skeleton
        variant="rectangle"
        width="95%"
        height={50}
        animation="pulse"
        sx={{ borderRadius: 2 }}
      />
      <Skeleton
        variant="rectangle"
        width="95%"
        height={50}
        animation="pulse"
        sx={{ borderRadius: 2 }}
      />
      <Skeleton
        variant="rectangle"
        width="95%"
        height={50}
        animation="pulse"
        sx={{ borderRadius: 2 }}
      />
      <Skeleton
        variant="rectangle"
        width="95%"
        height={50}
        animation="pulse"
        sx={{ borderRadius: 2 }}
      />
    </Stack>
  );
};
