import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { login, registerUser } from '../../services/api_provider';
import Swal from 'sweetalert2';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';

const schema = yup.object().shape({
  emailNew: yup
    .string()
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Email phải có dịnh dạng hợp lệ (ví dụ: example@gmail.com)')
    .required('Email là bắt buộc'),
  phoneNew: yup
    .string()
    .matches(/^[0-9]{10}$/, 'Số điện thoại phải có 10 chữ số')
    .required('Số điện thoại là bắt buộc'),
  usernameNew: yup
    .string()
    .matches(/^[A-Za-z][A-Za-z0-9_]{3,}$/, 'Tài khoản phải có ít nhất 4 ký tự và ký tự đầu không được là số')
    .required('Tài khoản là bắt buộc'),
  fullnameNew: yup
    .string()
    .matches(/^[A-ZÀ-Ỹa-zà-ỹ]+(\s[A-ZÀ-Ỹa-zà-ỹ]+)+$/, 'Tên không hợp lệ (Ví dụ: Lê A)')
    .required('Họ tên là bắt buộc'),
  passwordNew: yup
    .string()
    .matches(/^[a-zA-Z][a-zA-Z0-9]{2,}$/, 'Mật khẩu phải có ít nhất 3 ký tự và không được chứa ký tự đặc biệt')
    .required('Mật khẩu là bắt buộc')
});

function LoginPage() {
  const [isRegisterForm, setIsRegisterForm] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // State đăng nhập
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [isDisabled, setIsDisabled] = useState(false); // Quản lý  
  const [timeLeft, setTimeLeft] = useState(0); // Quản lý thời gian đếm ngược

  // State đăng ký
  const [usernameNew, setUsernameNew] = useState('');
  const [fullnameNew, setFullnameNew] = useState('');
  const [emailNew, setEmailNew] = useState('');
  const [phoneNew, setPhoneNew] = useState('');
  const [passwordNew, setPasswordNew] = useState('');
  const [confirmpasswordNew, setConfirmpasswordNew] = useState('');

  //Khởi tạo react-hook-form với yup resolver
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange', //Kiểm tra validation mỗi khi thay đổi giá trị
  })

  useEffect(() => {
    const msg = null; // Replace with logic to show messages if necessary
    if (msg) {
      setToastMessage(msg);
    }
  }, []);

  const switchToRegister = () => {
    setIsRegisterForm(true);
  };

  const switchToLogin = () => {
    setIsRegisterForm(false);
  };

  const handleLogin = async (evt) => {
    evt.preventDefault();
    console.log(timeLeft);

    setIsDisabled(true); // Vô hiệu hóa nút
    setTimeLeft(10); // Đặt thời gian đếm ngược là 10 giây

    // Đếm ngược thời gian
    const countdown = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(countdown); // Dừng đếm khi hết thời gian

          return 0; // Reset thời gian
        }
        return prevTime - 1; // Giảm thời gian
      });
    }, 1000);

    try {
      const data = await login(username, password);
      await Swal.fire({
        title: 'Thành công',
        text: 'Đăng nhập thành công !',
        icon: 'success',
        timer: 1000, // Thời gian hiển thị (2 giây)
        timerProgressBar: true,
        showConfirmButton: false
      });
      localStorage.setItem('token', data.jwt); // Lưu token vào localStorage
      localStorage.setItem('user', JSON.stringify(data.userDTO)); // Lưu user vào localStorage

      let redirectUrl = localStorage.getItem('redirectAfterLogin') || '/';
      if (redirectUrl === '/login') {
        redirectUrl = '/';
      }
      localStorage.removeItem('redirectAfterLogin');
      window.location.href = redirectUrl;
    } catch (error) {
      console.error("Lỗi mạng:", error);
      await Swal.fire({
        title: 'Thất bại',
        text: 'Đăng nhập không thành công !',
        icon: 'error',
        timer: 1000,
        timerProgressBar: true,
        showConfirmButton: false
      });
    } finally {
      setIsDisabled(false); // Kích hoạt lại nút
    }
  };

  const clearFormRegister = () => {
    setUsernameNew('');
    setFullnameNew('');
    setEmailNew('');
    setPhoneNew('');
    setPasswordNew('');
    setConfirmpasswordNew('');
  };

  const handleRegister = async (data) => {
    setIsDisabled(true); // Vô hiệu hóa nút
    setTimeLeft(10); // Đặt thời gian đếm ngược là 10 giây
  
    const { usernameNew, fullnameNew, emailNew, phoneNew, passwordNew } = data;
  
    if (passwordNew === confirmpasswordNew) {  // Kiểm tra confirm password
      const newUser = {
        userName: usernameNew,
        fullName: fullnameNew,
        email: emailNew,
        phoneNumber: phoneNew,
        password: passwordNew
      };
  
      try {
        const response = await registerUser(newUser);
        Swal.fire({
          title: 'Thành công',
          text: 'Đăng ký thành công!',
          icon: 'success',
          timer: 1000,
          showConfirmButton: false
        });
        clearFormRegister();
        setIsRegisterForm(false);
      } catch (error) {
        console.log('Lỗi đăng ký:', error.message);
        setToastMessage(error.message || 'Đăng ký thất bại!');
      } finally {
        setIsDisabled(false);
      }
    } else {
      setToastMessage('Xác nhận mật khẩu không khớp!');
      setIsDisabled(false);
    }
  };
  
  return (
    <div>
      <div className="modal-content-login">
        <div className="modal-body p-0">
          <div className="row">
            <div className="col-md-6 p-5">
              <div className="d-flex align-items-center mb-3">
                <button
                  type="button"
                  className="btn btn-link"
                  onClick={switchToLogin}
                  style={{ fontWeight: isRegisterForm ? 'normal' : 'bold' }}
                >
                  Đăng Nhập
                </button>
                <button
                  type="button"
                  className="btn btn-link"
                  onClick={switchToRegister}
                  style={{ fontWeight: isRegisterForm ? 'bold' : 'normal' }}
                >
                  Đăng Ký
                </button>
              </div>
              <div className="mb-4">
                <p>Đăng nhập để theo dõi phim mới nhất, lưu danh sách phim yêu thích và nhận nhiều khuyến mãi hấp dẫn.</p>
              </div>

              {/* Login Form */}
              {!isRegisterForm && (
                <form onSubmit={handleLogin}>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">Tài Khoản</label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      placeholder="Nhập tên đăng nhập"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Mật khẩu</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Nhập mật khẩu"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Link to="/forgotpassword" className="text-black">Bạn quên mật khẩu?</Link>
                  <button type="submit" className="btn btn-primary btn-block mt-3 w-100 text-light" disabled={isDisabled}>
                    Đăng Nhập
                  </button>
                </form>
              )}

              {/* Register Form */}
              {isRegisterForm && (
                <form onSubmit={handleSubmit(handleRegister)}>
                  <div className="mb-3">
                    <label htmlFor="regUsername" className="form-label">Tài Khoản</label>
                    <input type="text"
                      className="form-control"
                      id="regUsername"
                      placeholder="Nhập tên đăng nhập"
                      defaultValue={usernameNew}
                      {...register('usernameNew')}
                      required />
                    {errors.usernameNew && (
                      <p style={{ color: 'red' }}>{errors.usernameNew.message}</p>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="regUsername" className="form-label">Họ tên</label>
                    <input type="text"
                      className="form-control"
                      id="regFullname"
                      placeholder="Nhập họ tên"
                      defaultValue={fullnameNew}
                      {...register('fullnameNew')}
                      required />
                    {errors.fullnameNew && (
                      <p style={{ color: 'red' }}>{errors.fullnameNew.message}</p>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email"
                      className="form-control"
                      id="email"
                      placeholder="Nhập email"
                      defaultValue={emailNew}
                      {...register('emailNew')}
                      required />
                    {errors.emailNew && (
                      <p style={{ color: 'red' }}>{errors.emailNew.message}</p>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Số điện thoại</label>
                    <input type="text"
                      className="form-control"
                      id="phoneNumber"
                      placeholder="Nhập số điện thoại"
                      defaultValue={phoneNew}
                      {...register('phoneNew')}
                      required />
                    {errors.phoneNew && (
                      <p style={{ color: 'red' }}>{errors.phoneNew.message}</p>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="regPassword" className="form-label">Mật khẩu</label>
                    <input type="password"
                      className="form-control"
                      id="regPassword"
                      placeholder="Nhập mật khẩu"
                      defaultValue={passwordNew}
                      {...register('passwordNew')}
                      required />
                    {errors.passwordNew && (
                      <p style={{ color: 'red' }}>{errors.passwordNew.message}</p>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Xác nhận mật khẩu</label>
                    <input type="password" className="form-control" id="confirmPassword" placeholder="Xác nhận mật khẩu" required
                      defaultValue={confirmpasswordNew} onChange={(e) => setConfirmpasswordNew(e.target.value)} />
                  </div>
                  <button type="submit" className="btn btn-primary btn-block mt-3 w-100 text-light" disabled={isDisabled}>Đăng Ký</button>
                </form>
              )}

              <div className="divider">Hoặc</div>
              <div className="text-center mt-3">
                <p>Đăng nhập bằng</p>
                <button type="button" className="btn btn-outline-primary me-2">
                  <i className="bi bi-google"></i> Google
                </button>
                <button type="button" className="btn btn-outline-primary">
                  <i className="bi bi-facebook"></i> Facebook
                </button>
              </div>
            </div>
            <div className="col-md-6 d-flex align-items-center justify-content-center">
              <img src="https://firebasestorage.googleapis.com/v0/b/movieticket-77cf5.appspot.com/o/img-dangnhap.jfif?alt=media&token=0b181313-0d7a-4c31-bfe4-3d32e8a5f14a" alt="Illustration" className="img-fluid" style={{ borderRadius: '0 30px 30px 0' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Toast notification */}
      {toastMessage && (
        <div className="toast show" style={{ position: 'fixed', right: '10px' }}>
          <div className="toast-header">
            <strong className="me-auto">Thông báo</strong>
            <small className="text-muted">vừa xong</small>
            <button type="button" className="btn-close" onClick={() => setToastMessage(null)} aria-label="Close"></button>
          </div>
          <div className="toast-body">
            {toastMessage}
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginPage;