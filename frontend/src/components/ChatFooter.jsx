import React, { useState } from "react";

const ChatFooter = ({ sendMessage }) => {
  const [message, setMessage] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();

    sendMessage(message.trim());
    setMessage("");
  };

  return (
    <div className="chat__footer">
      <form className="form" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Write message"
          className="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="sendBtn">SEND</button>
      </form>
    </div>
  );
};

export default ChatFooter;
