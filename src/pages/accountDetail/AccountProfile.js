import React, {useState, useEffect} from 'react';
import { logout } from '../../services/api_provider';
import { Link } from 'react-router-dom';

function AccountProfile() {
  const [user, setUser] = useState('');

  useEffect(() => {
    const userString = localStorage.getItem('user');

    if(userString){
      const user = JSON.parse(userString);
      setUser(user);
    }
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
            <Link to={`/quan-ly-thong-tin/${user.userId}`}><button className="btn btn-primary">Cập nhật</button></Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AccountProfile;
