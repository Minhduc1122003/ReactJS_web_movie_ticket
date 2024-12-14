import React from 'react';


function Footer() {
  return (
    <footer className="footer mt-5 pt-5" style={{ boxShadow: '0 0 4px 1px gray' }}>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>THAM GIA VỚI CHÚNG TÔI</h5>
            <div className="social-icons">
              <a href="https://example.com/x"><img src={`https://firebasestorage.googleapis.com/v0/b/movieticket-77cf5.appspot.com/o/x.jpg?alt=media&token=29883212-42b3-4d4a-b054-7e523a2cf108`} alt="X" /></a>
              <a href="https://facebook.com"><img src={`https://firebasestorage.googleapis.com/v0/b/movieticket-77cf5.appspot.com/o/fb.png?alt=media&token=ca74b8b3-62d1-48ae-864d-c7889586c168`} alt="Facebook" /></a>
              <a href="https://discord.com"><img src={`https://firebasestorage.googleapis.com/v0/b/movieticket-77cf5.appspot.com/o/discord.png?alt=media&token=183e82fb-0257-41fc-b0a7-24517178397c`} alt="Discord" style={{ height: '60px' }} /></a>
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
            <p className='text-light'>&copy; 2024 MovieCinema. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
