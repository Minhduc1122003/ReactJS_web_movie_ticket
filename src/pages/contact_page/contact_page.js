import React, { useState } from "react";

const ContactUs = () => {
    // State to handle form inputs
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log(formData);
    };

    return (
        <div className="container mt-5">
            <h2>Liên hệ với chúng tôi</h2>

            <div className="row">
                {/* Left side: Contact details and map */}
                <div className="col-md-6">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.660777042963!2d106.68284977417292!3d10.762622892364153!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752ef4d4a9e419%3A0x39fffe123ca7f827!2sCGV%20Vietnam%20Co.%2C%20Ltd!5e0!3m2!1sen!2s!4v1607423441626!5m2!1sen!2s"
                        width="100%"
                        height="400"
                        frameBorder="0"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        aria-hidden="false"
                        tabIndex="0"
                    ></iframe>

                    <div className="mt-4">
                        <h5>TRỤ SỞ CHÍNH</h5>
                        <p>
                            Tầng 2, Rivera Park Saigon - 56/7B Thành Thái, P14, Q10, Thành
                            phố Hồ Chí Minh.
                        </p>

                        <h5>DỊCH VỤ KHÁCH HÀNG</h5>
                        <p>
                            Hotline: 1900 6017
                            <br />
                            Giờ làm việc: 8:00 - 22:00
                            <br />
                            Tất cả các ngày bao gồm cả Lễ Tết
                            <br />
                            Email: hoidap@cgv.vn
                        </p>
                    </div>
                </div>

                {/* Right side: Contact form */}
                <div className="col-md-6">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Tên *</label>
                            <input
                                type="text"
                                name="name"
                                className="form-control"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Email *</label>
                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Điện thoại</label>
                            <input
                                type="tel"
                                name="phone"
                                className="form-control"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Nội dung cần liên hệ *</label>
                            <textarea
                                name="message"
                                className="form-control"
                                rows="5"
                                value={formData.message}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>

                        <button type="submit" className="btn" style={{ backgroundColor: '#6A0EAD', color: 'white' }}>
                            GỬI ĐI
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
