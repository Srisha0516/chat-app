import { useState } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = () => {
    if (!message.trim()) return;

    setChat((prev) => [
      ...prev,
      { text: message, sender: "user" },
    ]);

    setMessage("");
  };

  return (
    <div className="app">
      <div className="chat-card">

        {/* ❌ removed header */}

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