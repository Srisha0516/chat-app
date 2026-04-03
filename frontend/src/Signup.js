import React, { useState } from "react";

function Signup({ setUser, setShowSignup }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSignup = async () => {
    if (!name || !email) {
      alert("Please fill all fields");
      return;
    }

    const res = await fetch(
      "https://chat-app-backend-j0ec.onrender.com/api/auth/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      }
    );

    const data = await res.json();

    if (data.success) {
      setUser({ name: data.name });
    } else {
      alert("Signup failed");
    }
  };

  return (
    <div className="auth-box">
      <h2>Signup</h2>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button onClick={handleSignup}>Signup</button>

      <p onClick={() => setShowSignup(false)}>
        Already have account? Login
      </p>
    </div>
  );
}

export default Signup;