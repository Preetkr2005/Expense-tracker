import { useState } from "react";
import "./LoginPage.css";

export default function LoginPage({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    alert("login successfully")
  };

  return (
    <div className="auth-container">

      <div className="auth-box">
        <h2>Welcome Back</h2>
        <p>Login to your account</p>

        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Login</button>
      </div>

    </div>
  );
}