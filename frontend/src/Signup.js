import React, { useState } from "react";

function Signup({ setUser, setShowSignup }) {
  const [name, setName] = useState("");

  const handleSignup = () => {
    if (!name) return alert("Enter name");
    setUser(name);
  };

  return (
    <div className="auth-box">
      <h2>Signup</h2>

      <input
        type="text"
        placeholder="Create username"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button onClick={handleSignup}>Signup</button>

      <p onClick={() => setShowSignup(false)}>
        Already have account? Login
      </p>
    </div>
  );
}

export default Signup;