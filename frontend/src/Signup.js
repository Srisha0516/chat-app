import React, { useState } from "react";

function Signup({ setUser, setShowSignup }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await fetch(
        "https://chat-app-backend-j0ec.onrender.com/api/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert("Signup successful ✅");
        setShowSignup(false); // go to login
      } else {
        alert(data.message || "Signup failed ❌");
      }
    } catch (err) {
      alert("Server error ❌");
      console.log(err);
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

      <button onClick={handleSignup}>Signup</button>

      <p onClick={() => setShowSignup(false)}>
        Already have account? Login
      </p>
    </div>
  );
}

export default Signup;