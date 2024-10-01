import React, { useState } from 'react';
import './ForgotPassword.css'; // Chứa phần CSS cho form

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý yêu cầu đặt lại mật khẩu ở đây
    alert(`OTP sẽ được gửi đến: ${email}`);
  };

  return (
    <div className="forgot-password-container">
      <h2>Quên mật khẩu ?</h2>
      <p>Vui lòng cung cấp email đăng nhập, chúng tôi sẽ gửi mã OTP kích hoạt cho bạn</p>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
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
