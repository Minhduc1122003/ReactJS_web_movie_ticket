import React, { useState } from 'react';
import Swal from 'sweetalert2';
import '../FormForgotPassword/ForgotPassword.css'; // Chứa CSS cho form
import { updatePasswordByUser, logout } from '../../services/api_provider';

const UpdatePassword = () => {
  const [passwordOld, setPasswordOld] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPasswordOld, setShowPasswordOld] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // console.log(userId);
  const togglePasswordOldVisibility = () => {
    setShowPasswordOld(!showPasswordOld);
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleLogout = async () => {
      try {
        const response = await logout();
  
        if (response.ok) {
          // Xử lý thành công
          console.log("Đăng xuất thành công!");
          localStorage.removeItem("token"); // Xóa token khỏi localStorage
          localStorage.removeItem("user"); // Xóa user khỏi localStorage
  
          // Chuyển hướng hoặc cập nhật trạng thái
          window.location.href = "/login";
        }
      } catch (error) {
        console.error("Lỗi mạng hoặc server:", error);
      }
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userString = localStorage.getItem('user');
    const user = JSON.parse(userString);
    console.log("User",user);
    const userId = user ? user.userId : null;
    console.log("UserId",userId);
    if (password !== confirmPassword) {
      await Swal.fire({
        title: 'Thất bại',
        text: 'Nhập lại mật khẩu không khớp !',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    } else {
      try {
        const UpdatePasswordDTO = {
          userId: userId,
          passwordOld: passwordOld,
          passwordNew: password
        };
        const data = await updatePasswordByUser(UpdatePasswordDTO);
        console.log(data);
        await Swal.fire({
          title: 'Thành công',
          text: 'Đổi mật khẩu thành công !',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        handleLogout();
      } catch (error) {
        console.log(error.message);
        if (error.message === 'API Error: Mật khẩu cũ không đúng! (HTTP 409)') {
          await Swal.fire({
            title: 'Thất bại',
            text: 'Mật khẩu cũ không đúng!',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        } else {
          await Swal.fire({
            title: 'Thất bại',
            text: 'Đổi mật khẩu không thành công !',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }

        
      }
    }
  };

  return (
    <div className="update-password-container">
      <h2>Đặt lại mật khẩu</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input style={{ borderRadius: '10px', width: '25vh' }}
            type={showPasswordOld ? 'text' : 'password'}
            placeholder="Nhập mật khẩu cũ"
            value={passwordOld}
            onChange={(e) => setPasswordOld(e.target.value)}
            required
          />
          <span onClick={togglePasswordOldVisibility} className="toggle-password">
            <i className={showPasswordOld ? "fas fa-eye-slash" : "fas fa-eye"}></i>
          </span>
        </div>

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
