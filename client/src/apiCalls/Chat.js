import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

export const createChat = (data) => API.post("/chat/", data);

export const getAllChats = (id, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    API.get(`/chat/${id}`, config);
  } catch (e) {
    console.log(e);
  }
};

export const findChat = (firstId, secondId) =>
  API.get(`/chat/find/${firstId}/${secondId}`);
