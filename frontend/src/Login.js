import { useState } from "react";
import "./App.css";

function Login({ setUser }) {
  const [name, setName] = useState("");

  const handleLogin = () => {
    if (!name.trim()) return;
    setUser(name);
  };

  return (
    <div className="app">
      <div className="chat-card login-card">
        <h2 className="login-title">Welcome 👋</h2>

        <input
          className="login-input"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button className="login-btn" onClick={handleLogin}>
          Enter Chat
        </button>
      </div>
    </div>
  );
}

export default Login;