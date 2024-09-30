import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Giữ lại nếu bạn muốn sử dụng CSS
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
