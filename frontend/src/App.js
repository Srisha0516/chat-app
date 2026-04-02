import { useState } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    // show user message
    const userMsg = { text: message, sender: "user" };
    setChat((prev) => [...prev, userMsg]);

    try {
      const res = await fetch(
        "https://chat-app-backend-j0ec.onrender.com/api/test"
      );

      const data = await res.json();

      const botMsg = {
        text: data.message || "Server replied",
        sender: "bot",
      };

      setChat((prev) => [...prev, botMsg]);
    } catch (error) {
      setChat((prev) => [
        ...prev,
        { text: "❌ Server error", sender: "bot" },
      ]);
    }

    setMessage("");
  };

  return (
    <div className="app">
      <div className="chat-card">
        <div className="header">💬 Cozy Chat</div>

        <div className="chat-body">
          {chat.map((msg, i) => (
            <div
              key={i}
              className={`msg ${msg.sender === "user" ? "user" : "bot"}`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        <div className="chat-input">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type message..."
          />
          <button onClick={sendMessage}>➤</button>
        </div>
      </div>
    </div>
  );
}

export default App;