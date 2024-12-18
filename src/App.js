import React, { useEffect } from 'react';
import './assets/css/style.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import "bootstrap-icons/font/bootstrap-icons.css";
import HomePage from './pages/homePage/HomePage';
import AccountProfile from './pages/accountDetail/AccountProfile';
import LoginPage from './pages/loginPage/LoginPage';
import Header from './layouts/headerLayout/header';
import Footer from './layouts/footerLayout/footer';
import ForgotPassword from './pages/FormForgotPassword/ForgotPassword';
import OTPVerification from './pages/FormForgotPassword/OTPVerification';
import UpdatePassword from './pages/FormForgotPassword/UpdatePassword';
import MovieStaus from './pages/phimPage/movieStatus';
import MovieGenre from './pages/phimPage/movieGenre';
import ThanhToan from './pages/payment_page/payment_page';
import ThongTinVe from './pages/ticket_info/ticket_info';
import LienHe from './pages/contact_page/contact_page';
import PhimYeuThich from './pages/favoriteMovies/FavoriteMovies';
import VeDaMua from './pages/purchasedTickets/PurchasedTickets';
import LichSuGiaoDich from './pages/transactionHistories/TransactionHistories';
import QuanLyTrangThongTin from './pages/accountDetail/updateAccount';
import ChiTietPhim from './pages/movieDetail/MovieDetail';
import DatCho from './pages/seatSelection/SeatSelection';
import UpdatePasswordByUser from './pages/accountDetail/UpdatePasswordByUser'

function App() {

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Thời gian hiện tại tính bằng giây
        // Kiểm tra thời gian hết hạn
        if (decodedToken.exp < currentTime) { // Nếu token đã hết hạn
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }
    }
}, []);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/accountProfile" element={<AccountProfile />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} /> {/* Trang đăng nhập */}
        <Route path="/OTPVerify" element={<OTPVerification />} />
        <Route path="/UpdatePassword" element={<UpdatePassword />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/phim-theo-trang-thai/:statusMovie" element={<MovieStaus />} /> {/* Trang phim đang chiếu */}
        <Route path="/thanh-toan" element={<ThanhToan />} /> {/* Trang thanh toán */}
        <Route path="/thong-tin-ve" element={<ThongTinVe />} /> {/* Trang thông tin vé */}
        <Route path="/lien-he" element={<LienHe />} /> {/* Trang liên hệ */}
        <Route path="/phim-yeu-thich" element={<PhimYeuThich />} /> {/* Trang phim yêu thích */}
        <Route path="/ve-da-mua" element={<VeDaMua />} /> {/* Trang vé đã mua*/}
        <Route path="/lich-su-giao-dich" element={<LichSuGiaoDich />} /> {/* Trang lịch sử giao dịch */}
        <Route path="/quan-ly-thong-tin" element={<QuanLyTrangThongTin />} /> {/* Trang lịch sử giao dịch*/}
        <Route path="/chi-tiet-phim/:movieId" element={<ChiTietPhim />} /> {/* Trang chi tiết phim*/}
        <Route path="/dat-cho/:movieId" element={<DatCho/>} /> {/* Trang chi tiết đặt ghế*/}
        <Route path="/doi-mat-khau" element={<UpdatePasswordByUser/>} /> {/* Đổi mật khẩu*/}
        <Route path="/phim-theo-the-loai/:genreMovie" element={<MovieGenre/>} /> {/* Phim theo thể loại*/}

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;