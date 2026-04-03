import React, { useState, useEffect } from "react";
import "./App.css";
import Login from "./Login";
import Signup from "./Signup";
import { io } from "socket.io-client";

// 🔥 CONNECT TO BACKEND
const socket = io("https://chat-app-backend-j0ec.onrender.com");

function App() {
  const [user, setUser] = useState(null);
  const [showSignup, setShowSignup] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // 🔥 RECEIVE MESSAGES
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => socket.off("receive_message");
  }, []);

  // 🔥 SEND MESSAGE
  const sendMessage = () => {
    if (input.trim() === "") return;

    const messageData = {
      text: input,
      sender: user?.name,
    };

    socket.emit("send_message", messageData);
    setInput("");
  };

  // 🔐 LOGIN / SIGNUP SCREEN
  if (!user) {
    return (
      <div className="auth-container">
        {showSignup ? (
          <Signup setUser={setUser} setShowSignup={setShowSignup} />
        ) : (
          <Login setUser={setUser} setShowSignup={setShowSignup} />
        )}
      </div>
    );
  }

  // 💬 CHAT UI
  return (
    <div className="app">
      <div className="chat-container">

        <div className="chat-header">
          <h3>💬 Chat App</h3>
          <p>{user?.name} (Online)</p>
        </div>

        <div className="chat-box">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${
                msg.sender === user?.name ? "own" : ""
              }`}
            >
              <strong>{msg.sender}: </strong>
              {msg.text}
            </div>
          ))}
        </div>

        <div className="input-box">
          <input
            type="text"
            placeholder="Type message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={sendMessage}>➤</button>
        </div>

      </div>
    </div>
  );
}

export default App;