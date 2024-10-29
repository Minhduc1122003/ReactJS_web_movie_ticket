import React from 'react';


function Footer() {
  return (
    <footer className="footer mt-5 pt-5 bg-light" style={{ boxShadow: '0 0 4px 1px gray' }}>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>THAM GIA VỚI CHÚNG TÔI</h5>
            <div className="social-icons">
              <a href="https://example.com/x"><img src="/img/x.jpg" alt="X" /></a>
              <a href="https://facebook.com"><img src="/img/fb.png" alt="Facebook" /></a>
              <a href="https://discord.com"><img src="/img/discord.png" alt="Discord" style={{ height: '60px' }} /></a>
            </div>
            <ul className="list-unstyled">
              <li><a href="/about">Về chúng tôi</a></li>
              <li><a href="/blog">Blog</a></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Liên hệ</h5>
            <ul className="list-unstyled">
              <li><i className="fas fa-map-marker-alt"></i> 123 Đường ABC, Quận 1, TP.HCM</li>
              <li><i className="fas fa-phone-alt"></i> Hotline: 1800-1234</li>
              <li><i className="fas fa-envelope"></i> Email: dtpphat2003@gmail.com</li>
              <li><i className="fas fa-clock"></i> Giờ mở cửa: 9:00 - 23:00</li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Chính sách & Điều khoản</h5>
            <ul className="list-unstyled">
              <li><a href="https://www.facebook.com/">Chính sách bảo mật</a></li>
              <li><a href="https://www.facebook.com/">Điều khoản dịch vụ</a></li>
              <li><a href="https://www.facebook.com/">Chính sách đổi trả</a></li>
              <li><a href="https://www.facebook.com/">Hỗ trợ khách hàng</a></li>
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 text-center mt-4">
            <p>&copy; 2024 MovieCinema. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;