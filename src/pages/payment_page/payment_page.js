import React, { useState } from 'react';

function PaymentPage() {
    const [voucher, setVoucher] = useState('');
    const [setPaymentMethod] = useState('');
    const [discount] = useState(30);
    const handlePayment = () => {
        // Xử lý thanh toán
    };


    return (
        <div className="container mt-5 mb-5" style={{ fontFamily: 'Arial, sans-serif' }}>
            {/* Phần thông tin phim */}
            <div className="d-flex mb-3">
                <img src="https://touchcinema.com/medias/hinh-phim-2021/rsz-romulus-instagram-payoff-poster-vietnam-poster.jpg" alt="Movie Poster" className="img-fluid" style={{ width: '200px', marginRight: '30px', borderRadius: '10px' }} />
                <div>
                    <h4 className="mb-1">Quái vật không gian <span className="badge bg-danger">18+</span></h4>
                    <p className="mb-0">2D Phụ đề</p>
                    <p className="mb-0">PANTHERs Tô Kỳ - Rạp 2</p>
                    <p className="mb-0">17:30 - T5 12/09/2024</p>
                </div>
            </div>

            {/* Phần thông tin giao dịch */}
            <div className="card mb-3">
                <div className="card-body">
                    <h5 className="card-title">Thông tin giao dịch</h5>
                    <div className="d-flex justify-content-between">
                        <span>1x Vé xem phim - G7</span>
                        <span>60.000 VND</span>
                    </div>
                    <div className="d-flex justify-content-between">
                        <span>1x Combo solo - bắp nước</span>
                        <span>94.000 VND</span>
                    </div>
                    <div className="d-flex justify-content-between font-weight-bold">
                        <span>Tổng cộng:</span>
                        <span>154.000 VND</span>
                    </div>
                </div>
            </div>

            {/* Phần voucher */}
            <div className="card mb-3">
                <div className="card-body">
                    <h5 className="card-title">Voucher</h5>
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nhập voucher"
                            value={voucher}
                            onChange={(e) => setVoucher(e.target.value)}
                        />
                        <button className="btn btn-outline-primary" type="button">Áp dụng</button>
                    </div>
                    <div className="d-flex justify-content-between">
                        <span>Giảm giá voucher:</span>
                        <span>-{discount}.000 VND</span>
                    </div>
                </div>
            </div>

            {/* Phần tổng thanh toán */}
            <div className="card mb-3">
                <div className="card-body">
                    <h5 className="card-title">Tổng thanh toán</h5>
                    <div className="d-flex justify-content-between">
                        <span>Tổng cộng:</span>
                        <span>154.000 VND</span>
                    </div>
                    <div className="d-flex justify-content-between">
                        <span>Giảm giá voucher:</span>
                        <span>-{discount}.000 VND</span>
                    </div>
                    <div className="d-flex justify-content-between font-weight-bold text-danger">
                        <span>Còn lại:</span>
                        <span>124.000 VND</span>
                    </div>
                </div>
            </div>

            {/* Phần phương thức thanh toán */}
            <div className="card mb-3">
                <div className="card-body">
                    <h5 className="card-title">Phương thức thanh toán</h5>

                    {/* Phương thức ATM/ VISA/ MASTER/ JCB/ QRCode */}
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <div className="d-flex align-items-center">
                            <img src="https://www.vn.jcb/vi/common/images/svg/jcb_emblem_logo.svg" alt="Movie Poster" className="img-fluid" style={{ width: '50px', marginRight: '30px', borderRadius: '10px' }} />
                            <label className="form-check-label mb-0">ATM/ VISA/ MASTER/ JCB/ QRCode</label>
                        </div>
                        <input
                            className="form-check-input ms-3"
                            type="radio"
                            name="paymentMethod"
                            value="ATM"
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                    </div>

                    {/* Phương thức VNPay */}
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <div className="d-flex align-items-center">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTp1v7T287-ikP1m7dEUbs2n1SbbLEqkMd1ZA&s" alt="Movie Poster" className="img-fluid" style={{ width: '50px', marginRight: '30px', borderRadius: '10px' }} />
                            <label className="form-check-label mb-0">VNPay</label>
                        </div>
                        <input
                            className="form-check-input ms-3"
                            type="radio"
                            name="paymentMethod"
                            value="VNPay"
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                    </div>

                    {/* Phương thức MoMo */}
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                            <img src="https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png" alt="Movie Poster" className="img-fluid" style={{ width: '50px', marginRight: '30px', borderRadius: '10px' }} />
                            <label className="form-check-label mb-0">MoMo</label>
                        </div>
                        <input
                            className="form-check-input ms-3"
                            type="radio"
                            name="paymentMethod"
                            value="MoMo"
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Nút thanh toán */}
            <button className="btn btn-block" onClick={handlePayment} style={{ backgroundColor: '#6A0EAD', color: 'white', width: '100%', padding: '12px', borderRadius: '8px', fontSize: '18px' }}>Thanh toán</button>
        </div>
    );
}

export default PaymentPage;
