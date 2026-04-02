import React, { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");

  // ✅ YOUR REAL BACKEND URL (already deployed)
  const API_URL = "https://chat-app-backend-j0ec.onrender.com";

  useEffect(() => {
    fetch(`${API_URL}/api/test`)
      .then((res) => res.json())
      .then((data) => {
        setMessage(data.message);
      })
      .catch((err) => {
        console.error("Error:", err);
        setMessage("Error connecting to backend ❌");
      });
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Frontend + Backend Connected 🚀</h1>
      <h2>{message}</h2>
    </div>
  );
}

export default App;