import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css'; // Giữ lại nếu bạn muốn sử dụng CSS
import App from './App';
import ForgotPassword from './pages/FormForgotPassword/ForgotPassword';
import UpdatePassword from './pages/FormForgotPassword/UpdatePassword';
import OTPVerification from './pages/FormForgotPassword/OTPVerification';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
<Router>
      <Routes>
        {/* Định nghĩa các route */}
        <Route path="/" element={<App />}>
         
        </Route>
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="update-password" element={<UpdatePassword />} />
        <Route path="otp-verification" element={<OTPVerification />} />

      </Routes>
    </Router> 
     </React.StrictMode>
);
