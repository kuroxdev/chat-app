import React, { useEffect, useState } from "react";
import io from "socket.io-client";

import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";
import axios from "axios";
import UserList from "./UserList";
import Stories from "./Stories";

const socket = io("http://localhost:3000");

const Chat = ({ setToken }) => {
  const [currentRoom, setCurrentRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [stories, setStories] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchUsers();
    fetchStories();

    socket.connect();

    socket.on("private_message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("private_message");
      socket.disconnect();
    };
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:3000/auth/users", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      console.log(response.data);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const joinOrCreateRoom = async (receiverId) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/room/create",
        { receiverId },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      const roomId = response.data.id;
      setCurrentRoom(roomId);
      socket.emit("join_private_room", roomId);
      fetchMessages(roomId);
    } catch (error) {
      console.error("Error creating/joining room:", error);
    }
  };

  const fetchMessages = async (roomId) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/room/getone/${roomId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const sendMessage = (message) => {
    if (currentRoom) {
      socket.emit("send_private_message", {
        roomId: currentRoom,
        message,
        userId,
      });
    }
  };

  const fetchStories = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/story/get", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      console.log("stories data ", response.data);
      setStories(response.data);
    } catch (error) {
      console.error("Error fetching stories:", error);
    }
  };

  const createStory = async (storyData) => {
    try {
      await axios.post("http://localhost:3000/api/story/create", storyData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchStories();
    } catch (error) {
      console.error("Error creating story:", error);
    }
  };

  return (
    <div className="chat-container">
      <div className="stories-container">
        <Stories stories={stories} createStory={createStory} />
      </div>
      <div className="chat-content">
        <div className="user__sidebar">
          <UserList users={users} joinOrCreateRoom={joinOrCreateRoom} />
        </div>
        <div className="chat__main">
          <ChatBody
            setToken={setToken}
            messagesReceived={messages}
            currentRoom={currentRoom}
          />
          <ChatFooter sendMessage={sendMessage} />
        </div>
      </div>
    </div>
  );
};

export default Chat;
