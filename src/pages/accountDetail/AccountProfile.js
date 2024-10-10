import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function AccountProfile() {
  const location = useLocation();
  const { user } = location.state; // Nhận đối tượng `user` từ `state`

  const handleLogout = async () => {
    const token = localStorage.getItem("token"); // Lấy token từ localStorage
    const headers = {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
    };

    try {
        const response = await fetch('http://localhost:9011/api/logout', {
            method: 'POST',
            headers: headers
        });

        if (response.ok) {
            // Xử lý thành công
            console.log("Đăng xuất thành công!");
            localStorage.removeItem("token"); // Xóa token khỏi localStorage
            // Chuyển hướng hoặc cập nhật trạng thái
            window.location.href = '/login';
        } else {
            console.error("Có lỗi xảy ra khi đăng xuất");
        }
    } catch (error) {
        console.error("Lỗi mạng hoặc server:", error);
    }
  };

  return (
    <div className="container mt-5" style={{ minHeight: '400px' }}>
      <div className="row">
        <div className="col-md-3">
          <div className="list-group">
            <button className="list-group-item list-group-item-action active">
              Thông tin cá nhân
            </button>
            <Link to="#" className="list-group-item list-group-item-action">
              "Chức năng cần thiết 1"
            </Link>
            <Link to="#" className="list-group-item list-group-item-action">
              "Chức năng cần thiết 2"
            </Link>
            <button onClick={handleLogout} className="list-group-item list-group-item-action list-group-item-danger">
              Đăng xuất
            </button>
          </div>
        </div>

        <div className="col-md-9">
          <h2>Thông tin cá nhân</h2>
          <form action="/updateUser" method="post">
            <div className="row">
              <div className="col-md-6">
              <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Tài khoản</h5>
                    <p className="card-text">{user.userName}</p>
                  </div>
                </div>
                
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Email</h5>
                    <p className="card-text">{user.email}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
              <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Họ tên</h5>
                    <p className="card-text">{user.fullName}</p>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Số điện thoại</h5>
                    <p className="card-text">{user.phoneNumber}</p>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Ảnh đại diện</h5>
                    <img
                      src={user.photo}
                      alt="User Avatar"
                      className="img-fluid"
                      style={{ maxWidth: '150px', borderRadius: '50%' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AccountProfile;
