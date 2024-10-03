// App.js
import React from 'react';
import './assets/css/style.css';
import HomePage from './pages/homePage/homeScreen';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "bootstrap-icons/font/bootstrap-icons.css";
import LoginPage from './pages/loginPage/loginScreen';
import Header from './layouts/headerLayout/header';
import Footer from './layouts/footerLayout/footer'; 

function App() {
  return (
    <Router>
      <Header />
      <Routes> {/* Sử dụng Routes để xác định các route */}
        <Route path="/" element={<HomePage />} /> {/* Trang chủ */}
        <Route path="/login" element={<LoginPage />} /> {/* Trang đăng nhập */}
        {/* Có thể thêm các route khác tại đây */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;