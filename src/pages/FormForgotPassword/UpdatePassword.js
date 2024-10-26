import React, { useState } from 'react';
import './ForgotPassword.css'; // Chứa CSS cho form

const UpdatePassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Mật khẩu không khớp!');
    } else {
      alert('Cập nhật mật khẩu thành công!');
    }
  };

  return (
    <div className="update-password-container">
         <h2>Đặt lại mật khẩu</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Nhập mật khẩu mới"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span onClick={togglePasswordVisibility} className="toggle-password">
            <i className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
          </span>
        </div>
        <div className="input-group">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Nhập lại mật khẩu mới"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <span onClick={toggleConfirmPasswordVisibility} className="toggle-password">
            <i className={showConfirmPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
          </span>
        </div>
        <button type="submit" className="submit-button">Cập nhật lại mật khẩu</button>
      </form>
    </div>
  );
};

export default UpdatePassword;