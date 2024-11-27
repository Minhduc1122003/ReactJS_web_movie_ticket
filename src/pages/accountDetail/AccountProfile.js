import React, { useState, useEffect } from 'react';
import { logout, getAvt, uploadAvt } from '../../services/api_provider';
import { Link, useNavigate } from 'react-router-dom';
import './AccounProfile.css';
import Swal from 'sweetalert2';

function AccountProfile() {
  const [user, setUser] = useState('');
  const [avt, setAvt] = useState('');
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      console.log(user);
      setUser(user);
    }
  }, []);

  useEffect(() => {
    const fetchAvt = async () => {
      if (user && user.userId) {  // Kiểm tra nếu user và userId tồn tại
        const data = await getAvt(user.userId);
        console.log(data);
        setAvt(data);
      }
    };

    fetchAvt();
  }, [user, imageUrl]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      // Dùng FileReader để tạo URL cho ảnh
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvt(reader.result); // Cập nhật ảnh mới vào state
      };
      reader.readAsDataURL(selectedFile); // Đọc file dưới dạng base64
      setFile(selectedFile); // Lưu lại file nếu cần
    }
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('userId', user.userId);

    const { isConfirmed } = await Swal.fire({
      title: 'Cập nhật ảnh mới',
      text: 'Bạn muốn đổi ảnh đại diện mới ?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Có',
      cancelButtonText: 'Không'
    });

    if (!isConfirmed) {
      return; // Nếu người dùng không đồng ý, dừng hàm
    }

    try {
      const data = await uploadAvt(formData);

      await Swal.fire({
        title: 'Thành công',
        text: 'Cập nhật ảnh thành công !',
        icon: 'success',
        confirmButtonText: 'OK'
      });

      setAvt(data);
      setImageUrl(data);
      setFile(null);
    } catch (error) {
      await Swal.fire({
        title: 'Thất bại',
        text: 'Cập nhật ảnh thất bại. Vui lòng thử lại!',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      console.error('Upload failed:', error);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await logout();
      if (response.ok) {
        console.log("Đăng xuất thành công!");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
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

            <Link to="/ve-da-mua" className="list-group-item list-group-item-action">
              Vé đã đặt
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

          <div className="text-center">
            <h2>Thông tin cá nhân</h2>
            <div className="card" style={{ border: "none", marginBottom: "0" }}>
              <div className="card-body">
                <div className='img-avt'>
                  <input
                    id="fileInput"
                    type="file"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                  />
                  <img onClick={() => document.getElementById('fileInput').click()}
                    src={avt}
                    alt="User Avatar"
                    className="avt-account img-fluid rounded-circle"
                  />
                  <button
                    onClick={handleUpload}
                    className='button-avt position-absolute top-50 translate-middle btn btn-outline-success'
                    disabled={file === null}>
                    Đổi ảnh
                  </button>
                </div>

              </div>
            </div>
          </div>

          <form action="/updateUser" method="post">
            <div className="row">

              <div className="row" style={{ marginTop: '' }}>
                <div className="col-md-6">
                  <div className="card">
                    <div className="card-body item-acc-detail">
                      <h5 className="card-title">Tài khoản</h5>
                      <p className="card-text">{user.userName}</p>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-body item-acc-detail">
                      <h5 className="card-title">Email</h5>
                      <p className="card-text">{user.email}</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card">
                    <div className="card-body item-acc-detail">
                      <h5 className="card-title">Họ tên</h5>
                      <p className="card-text">{user.fullName}</p>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-body item-acc-detail">
                      <h5 className="card-title">Số điện thoại</h5>
                      <p className="card-text">{user.phoneNumber}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button className="btn btn-danger"
              style={{ marginTop: '2%' }}
              onClick={() => {navigate('/quan-ly-thong-tin', {
                state: { userName: user.userName, fullName: user.fullName, email: user.email, phoneNumber: user.phoneNumber }
              })}}>
              Cập nhật
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AccountProfile;
