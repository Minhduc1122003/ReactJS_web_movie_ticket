import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { login, registerUser } from '../../services/api_provider';
import Swal from 'sweetalert2';
// import { jwtDecode } from 'jwt-decode';

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
      setIsDisabled(false); // Kích hoạt lại nút
      let redirectUrl = localStorage.getItem('redirectAfterLogin') || '/';
      if(redirectUrl === '/login'){
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

  const handleRegister = async (evt) => {
    evt.preventDefault();

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

    if (passwordNew === confirmpasswordNew) {
      const newUser = {
        userName: usernameNew,
        fullName: fullnameNew,
        email: emailNew,
        phoneNumber: phoneNew,
        password: passwordNew
      };

      try {
        const data = await registerUser(newUser);

        console.log('Đăng ký thành công !', data);
        setToastMessage('Đăng ký thành công !');
        setIsDisabled(false); // Kích hoạt lại nút
        clearFormRegister();
        setIsRegisterForm(false);
        setTimeout(() => {
          setToastMessage(null);
        }, 5000);
        
      } catch (error) {
        console.log('Đăng ký thất bại !', error.message);
        if (error.message === 'Email đã tồn tại!') {
          setToastMessage('Email đã tồn tại!');
        } else if (error.message === 'Tài khoản đã tồn tại!') {
          setToastMessage('Tài khoản đã tồn tại!');
        } else {
          setToastMessage('Đăng nhập thất bại!');
        }
        setTimeout(() => {
          setToastMessage(null);
        }, 5000);
      }
    } else {
      setToastMessage('Đăng ký thất bại! Xác nhận mật khẩu không đúng !');
      setTimeout(() => {
        setToastMessage(null);
      }, 5000);
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
                <form onSubmit={handleRegister}>
                  <div className="mb-3">
                    <label htmlFor="regUsername" className="form-label">Tài Khoản</label>
                    <input type="text"
                      className="form-control"
                      id="regUsername"
                      placeholder="Nhập tên đăng nhập"
                      value={usernameNew}
                      onChange={(e) => setUsernameNew(e.target.value)}
                      required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="regUsername" className="form-label">Họ tên</label>
                    <input type="text" className="form-control" id="regFullname" placeholder="Nhập họ tên" required
                      value={fullnameNew} onChange={(e) => setFullnameNew(e.target.value)} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" placeholder="Nhập email" required
                      value={emailNew} onChange={(e) => setEmailNew(e.target.value)} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Số điện thoại</label>
                    <input type="text" className="form-control" id="phoneNumber" placeholder="Nhập số điện thoại" required
                      value={phoneNew} onChange={(e) => setPhoneNew(e.target.value)} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="regPassword" className="form-label">Mật khẩu</label>
                    <input type="password" className="form-control" id="regPassword" placeholder="Nhập mật khẩu" required
                      value={passwordNew} onChange={(e) => setPasswordNew(e.target.value)} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Xác nhận mật khẩu</label>
                    <input type="password" className="form-control" id="confirmPassword" placeholder="Xác nhận mật khẩu" required
                      value={confirmpasswordNew} onChange={(e) => setConfirmpasswordNew(e.target.value)} />
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