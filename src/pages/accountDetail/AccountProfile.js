import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function AccountProfile() {
  const location = useLocation();
  const { user } = location.state; // Nhận đối tượng `user` từ `state`

  return (
    <div className="container mt-5" style={{ minHeight: '400px' }}>
      <div className="row">
        <div className="col-md-3">
          <div className="list-group">
            <button className="list-group-item list-group-item-action active">
              Thông tin cá nhân
            </button>
            <Link to="#" className="list-group-item list-group-item-action">
              Account của tôi
            </Link>
            <form action="/logout" method="get" style={{ display: 'inline' }}>
              <button type="submit" className="list-group-item list-group-item-action list-group-item-danger">
                Đăng xuất
              </button>
            </form>
          </div>
        </div>

        <div className="col-md-9">
          <h2>Thông tin cá nhân</h2>
          <form action="/updateUser" method="post">
            <div className="row">
              <div className="col-md-6">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Full Name</h5>
                    <p className="card-text">{user.fullName}</p>
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
                    <h5 className="card-title">Phone Number</h5>
                    <p className="card-text">{user.phoneNumber}</p>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Photo</h5>
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
