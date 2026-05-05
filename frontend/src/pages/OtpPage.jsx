import { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./OtpPage.css";

export default function OTPPage() {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputsRef = useRef([]);

  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

  // handle input change
  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // move forward
    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  // handle backspace
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleVerify = async () => {
    const finalOtp = otp.join(""); // convert array → string

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/accounts/verify-otp/",
        {
          email,
          otp: finalOtp,
        }
      );

      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);
      localStorage.setItem("username", res.data.username);

      alert("Login successful");
      navigate("/dashboard");

    } catch (error) {
      alert(error.response?.data?.error || "Invalid OTP");
    }
  };

  return (
    <div className="otp-container">
      <h2>Enter OTP</h2>
      <p>OTP sent to: {email}</p>

      <div className="otp-box-container">
        {otp.map((data, index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            value={data}
            ref={(el) => (inputsRef.current[index] = el)}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="otp-box"
          />
        ))}
      </div>

      <button onClick={handleVerify}>Verify OTP</button>
    </div>
  );
}