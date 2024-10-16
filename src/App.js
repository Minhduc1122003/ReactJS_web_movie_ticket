// App.js
import React, { useState, useEffect } from 'react';
import './assets/css/style.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "bootstrap-icons/font/bootstrap-icons.css";
import HomeScreen from './pages/homePage/HomePage';
import LoginScreen from './pages/loginPage/LoginPage';
import Header from './layouts/headerLayout/header';
import Footer from './layouts/footerLayout/footer';
import { jwtDecode } from 'jwt-decode';
import ForgotPassword from './pages/FormForgotPassword/ForgotPassword';
import PhimDangChieuPage from './pages/phimPage/phimdanghieuScreen';
import PhimSapChieuPage from './pages/phimPage/phimsapchieuScreen';
import ThanhToan from './pages/payment_page/payment_page';
import ThongTinVe from './pages/ticket_info/ticket_info';
import LienHe from './pages/contact_page/contact_page';
import PhimYeuThich from './pages/favoriteMovies/FavoriteMovies';
import VeDaMua from './pages/purchasedTickets/PurchasedTickets';
import LichSuGiaoDich from './pages/transactionHistories/TransactionHistories.js';
import QuanLyTrangThongTin from './pages/accountdetailM/AccountDetailM.js';


function App() {
  const [logged, setLogged] = useState({ fullName: '', userName: '', password: '', email: '', phoneNumber: 0, photo: '' });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Thời gian hiện tại tính bằng giây
      // Kiểm tra thời gian hết hạn
      if (decodedToken.exp > currentTime) {
        setLogged({ fullName: decodedToken.fullName, userName: decodedToken.sub });
      } else {
        // Token đã hết hạn, xoá token và thông tin đăng nhập
        localStorage.removeItem('token');
        setLogged({ fullName: '', userId: '' });
      }
    }
  }, []);
  return (
    <Router>
      <Header />
      <Routes> {/* Sử dụng Routes để xác định các route */}
        <Route path="/" element={<HomeScreen />} /> {/* Trang chủ */}
        <Route path="/login" element={<LoginScreen />} /> {/* Trang đăng nhập */}
        <Route path="/forgotpassword" element={<ForgotPassword />} /> {/* Trang đăng nhập */}
        <Route path="/phim-dang-chieu" element={<PhimDangChieuPage />} /> {/* Trang phim đang chiếu */}
        <Route path="/phim-sap-chieu" element={<PhimSapChieuPage />} /> {/* Trang phim sắp chiếu */}
        <Route path="/thanh-toan" element={<ThanhToan />} /> {/* Trang thanh toán */}
        <Route path="/thong-tin-ve" element={<ThongTinVe />} /> {/* Trang thông tin vé */}
        <Route path="/lien-he" element={<LienHe />} /> {/* Trang liên hệ */}
        <Route path="/phim-yeu-thich" element={<PhimYeuThich />} /> {/* Trang phim yêu thích */}
        <Route path="/ve-da-mua" element={<VeDaMua />} /> {/* Trang vé đã mua*/}
        <Route path="/lich-su-giao-dich" element={<LichSuGiaoDich />} /> {/* Trang lịch sử giao dịch*/}
        <Route path="/quan-ly-trang-thong-tin" element={<QuanLyTrangThongTin />} /> {/* Trang quản lý thông tin khách hàng/}
      
        {/* Có thể thêm các route khác tại đây */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;