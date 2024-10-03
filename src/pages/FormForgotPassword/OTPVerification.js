import React, { useState } from 'react';
import './ForgotPassword.css'; // Chứa CSS cho form

const OTPVerification = () => {
  const [otp, setOtp] = useState(new Array(6).fill(''));

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    if (element.nextSibling && element.value) {
      element.nextSibling.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Mã OTP của bạn là: ${otp.join('')}`);
  };

  return (
    <div className="otp-verification-container">
         <h2>Lấy mã OTP</h2>
      <p>Vui lòng nhập mã OTP đã được gửi đến tài khoản email của bạn</p>
      <form onSubmit={handleSubmit}>
        <div className="otp-input-group">
          {otp.map((data, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={data}
              onChange={(e) => handleChange(e.target, index)}
              onFocus={(e) => e.target.select()}
            />
          ))}
        </div>
        <button type="submit" className="submit-button">Lấy mã OTP</button>
      </form>
    </div>
  );
};

export default OTPVerification;
