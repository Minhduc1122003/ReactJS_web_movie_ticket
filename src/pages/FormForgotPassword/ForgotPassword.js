import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './ForgotPassword.css'; // Chứa phần CSS cho form
import { sendMail } from '../../services/api_provider';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

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
          <input style={{ borderRadius: '10px' }}
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Nhập email tại đây"
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Cấp lại mật khẩu
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
