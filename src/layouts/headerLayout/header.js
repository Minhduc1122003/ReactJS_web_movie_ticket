import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const [fullName, setFullName] = useState('');

  const handleLogionClick = () => {
    localStorage.setItem('redirectAfterLogin', location.pathname);
  };

  const getUserFromLocalStorage = () => {
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      setFullName(user.fullName);
    } else {
      setFullName(''); // Nếu không có user, đặt fullName là chuỗi rỗng
    }
  };

  useEffect(() => {
    // Lấy dữ liệu từ localStorage khi component được render lần đầu
    getUserFromLocalStorage();

    // Dọn dẹp sự kiện khi component bị hủy
    return () => {
      window.removeEventListener('storage', getUserFromLocalStorage);
    };
  }, []);

  const handleNavigationStatus = (path) => {
    navigate(path)
  };

  const handleNavigationGenre = (path) => {
    navigate(path)
  };

  return (
    <header>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-2">
            <Link className="nav-link" to="/" style={{ width: '50%' }}>
              <img src={`https://firebasestorage.googleapis.com/v0/b/movieticket-77cf5.appspot.com/o/Logo.png?alt=media&token=126ba3ef-5736-45da-8b81-ad9c055973f2`} alt="Logo" className="img-fluid" />
            </Link>
          </div>
          <div className="col-10">
            <nav className="navbar navbar-expand-lg navbar-light justify-content-center">
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link className="nav-link" to="/">
                      <i className="bi bi-house"></i> Trang Chủ
                    </Link>
                  </li>
                  <li className="nav-item dropdown">
                    <button
                      className="nav-link dropdown-toggle"
                      type="button"
                      id="navbarDropdown"
                      data-bs-toggle="dropdown"
                      aria-label="Toggle Dropdown"
                    >
                      <i className="bi bi-camera-reels"></i> Phim
                    </button>
                    <ul className="dropdown-menu menu-danhmuc" aria-labelledby="navbarDropdown">
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() => handleNavigationStatus('/phim-theo-trang-thai/Đang chiếu')}
                        >
                          Phim đang chiếu
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() => handleNavigationStatus('/phim-theo-trang-thai/Sắp chiếu')}
                        >
                          Phim sắp chiếu
                        </button>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item dropdown">
                    <button
                      className="nav-link dropdown-toggle"
                      type="button"
                      id="navbarDropdown"
                      data-bs-toggle="dropdown"
                      aria-label="Toggle Dropdown"
                    >
                      <i className="bi bi-ui-checks-grid"></i> Danh Mục
                    </button>
                    <ul className="dropdown-menu menu-danhmuc" aria-labelledby="navbarDropdown">
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() => handleNavigationGenre('/phim-theo-the-loai/Tình cảm')}
                        >
                          Tình cảm
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() => handleNavigationGenre('/phim-theo-the-loai/Kinh dị')}
                        >
                          Kinh dị
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() => handleNavigationGenre('/phim-theo-the-loai/Hành động')}
                        >
                          Hành động
                        </button>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="#">
                      <i className="bi bi-people"></i> Về Chúng Tôi
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/lien-he">
                      <i className="bi bi-telephone-inbound"></i> Liên Hệ
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/phim-yeu-thich">
                      <i className="bi bi-bookmark-heart"></i> Yêu thích
                    </Link>
                  </li>

                  {fullName ? (
                    <li className="nav-item nav-dangnhap">
                      <Link
                        className="nav-link"
                        id="NavDangNhap"
                        to="/accountProfile"
                      >
                        <i className="bi bi-person"></i> {fullName}
                      </Link>
                    </li>
                  ) : (
                    <li className="nav-item nav-dangnhap">
                      <Link className="nav-link" id="NavDangNhap" to="/login" onClick={handleLogionClick}>
                        <i className="bi bi-person"></i> Đăng Nhập
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
