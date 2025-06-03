import React, { useState, useRef } from "react";

export default function OTPPage() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef([  ]);

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
      // Focus last box
      inputsRef.current[5].focus();
    }
  };

  const handleFocus = (e) => {
    e.target.setSelectionRange(e.target.value.length, e.target.value.length);
  };

  const handleSubmit = () => {
    const enteredOtp = otp.join("");
    console.log("Entered OTP:", enteredOtp);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-12 rounded shadow-md w-full max-w-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-3">
          Verify OTP
        </h1>
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
              className="w-14 h-16 border border-gray-300 text-center text-xl rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            />
          ))}
        </div>
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-3 rounded text-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Verify OTP
        </button>
        <p className="mt-4 text-center text-sm text-gray-500">
          Didn’t get the code?{" "}
          <button
            onClick={() => console.log("Resend OTP")}
            className="text-blue-600 hover:underline focus:outline-none"
          >
            Resend
          </button>
        </p>
      </div>
    </div>
  );
}
