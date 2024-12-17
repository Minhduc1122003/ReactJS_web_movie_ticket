import React, { useState } from 'react';
import Swal from 'sweetalert2';
import '../FormForgotPassword/ForgotPassword.css'; // Chứa CSS cho form
import { updatePasswordByUser } from '../../services/api_provider';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import { useForm } from "react-hook-form";

const schema = yup.object().shape({
  password: yup
    .string()
    .matches(/^[a-zA-Z][a-zA-Z0-9]{2,}$/, 'Mật khẩu phải có ít nhất 3 ký tự và không được chứa ký tự đặc biệt')
    .required('Mật khẩu là bắt buộc')
});

const UpdatePassword = () => {
  const [passwordOld, setPasswordOld] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPasswordOld, setShowPasswordOld] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  //Khởi tạo react-hook-form với yup resolver
    const { register, handleSubmit, formState: { errors } } = useForm({
      resolver: yupResolver(schema),
      mode: 'onChange', //Kiểm tra validation mỗi khi thay đổi giá trịtrị
    })

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

    // Xử lý thành công
    console.log("Đăng xuất thành công!");
    localStorage.removeItem("token"); // Xóa token khỏi localStorage
    localStorage.removeItem("user"); // Xóa user khỏi localStorage

    // Chuyển hướng hoặc cập nhật trạng thái
    window.location.href = "/login";

  };

  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    const userString = localStorage.getItem('user');
    const user = JSON.parse(userString);
    console.log("User", user);
    const userId = user ? user.userId : null;
    console.log("UserId", userId);
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

      <form onSubmit={handleSubmitUpdate}>
        <div className="input-group input-group-form">
          <input style={{ borderRadius: '10px' }}
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

        <div className="input-group input-group-form">
          <input style={{ borderRadius: '10px' }}
            type={showPassword ? 'text' : 'password'}
            placeholder="Nhập mật khẩu mới"
            defaultValue={password}
            {...register('password')}
            required
          />
          <span onClick={togglePasswordVisibility} className="toggle-password">
            <i className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
          </span>
        </div>
        {errors.password && (
            <p style={{ color: 'red' }}>{errors.password.message}</p>
          )}

        <div className="input-group input-group-form">
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
