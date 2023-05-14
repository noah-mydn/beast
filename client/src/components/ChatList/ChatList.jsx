import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import {
  ChatListContainer,
  ChatListItem,
} from "../../styledComponents/chatArea";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "../../styledComponents/searchBar";
import SearchIcon from "@mui/icons-material/Search";
import ScrollableFeed from "react-scrollable-feed";
import { toast } from "react-toastify";
import axios from "axios";
import { SearchModal } from "../SearchModal/SearchModal";
import { ChatSkeletons } from "../ChatSkeletons/ChatSkeletons";
import { theme } from "../../theme/theme";

export const ChatList = ({
  IsTablet,
  user,
  chats,
  setChats,
  chatLoading,
  selectedChat,
  setSelectedChat,
  messages,
  messageLoading,
}) => {
  const [search, setSearch] = React.useState("");
  const [keywordResult, setKeywordResult] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [accessChatLoading, setAccessChatLoading] = React.useState(false);

  //Modal For Search Result
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  //Search Functions
  const handleSearch = async () => {
    if (!search) {
      toast.error("Please enter any keywords to search!");
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      };

      const { data } = await axios.get(`/api/user/?search=${search}`, config);
      setLoading(false);
      setKeywordResult(data);
      setIsModalOpen(true);
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  //Search on Enter
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  //Extracting friend from the chat member arrays
  const friendInfo = (chat) => {
    let friend = chat.members.filter((member) => member._id !== user.data._id);

    return friend;
  };

  //Accessing New Chat or Existing Chat via Search Bar
  const AccessChat = async (userId) => {
    try {
      setAccessChatLoading(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      };
      const { data } = await axios.post(`/api/chat/`, { userId }, config);
      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setAccessChatLoading(false);
      setIsModalOpen(false);
    } catch (error) {
      setIsModalOpen(false);
      setAccessChatLoading(false);
      console.log(error);
    }
  };

  // console.log(chats);
  // console.log(user.data._id);
  //console.log(selectedChat);
  return (
    <ChatListContainer
      sx={{
        width: IsTablet ? "100%" : "90%",
        height: IsTablet ? "95%" : "98%",
      }}
    >
      {loading && (
        <Box position="absolute" top={280}>
          <CircularProgress color="text" />
        </Box>
      )}
      {!loading && (
        <SearchModal
          search={search}
          keywordResult={keywordResult}
          toggleModal={toggleModal}
          isModalOpen={isModalOpen}
          AccessChat={AccessChat}
        />
      )}
      <Search>
        <SearchIconWrapper onClick={handleSearch}>
          <SearchIcon color="text" />
        </SearchIconWrapper>
        <StyledInputBase
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          onKeyDown={handleKeyDown}
          value={search}
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
        />
      </Search>
      <ScrollableFeed className="boxShadow">
        {chatLoading && <ChatSkeletons />}
        {!chatLoading &&
          chats !== null &&
          chats?.map((chat) => {
            return (
              <ChatListItem
                key={chat._id}
                onClick={() => AccessChat(friendInfo(chat)[0]._id)}
              >
                <Box
                  component="img"
                  width={40}
                  height={40}
                  borderRadius="50%"
                  sx={{ objectFit: "cover" }}
                  src={friendInfo(chat)[0].profile}
                  alt={friendInfo(chat)[0].username}
                />

                <Box
                  display="flex"
                  flexDirection="column"
                  marginRight="auto"
                  marginLeft={2}
                >
                  <Typography
                    variant="body2"
                    textTransform="uppercase"
                    sx={{
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      color: theme.palette.secondary.dark,
                      fontWeight: "bolder",
                    }}
                  >
                    {friendInfo(chat)[0].username}
                  </Typography>
                </Box>
              </ChatListItem>
            );
          })}
      </ScrollableFeed>
    </ChatListContainer>
  );
};
