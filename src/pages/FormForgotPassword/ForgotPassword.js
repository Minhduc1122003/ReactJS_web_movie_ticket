import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './ForgotPassword.css'; // Chứa phần CSS cho form
import { sendMail } from '../../services/api_provider';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const [isDisabled, setIsDisabled] = useState(false); // Quản lý trạng thái nút
  const [timeLeft, setTimeLeft] = useState(0); // Quản lý thời gian đếm ngược

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsDisabled(true); // Vô hiệu hóa nút
    setTimeLeft(60); // Đặt thời gian đếm ngược là 60 giây

    // Đếm ngược thời gian
    const countdown = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(countdown); // Dừng đếm khi hết thời gian
          setIsDisabled(false); // Kích hoạt lại nút
          return 0; // Reset thời gian
        }
        return prevTime - 1; // Giảm thời gian
      });
    }, 1000);

    try {
      const response = await sendMail(email);
      console.log(response);
      console.log(response.data);

      await Swal.fire({
        title: 'Thành công',
        text: 'Đã cấp mã OTP. Vui lòng kiểm tra Gmail !',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      navigate('/OTPVerify', {
        state: { email, userId: response.userId }
      });
    } catch (error) {
      console.log(error);
      await Swal.fire({
        title: 'Thất bại',
        text: 'Không tìm thấy Gmail !',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <div className="forgot-password-container">
      <h2>Quên mật khẩu ?</h2>
      <p>Vui lòng cung cấp email đăng nhập, chúng tôi sẽ gửi mã OTP kích hoạt cho bạn</p>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            style={{ borderRadius: '10px' }}
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Nhập email tại đây"
            required
          />
        </div>
        <button
          type="submit"
          className="submit-button"
          disabled={isDisabled} // Vô hiệu hóa nút nếu isDisabled = true
        >
          {isDisabled ? `Đợi ${timeLeft}s` : "Cấp mã OTP"}
        </button>
      </form>

    </div>
  );
};

export default ForgotPassword;
