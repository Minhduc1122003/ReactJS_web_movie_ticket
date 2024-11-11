import React, { useState, useEffect } from 'react';
import './updateAccount.css'; // Create this CSS file for styling
import { updateUser, userDetail, logout } from '../../services/api_provider';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

function UpdateAccountProfile() {

  const [toastMessage, setToastMessage] = useState(null);
  const [userId, setUserId] = useState(null);
  const [usernameNew, setUsernameNew] = useState('');
  const [fullnameNew, setFullnameNew] = useState('');
  const [emailNew, setEmailNew] = useState('');
  const [phoneNew, setPhoneNew] = useState('');
  const [passwordNew, setPasswordNew] = useState('');
  // const [confirmpasswordNew, setConfirmpasswordNew] = useState('');

  useEffect(() => {
    const msg = null; // Replace with logic to show messages if necessary
    if (msg) {
      setToastMessage(msg);
    }

    const fetchUserDetail = async () => {
      const userString = localStorage.getItem('user');
      
      // const user = JSON.parse(userString);
      // if (user) {
      //   setUserId(user.userId);
      //   setUsernameNew(user.userName);
      //   setFullnameNew(user.fullName);
      //   setEmailNew(user.email);
      //   setPhoneNew(user.phoneNumber);
      // } else {
      //   setToastMessage('Lấy thông tin chi tiết thất bại !');
      //   setTimeout(() => {
      //     setToastMessage(null);
      //   }, 5000);
      // }

      if (userString) {
        const userLCST = JSON.parse(userString);
        setUserId(userLCST.userId);

        try {
          const user = await userDetail(userLCST.userId);

          setUsernameNew(user.userName);
          setFullnameNew(user.fullName);
          setEmailNew(user.email);
          setPhoneNew(user.phoneNumber);
          setPasswordNew(user.password);
        } catch (error) {
          console.error('Lấy thông tin chi tiết thất bại:', error);
          setToastMessage('Lấy thông tin chi tiết thất bại !');
          setTimeout(() => {
            setToastMessage(null);
          }, 5000);
        }
      }
    };

    fetchUserDetail();

  }, []);

  const handleLogout = async () => {
    try {
      const response = await logout();

      if (response.ok) {
        // Xử lý thành công
        console.log("Đăng xuất thành công!");
        localStorage.removeItem("token"); // Xóa token khỏi localStorage
        localStorage.removeItem("user"); // Xóa user khỏi localStorage

        // Chuyển hướng hoặc cập nhật trạng thái
        window.location.href = '/login';
      }
    } catch (error) {
      console.error("Lỗi mạng hoặc server:", error);
    }
  };

  // Function to handle form submission (mock for now)
  const handleUpdataAccount = async (evt) => {
    evt.preventDefault();

    // Hiện thông báo xác nhận
    const { isConfirmed } = await Swal.fire({
      title: 'Xác nhận',
      text: "Bạn có chắc chắn muốn cập nhật thông tin không?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Có',
      cancelButtonText: 'Không'
    });

    if (!isConfirmed) {
      return; // Kết thúc hàm nếu người dùng không đồng ý
    }

    const newUser = {
      userName: usernameNew,
      fullName: fullnameNew,
      email: emailNew,
      phoneNumber: phoneNew,
      password: passwordNew
    };

    try {
      const data = await updateUser(userId, newUser);
      console.log('Cập nhật thành công !', data);

      await Swal.fire({
        title: 'Thành công',
        text: 'Thông tin đã được cập nhật thành công!',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      handleLogout();
    } catch (error) {
      console.log('Cập nhật thất bại !', error);
      setToastMessage('Cập nhật thất bại !');
      setTimeout(() => {
        setToastMessage(null);
      }, 5000);
    }

  };

  return (
    <div className="container" style={{ maxWidth: '45%' }}>
      <div className="row">

        {/* Main content area */}
        <h2 className="mt-4"> CẬP NHẬT THÔNG TIN CÁ NHÂN</h2>
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleUpdataAccount}>
              <div className="mb-3">
                <label htmlFor="regUsername" className="form-label">Tài Khoản</label>
                <input type="text"
                  className="form-control"
                  id="updUsername"
                  placeholder="Nhập tên đăng nhập"
                  value={usernameNew}
                  onChange={(e) => setUsernameNew(e.target.value)}
                  required />
              </div>
              <div className="mb-3">
                <label htmlFor="updUsername" className="form-label">Họ tên</label>
                <input type="text" className="form-control" id="regFullname" placeholder="Nhập họ tên" required
                  value={fullnameNew} onChange={(e) => setFullnameNew(e.target.value)} />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control" id="email" placeholder="Nhập email" required
                  value={emailNew} onChange={(e) => setEmailNew(e.target.value)} />
              </div>
              <div className="mb-3">
                <label htmlFor="phoneNumber" className="form-label">Số điện thoại</label>
                <input type="text" className="form-control" id="phoneNumber" placeholder="Nhập số điện thoại" required
                  value={phoneNew} onChange={(e) => setPhoneNew(e.target.value)} />
              </div>
              <div className="mb-3">
                <label htmlFor="regPassword" className="form-label">Mật khẩu</label>
                <input type="password" className="form-control" id="updPassword" placeholder="Nhập mật khẩu" required
                  value={passwordNew} onChange={(e) => setPasswordNew(e.target.value)} />
              </div>
              {/* <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">Xác nhận mật khẩu</label>
                <input type="password" className="form-control" id="confirmPassword" placeholder="Xác nhận mật khẩu" required
                  value={confirmpasswordNew} onChange={(e) => setConfirmpasswordNew(e.target.value)} />
              </div> */}
              <button type="submit" className="btn btn-primary btn-block mt-3 float-end">Cập nhật</button>
            </form>
            <Link to="/accountProfile"><button className="btn btn-danger btn-block mt-3 float-end" style={{ marginRight: '15px' }}>Quay lại</button></Link>
          </div>
        </div>

      </div>
      {/* Toast notification */}
      {toastMessage && (
        <div className="toast show" style={{ position: 'fixed', right: '10px' }}>
          <div className="toast-header">
            <strong className="me-auto">Thông báo</strong>
            <small className="text-muted">vừa xong</small>
            <button type="button" className="btn-close" onClick={() => setToastMessage(null)} aria-label="Close"></button>
          </div>
          <div className="toast-body">
            {toastMessage}
          </div>
        </div>
      )}
    </div>
  );
}

export default UpdateAccountProfile;
