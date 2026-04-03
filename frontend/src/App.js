import React, { useState } from "react";
import "./App.css";
import Login from "./Login";
import Signup from "./Signup";

function App() {
  const [user, setUser] = useState(null);
  const [showSignup, setShowSignup] = useState(false);

  const [messages, setMessages] = useState([
    { text: "Hey 👋 Welcome to chat!", sender: "System" },
    { text: "Start chatting below ⬇️", sender: "System" }
  ]);

  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim() === "") return;

    setMessages([
      ...messages,
      { text: input, sender: user.name }
    ]);

    setInput("");
  };

  // 🔥 Logout
  const logout = () => {
    setUser(null);
  };

  // 🔐 AUTH SCREEN
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

        {/* HEADER */}
        <div className="chat-header">
          <div>
            <h3>💬 Chat App</h3>
            <p>{user.name} • Online</p>
          </div>

          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        </div>

        {/* MESSAGES */}
        <div className="chat-box">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${
                msg.sender === user.name ? "own" : "other"
              }`}
            >
              <span className="sender">{msg.sender}</span>
              <p>{msg.text}</p>
            </div>
          ))}
        </div>

        {/* INPUT */}
        <div className="input-box">
          <input
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <button onClick={sendMessage}>Send</button>
        </div>

      </div>
    </div>
  );
}

export default App;