import React, { useState } from "react";

function Signup({ setUser, setShowSignup }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSignup = () => {
    if (!name || !email) {
      alert("Please fill all fields");
      return;
    }

    // 🔥 SAME FIX HERE
    setUser({ name });

    console.log("Signup clicked");
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