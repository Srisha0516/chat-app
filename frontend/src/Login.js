import React, { useState } from "react";

function Login({ setUser, setShowSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await fetch(
        "https://chat-app-backend-j0ec.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert("Login successful ✅");
        setUser(data.user); // IMPORTANT
      } else {
        alert(data.message || "Login failed ❌");
      }
    } catch (err) {
      alert("Server error ❌");
      console.log(err);
    }
  };

  return (
    <div className="auth-box">
      <h2>Login</h2>

      <input
        type="email"
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