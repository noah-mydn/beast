import { Alert, Box, IconButton, Modal, Typography } from "@mui/material";
import React from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import { UserList } from "../UserList/UserList";
import { theme } from "../../theme/theme";
import ScrollableFeed from "react-scrollable-feed";

export const SearchModal = ({
  isModalOpen,
  toggleModal,
  keywordResult,
  search,
  AccessChat,
}) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "30%",
    bgcolor: "background.paper",
    // boxShadow: 24,
    outline: "none",
    padding: "1.5em 1em",
    [theme.breakpoints.down("md")]: {
      width: "50%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "80%",
    },
  };

  //console.log(keywordResult);

  return (
    <Modal
      sx={{
        minHeight: "100vh",
        border: "none",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      open={isModalOpen}
      onClose={toggleModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={style}
        display="flex"
        flexDirection="column"
        borderRadius={4}
        maxHeight={300}
      >
        <IconButton onClick={toggleModal} sx={{ marginLeft: "auto" }}>
          <CancelIcon color="primary" />
        </IconButton>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          color="primary"
          fontWeight="bolder"
          textAlign="center"
        >
          Keyword : {search}
        </Typography>
        {keywordResult.length <= 0 && (
          <Box my={2}>
            <Alert variant="filled" severity="error">
              No user is found!
            </Alert>
          </Box>
        )}
        <ScrollableFeed>
          {keywordResult?.map((user) => {
            return (
              <UserList keyword={user} key={user} AccessChat={AccessChat} />
            );
          })}
        </ScrollableFeed>
      </Box>
    </Modal>
  );
};
