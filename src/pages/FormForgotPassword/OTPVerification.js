import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { verifyOTP } from '../../services/api_provider';
import './ForgotPassword.css'; // Chứa CSS cho form

const OTPVerification = () => {
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const location = useLocation();
  const { email, userId } = location.state;
  const navigate = useNavigate();

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    if (element.nextSibling && element.value) {
      element.nextSibling.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const stringOTP = otp.join('');

    try {
      const data = await verifyOTP(email, stringOTP);
      console.log(data);
      await Swal.fire({
        title: 'Thành công',
        text: 'Xác nhận thành công !',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      navigate('/UpdatePassword', {
        state: { userId }
      })
    } catch (error) {
      console.log(error);
      await Swal.fire({
        title: 'Thất bại',
        text: 'Xác nhận thất bại. Vui lòng nhập đúng mã OTP trong Gmail !',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
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
        <button type="submit" className="submit-button">Xác nhận</button>
      </form>
    </div>
  );
};

export default OTPVerification;
