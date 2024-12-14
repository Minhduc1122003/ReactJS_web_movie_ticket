import React from 'react';
import { FaTimes } from 'react-icons/fa'; // Icon cho nút đóng

function TicketInfo() {
    return (
        <div className="container w-50 my-4">
            <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">Thông tin vé</h5>
                    <button className="btn btn-link">
                        <FaTimes size={20} /> {/* Nút đóng */}
                    </button>
                </div>

                <div className="card-body text-center">
                    {/* Ảnh phim */}
                    <img
                        src="https://touchcinema.com/medias/hinh-phim-2021/rsz-romulus-instagram-payoff-poster-vietnam-poster.jpg" // Hình ảnh poster (thay thế bằng ảnh thực tế)
                        alt="Movie Poster"
                        className="img-fluid rounded mb-3"
                        style={{ width: '200px' }}
                    />

                    {/* Thông tin phim */}
                    <h6 className="card-title mb-2">Quái vật không gian</h6>
                    <p className="text-muted mb-1">2D Phụ đề</p>
                    <p className="mb-2">
                        <strong>PANTHERs Tô Ký - Rạp 2</strong><br />
                        Suất chiếu: <span className="text-muted">17:30 - T5 12/09/2024</span>
                    </p>

                    {/* QR Code */}
                    <img className="mb-3" alt="" src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg" />

                    {/* Thông tin chi tiết */}
                    <div className="text-left">
                        <p className="mb-2"><strong>Ghế:</strong> G7</p>
                        <p className="mb-2"><strong>Combo:</strong> 1x Combo solo - bắp nước</p>
                    </div>

                    {/* Thông tin mã vé và thanh toán */}
                    <div className="d-flex justify-content-between mb-3">
                        <span className="text-muted">Mã vé: 279942</span>
                        <span className="text-muted">Thanh toán: 124.000 VND</span>
                    </div>
                </div>

                {/* Nút đóng */}
                <div className="card-footer text-center">
                    <button className="btn " style={{ backgroundColor: '#6A0EAD', color: 'white', width: '100%', padding: '12px', borderRadius: '8px', fontSize: '18px' }}>Thoát</button>
                </div>
            </div>
        </div>
    );
}

export default TicketInfo;
