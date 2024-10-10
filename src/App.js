// App.js
import React from 'react';
import './assets/css/style.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "bootstrap-icons/font/bootstrap-icons.css";
import HomeScreen from './pages/homePage/homeScreen';
import LoginScreen from './pages/loginPage/loginScreen';
import Header from './layouts/headerLayout/header';
import Footer from './layouts/footerLayout/footer';
import ForgotPassword from './pages/FormForgotPassword/ForgotPassword';
import PhimDangChieuPage from './pages/phimPage/phimdanghieuScreen';
import PhimSapChieuPage from './pages/phimPage/phimsapchieuScreen';


function App() {
  return (
    <Router>
      <Header />
      <Routes> {/* Sử dụng Routes để xác định các route */}
        <Route path="/" element={<HomeScreen />} /> {/* Trang chủ */}
        <Route path="/login" element={<LoginScreen />} /> {/* Trang đăng nhập */}
        <Route path="/forgotpassword" element={<ForgotPassword />} /> {/* Trang đăng nhập */}
        <Route path="/phim-dang-chieu" element={<PhimDangChieuPage />} /> {/* Trang phim đang chiếu */}
        <Route path="/phim-sap-chieu" element={<PhimSapChieuPage />} /> {/* Trang phim sắp chiếu */}

        {/* Có thể thêm các route khác tại đây */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;