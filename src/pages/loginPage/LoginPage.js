import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function LoginPage({setLogged}) {
  const [isRegisterForm, setIsRegisterForm] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

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
    try {
        const response = await fetch('http://localhost:9011/login', {
            method: 'POST', // Đảm bảo sử dụng đúng phương thức
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                username: username, 
                password: password 
            }),
        }); 
        if (response.ok) {
            const data = await response.json();
            const decodedToken = jwtDecode(data.jwt); // Giải mã token
            localStorage.setItem('token', data.jwt); // Lưu token vào localStorage

            // Cập nhật logged state
            if (decodedToken.fullName && decodedToken.sub) {
              setLogged({ fullName: decodedToken.fullName,
                          userName: decodedToken.sub,
                          password: decodedToken.password,
                          email: decodedToken.email,
                          phoneNumber: decodedToken.phoneNumber,
                          photo: decodedToken.photo });
            } else {
                console.error("Token thiếu thông tin cần thiết");
            }

            console.log("JWT Token:", data.jwt);
            console.log("Full Name:", decodedToken.fullName);
            console.log("Password:", decodedToken.password);
            console.log("Phone:", decodedToken.phoneNumber);
            console.log("Photo:", decodedToken.photo);
            console.log("Decoded Token:", decodedToken);
            // Lưu tên đầy đủ vào localStorage hoặc state
            console.log(data.fullName);  

            navigate('/'); // Chuyển hướng về trang chính
          } else {
            const errorMessage = await response.text();
            console.log("Đăng nhập thất bại:", errorMessage); // In ra lý do thất bại
            setToastMessage("Đăng nhập thất bại: " + errorMessage);

            setTimeout(() => {
              setToastMessage(null);
            }, 5000);
        }
    } catch (error) {
      console.error("Lỗi mạng:", error);
      alert("Đã xảy ra lỗi mạng. Vui lòng thử lại sau.");
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
                  <Link to="#" className="text-black">Bạn quên mật khẩu?</Link>
                  <button type="submit" className="btn btn-primary btn-block mt-3 w-100">
                    Đăng Nhập
                  </button>
                </form>
              )}

              {/* Register Form */}
              {isRegisterForm && (
                <form action="/register" method="post" id="registerForm">
                  <div className="mb-3">
                    <label htmlFor="regUsername" className="form-label">Tài Khoản</label>
                    <input type="text" className="form-control" id="regUsername" placeholder="Nhập tên đăng nhập" required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="regUsername" className="form-label">Họ tên</label>
                    <input type="text" className="form-control" id="regFullname" placeholder="Nhập họ tên" required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" placeholder="Nhập email" required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="regPassword" className="form-label">Mật khẩu</label>
                    <input type="password" className="form-control" id="regPassword" placeholder="Nhập mật khẩu" required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Xác nhận mật khẩu</label>
                    <input type="password" className="form-control" id="confirmPassword" placeholder="Xác nhận mật khẩu" required />
                  </div>
                  <button type="submit" className="btn btn-primary btn-block mt-3 w-100">Đăng Ký</button>
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
              <img src="/img/img-dangnhap.jfif" alt="Illustration" className="img-fluid" style={{ borderRadius: '0 30px 30px 0' }} />
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