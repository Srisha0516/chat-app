import React, { useState } from "react";

function Login({ setUser, setShowSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    // 🔥 THIS LINE IS THE IMPORTANT FIX
    setUser({ name: email });

    console.log("Login clicked"); // for debugging
  };

  return (
    <div className="auth-box">
      <h2>Login</h2>

      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>

      <p onClick={() => setShowSignup(true)}>
        Don't have account? Signup
      </p>
    </div>
  );
}

export default Login;