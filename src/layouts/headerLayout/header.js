import React from 'react';
import { Link } from 'react-router-dom';

function Header({ loggedInUser }) {
  return (
    <header>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-2">
            <Link className="nav-link" to="/" style={{ width: '50%' }}>
              <img src="/img/Logo.png" alt="Logo" className="img-fluid" />
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
                      <li><Link className="dropdown-item" to="/phim-dang-chieu">Phim đang chiếu</Link></li>
                      <li><Link className="dropdown-item" to="/phim-sap-chieu">Phim sắp chiếu</Link></li>
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
                      <li><Link className="dropdown-item" to="/products?genre=Romantic">Lãng mạn</Link></li>
                      <li><Link className="dropdown-item" to="/products?genre=Horror">Kinh dị</Link></li>
                      <li><Link className="dropdown-item" to="/products?genre=Action">Hành động</Link></li>
                    </ul>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="#">
                      <i className="bi bi-people"></i> Về Chúng Tôi
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/contact">
                      <i className="bi bi-telephone-inbound"></i> Liên Hệ
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/cart">
                      <i className="bi bi-bookmark-heart"></i> Yêu thích
                    </Link>
                  </li>

                  {loggedInUser ? (
                    <li className="nav-item nav-dangnhap">
                      <Link className="nav-link" id="NavDangNhap" to={`/user/${loggedInUser.userId}`}>
                        <i className="bi bi-person"></i> {loggedInUser.username}
                      </Link>
                    </li>
                  ) : (
                    <li className="nav-item nav-dangnhap">
                      <Link className="nav-link" id="NavDangNhap" to="/login">
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
