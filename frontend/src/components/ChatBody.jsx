import React from "react";
import { useNavigate } from "react-router-dom";

const ChatBody = ({ setToken, messagesReceived, currentRoom }) => {
  const navigate = useNavigate();

  const handleLeaveChat = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
    window.location.reload();
  };
  console.log("messageeeeeeee received", messagesReceived);

  return (
    <>
      <header className="chat__mainHeader">
        <p>{currentRoom ? `Room: ${currentRoom}` : "Select a room"}</p>
        <button className="leaveChat__btn" onClick={handleLeaveChat}>
          LEAVE CHAT
        </button>
      </header>

      {/*render messages based on sender and receiver*/}

      <div className="message__container">
        {messagesReceived.map((message) => (
          <div className="message__chats" key={message.id}>
            <p className="sender__name">{message.User.username}</p>
            <div
              className={
                message.User.id === parseInt(localStorage.getItem("userId"))
                  ? "message__sender"
                  : "message__recipient"
              }
            >
              <p>{message.body}</p>
            </div>
          </div>
        ))}

        {/* user type to do */}
        <div className="message__status">
          <p>Someone is typing...</p>
        </div>
      </div>
    </>
  );
};

export default ChatBody;
