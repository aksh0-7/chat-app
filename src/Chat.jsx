import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => socket.off("receive_message");
  }, []);

  const sendMessage = () => {
    if (message) {
      socket.emit("send_message", message);
      setMessage("");
    }
  };

  return (
    <div className="p-4">
      <div className="border p-4 h-64 overflow-auto">
        {messages.map((msg, index) => (
          <p key={index} className="bg-gray-200 p-2 rounded mb-2">
            {msg}
          </p>
        ))}
      </div>
      <input
        className="border p-2 w-full"
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button className="bg-blue-500 text-white p-2 mt-2" onClick={sendMessage}>
        Send
      </button>
    </div>
  );
}

export default Chat;
