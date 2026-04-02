import React, { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");

  // 🔥 IMPORTANT: Replace with your Render backend URL
  const API_URL = "https://your-backend.onrender.com";

  useEffect(() => {
    fetch(`${API_URL}/api/test`)
      .then((res) => res.json())
      .then((data) => {
        setMessage(data.message);
      })
      .catch((err) => {
        console.error("Error:", err);
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