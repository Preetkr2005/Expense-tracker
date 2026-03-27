import { useState } from "react";
import "./SignupPage.css";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    alert("Signup Successful");
  };

  return (
    <div className="auth-container">

      <div className="auth-box">
        <h2>Create Account</h2>
        <p>Start tracking your expenses</p>

        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleSignup}>Signup</button>
      </div>

    </div>
  );
}