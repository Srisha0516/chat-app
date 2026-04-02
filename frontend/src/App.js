import React, { useState, useEffect, useCallback } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const fetchUsers = useCallback(async () => {
    const res = await fetch("http://localhost:5000/users");
    const data = await res.json();
    setUsers(data);
  }, []);

  const fetchMessages = useCallback(async () => {
    if (!currentUser || !selectedUser) return;

    const res = await fetch(
      `http://localhost:5000/messages/${currentUser._id}/${selectedUser._id}`
    );
    const data = await res.json();
    setMessages(data);
  }, [currentUser, selectedUser]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const res = await fetch("http://localhost:5000/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sender: currentUser._id,
        receiver: selectedUser._id,
        text: message,
      }),
    });

    const data = await res.json();
    setMessages((prev) => [...prev, data]);
    setMessage("");
  };

  const handleLogin = (user) => {
    setCurrentUser(user);
  };

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "Arial" }}>
      
      {/* LEFT PANEL */}
      <div
        style={{
          width: "30%",
          backgroundColor: "#111b21",
          color: "white",
          padding: "15px",
        }}
      >
        <h2>Chats</h2>

        {users.map((user) => (
          <div key={user._id} style={{ marginBottom: "10px" }}>
            {!currentUser ? (
              <button
                onClick={() => handleLogin(user)}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "10px",
                  border: "none",
                  backgroundColor: "#00a884",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                Login as {user.username}
              </button>
            ) : (
              <button
                onClick={() => setSelectedUser(user)}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "10px",
                  border: "none",
                  backgroundColor: "#202c33",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                {user.username}
              </button>
            )}
          </div>
        ))}
      </div>

      {/* RIGHT CHAT AREA */}
      <div
        style={{
          width: "70%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#0b141a",
        }}
      >
        {/* HEADER */}
        <div
          style={{
            padding: "15px",
            backgroundColor: "#202c33",
            color: "white",
          }}
        >
          {selectedUser ? selectedUser.username : "Select a chat"}
        </div>

        {/* MESSAGES */}
        <div
          style={{
            flex: 1,
            overflowY: "scroll",
            padding: "15px",
          }}
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              style={{
                textAlign:
                  msg.sender === currentUser?._id ? "right" : "left",
                marginBottom: "10px",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  padding: "10px",
                  borderRadius: "10px",
                  backgroundColor:
                    msg.sender === currentUser?._id
                      ? "#005c4b"
                      : "#202c33",
                  color: "white",
                  maxWidth: "60%",
                }}
              >
                {msg.text}
              </span>
            </div>
          ))}
        </div>

        {/* INPUT */}
        {selectedUser && (
          <div
            style={{
              display: "flex",
              padding: "10px",
              backgroundColor: "#202c33",
            }}
          >
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              style={{
                flex: 1,
                padding: "10px",
                borderRadius: "20px",
                border: "none",
                outline: "none",
              }}
            />
            <button
              onClick={sendMessage}
              style={{
                marginLeft: "10px",
                padding: "10px 15px",
                borderRadius: "20px",
                border: "none",
                backgroundColor: "#00a884",
                color: "white",
                cursor: "pointer",
              }}
            >
              Send
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;