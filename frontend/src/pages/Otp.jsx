import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function OTPPage() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [userEmail, setUserEmail] = useState(""); // <-- added to store email
  const inputsRef = useRef([]);
  const navigate = useNavigate();
  const { authenticated, setAuthenticated } = useAuth();

  useEffect(() => {
    fetch("/api/get-email")
      .then((res) => res.json())
      .then((data) => {
        if (data.email) {
          setUserEmail(data.email);
        }
      })
      .catch((err) => {
        console.error("Error fetching email:", err);
      });
  }, []);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    if (element.value && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputsRef.current[index - 1].focus();
    } else if (e.key === "ArrowRight" && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData("text").trim();
    if (pasteData.length === 6 && /^\d+$/.test(pasteData)) {
      const newOtp = pasteData.split("");
      setOtp(newOtp);
      newOtp.forEach((digit, idx) => {
        if (inputsRef.current[idx]) {
          inputsRef.current[idx].value = digit;
        }
      });
      inputsRef.current[5].focus();
    }
  };

  const handleFocus = (e) => {
    e.target.setSelectionRange(e.target.value.length, e.target.value.length);
  };

  const handleSubmit = async () => {
    const enteredOtp = otp.join("");

    try {
      const response = await fetch("/api/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ otp: enteredOtp }),
      });

      const data = await response.json();
      const email = data.email;

      if (response.ok) {
        alert("OTP verified successfully!");
        setAuthenticated(true);
        navigate("/dashboard");
      } else {
        alert(data.message || "Invalid OTP");
      }
    } catch (err) {
      console.error("Error verifying OTP:", err);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-12 rounded shadow-md w-full max-w-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Hi there!
        </h1>
        {userEmail && (
          <p className="text-center text-indigo-600 font-medium mb-4 underline">
            {userEmail}
          </p>
        )}
        <p className="text-gray-600 text-center mb-8">
          Please enter the 6-digit code we sent to your phone.
        </p>
        <div className="flex justify-between gap-2 mb-8" onPaste={handlePaste}>
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e.target, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onFocus={handleFocus}
              ref={(el) => (inputsRef.current[index] = el)}
              className="w-14 h-16 border border-gray-300 text-center text-xl rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
            />
          ))}
        </div>
        <button
          onClick={handleSubmit}
          className="w-full bg-indigo-600 text-white py-3 rounded text-lg font-medium hover:bg-indigo-700 transition-colors"
        >
          Verify OTP
        </button>
        <p className="mt-4 text-center text-sm text-gray-500">
          Didn’t get the code?
          <button
            onClick={() => console.log("Resend OTP")}
            className="text-indigo-600 hover:underline focus:outline-none ml-1"
          >
            Resend
          </button>
        </p>
      </div>
    </div>
  );
}
