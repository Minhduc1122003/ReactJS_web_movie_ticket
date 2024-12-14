import React, { useState, useEffect } from "react";
import "./updateAccount.css"; // Create this CSS file for styling
import { updateUser } from "../../services/api_provider";
import { Link, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import { useForm } from "react-hook-form";

// Định nghĩa schema với Yup
const schema = yup.object().shape({
  emailNew: yup
    .string()
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Email phải có dịnh dạng hợp lệ (ví dụ: example@gmail.com)')
    .required('Email là bắt buộc'),
  phoneNew: yup
    .string()
    .matches(/^[0-9]{10}$/, 'Số điện thoại phải có 10 chữ số')
    .required('Số điện thoại là bắt buộc'),
});

function UpdateAccountProfile() {
  const [toastMessage, setToastMessage] = useState(null);
  const [userId, setUserId] = useState(null);
  const [fullnameNew, setFullnameNew] = useState("");
  const [emailNew, setEmailNew] = useState("");
  const [phoneNew, setPhoneNew] = useState("");
  const location = useLocation();
  const { userName, fullName, email, phoneNumber } = location.state || {};

  //Khởi tạo react-hook-form với yup resolver
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange', //Kiểm tra validation mỗi khi thay đổi giá trịtrị
  })

  useEffect(() => {
    const msg = null; // Replace with logic to show messages if necessary
    if (msg) {
      setToastMessage(msg);
    }

    const fetchUserDetail = () => {
      const userString = localStorage.getItem("user");

      if (userString) {
        const userLCST = JSON.parse(userString);
        setUserId(userLCST.userId);
        setFullnameNew(fullName);
        setEmailNew(email);
        setPhoneNew(phoneNumber);
      }
    };

    fetchUserDetail();
  }, [email, fullName, phoneNumber, userName]);

  const handleLogout = async () => {

    // Xử lý thành công
    console.log("Đăng xuất thành công!");
    localStorage.removeItem("token"); // Xóa token khỏi localStorage
    localStorage.removeItem("user"); // Xóa user khỏi localStorage

    // Chuyển hướng hoặc cập nhật trạng thái
    window.location.href = "/login";

  };

  // Function to handle form submission (mock for now)
  const handleUpdateAccount = async (data) => {

    // Hiện thông báo xác nhận
    const { isConfirmed } = await Swal.fire({
      title: "Xác nhận",
      text: "Bạn có chắc chắn muốn cập nhật thông tin không?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Có",
      cancelButtonText: "Không",
    });

    if (!isConfirmed) {
      return; // Kết thúc hàm nếu người dùng không đồng ý
    }

    // Lấy dữ liệu từ react-hook-form
    const { emailNew, phoneNew } = data;

    const newUser = {
      fullName: fullnameNew,
      email: emailNew,
      phoneNumber: phoneNew,
    };

    try {
      const data = await updateUser(userId, newUser);
      console.log("Cập nhật thành công !", data);

      await Swal.fire({
        title: "Thành công",
        text: "Thông tin đã được cập nhật thành công!",
        icon: "success",
        confirmButtonText: "OK",
      });
      handleLogout();
    } catch (error) {
      console.log("Cập nhật thất bại !", error);
      setToastMessage("Cập nhật thất bại !");
      setTimeout(() => {
        setToastMessage(null);
      }, 5000);
    }
  };

  return (
    <div className="container" style={{ maxWidth: "45%" }}>
      <div className="row">
        {/* Main content area */}
        <h2 className="mt-4"> CẬP NHẬT THÔNG TIN CÁ NHÂN</h2>
        <div
          className="card mt-5 card-infor"
          style={{ backgroundColor: "#4F75FF" }}
        >
          <div className="card-body">
            <form onSubmit={handleSubmit(handleUpdateAccount)}>
              <div className="mb-3">
                <label
                  htmlFor="updUsername"
                  className="form-label form-label-info"
                >
                  Họ tên
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="regFullname"
                  placeholder="Nhập họ tên"
                  required
                  defaultValue={fullnameNew}
                  onChange={(e) => setFullnameNew(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label form-label-info">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  {...register('emailNew')}
                  placeholder="Nhập email"
                  defaultValue={emailNew}
                />
                {errors.emailNew && (
                  <p style={{ color: 'red' }}>{errors.emailNew.message}</p>
                )}
              </div>
              <div className="mb-3">
                <label
                  htmlFor="phoneNumber"
                  className="form-label form-label-info"
                >
                  Số điện thoại
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="phoneNumber"
                  {...register('phoneNew')}
                  placeholder="Nhập số điện thoại"
                  defaultValue={phoneNew}
                />
                {errors.phoneNew && (
                  <p style={{ color: 'red' }}>{errors.phoneNew.message}</p>
                )}
              </div>
              <button
                type="submit"
                className="btn btn-success btn-block mt-3 float-end"
              >
                Cập nhật
              </button>
            </form>
            <Link to="/accountProfile">
              <button
                className="btn btn-danger btn-block mt-3 float-end"
                style={{ marginRight: "15px" }}
              >
                Quay lại
              </button>
            </Link>
          </div>
        </div>
      </div>
      {/* Toast notification */}
      {toastMessage && (
        <div
          className="toast show"
          style={{ position: "fixed", right: "10px" }}
        >
          <div className="toast-header">
            <strong className="me-auto">Thông báo</strong>
            <small className="text-muted">vừa xong</small>
            <button
              type="button"
              className="btn-close"
              onClick={() => setToastMessage(null)}
              aria-label="Close"
            ></button>
          </div>
          <div className="toast-body">{toastMessage}</div>
        </div>
      )}
    </div>
  );
}

export default UpdateAccountProfile;
