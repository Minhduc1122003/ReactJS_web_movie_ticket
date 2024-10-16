import React, { useState } from 'react';
import './AccountDetailM.css'; // Create this CSS file for styling

function AccountProfile() {
  const [userInfo, setUserInfo] = useState({
    userName: 'khachhang1', // Default username for display
    phoneNumber: ''
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  // Function to handle form submission (mock for now)
  const handleSave = () => {
    console.log('Updated Information:', userInfo);
    alert('Thông tin cá nhân đã được cập nhật!');
  };

  return (
    <div className="account-management-container">
      <div className="row">
        {/* Sidebar for navigation */}
        <div className="col-md-3">
          <div className="list-group">
            <button className="list-group-item list-group-item-action active">Profile</button>
            <button className="list-group-item list-group-item-action">Email</button>
            <button className="list-group-item list-group-item-action">Password</button>
            <button className="list-group-item list-group-item-action">External logins</button>
            <button className="list-group-item list-group-item-action">Two-factor authentication</button>
            <button className="list-group-item list-group-item-action">Personal data</button>
          </div>
        </div>

        {/* Main content area */}
        <div className="col-md-9">
          <h2 className="mt-4">Profile</h2>

          <div className="card">
            <div className="card-body">
              <div className="form-group">
                <label htmlFor="userName">Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="userName"
                  name="userName"
                  value={userInfo.userName}
                  disabled // Make it uneditable
                />
              </div>

              <div className="form-group mt-3">
                <label htmlFor="phoneNumber">Phone number</label>
                <input
                  type="text"
                  className="form-control"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={userInfo.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="Enter phone number"
                />
              </div>

              <button className="btn btn-primary mt-3" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountProfile;
