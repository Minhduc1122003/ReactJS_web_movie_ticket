import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './ForgotPassword.css'; // Chứa CSS cho form
import { uploadPasswordUser } from '../../services/api_provider';
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
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const location = useLocation();
  const { userId } = location.state;
  const navigate = useNavigate();

  //Khởi tạo react-hook-form với yup resolver
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange', //Kiểm tra validation mỗi khi thay đổi giá trịtrị
  })

  console.log(userId);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmitUpdate = async (e) => {
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
      <form onSubmit={handleSubmit(handleSubmitUpdate)}>
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
