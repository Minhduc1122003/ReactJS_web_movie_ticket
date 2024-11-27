import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './ForgotPassword.css'; // Chứa CSS cho form
import { uploadPasswordUser } from '../../services/api_provider';

const UpdatePassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const location = useLocation();
  const { userId } = location.state;
  const navigate = useNavigate();

  console.log(userId);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      await Swal.fire({
        title: 'Thất bại',
        text: 'Nhập lại mật khẩu không khớp !',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    } else {
      try {
        const data = uploadPasswordUser(userId, password);
        console.log(data);
        await Swal.fire({
          title: 'Thành công',
          text: 'Đổi mật khẩu thành công !',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        navigate('/login');
      } catch (error) {
        console.error(error);
        await Swal.fire({
          title: 'Thất bại',
          text: 'Đổi mật khẩu không thành công !',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    }
  };

  return (
    <div className="update-password-container">
      <h2>Đặt lại mật khẩu</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input style={{ borderRadius: '10px', width: '25vh' }}
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
          <input style={{ borderRadius: '10px' }}
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
