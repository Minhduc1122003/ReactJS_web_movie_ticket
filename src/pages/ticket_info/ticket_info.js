import React from 'react';


function TicketInfo({ 
    moviePoster = "https://touchcinema.com/medias/hinh-phim-2021/rsz-romulus-instagram-payoff-poster-vietnam-poster.jpg",
    movieTitle = "Quái vật không gian",
    movieFormat = "2D Phụ đề",
    theater = "PANTHERs Tô Ký - Rạp 2",
    showtime = "17:30 - T5 12/09/2024",
    seat = "G7",
    combo = "1x Combo solo - bắp nước",
    ticketCode = "279942",
    paymentAmount = "124.000 VND",
    onClose // Function to close the card
}) {
    return (
        <div className="container w-50 my-4">
            <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">Thông tin vé</h5>
                    <button 
                        className="btn btn-link" 
                        onClick={onClose} 
                        aria-label="Close ticket information"
                    >
                    
                    </button>
                </div>

                <div className="card-body text-center">
                    {/* Ảnh phim */}
                    <img
                        src={moviePoster} // Movie poster image
                        alt={`${movieTitle} Poster`}
                        onError={(e) => e.target.src = "https://via.placeholder.com/200"} // Fallback image
                        className="img-fluid rounded mb-3"
                        style={{ width: '200px' }}
                    />

                    {/* Thông tin phim */}
                    <h6 className="card-title mb-2">{movieTitle}</h6>
                    <p className="text-muted mb-1">{movieFormat}</p>
                    <p className="mb-2">
                        <strong>{theater}</strong><br />
                        Suất chiếu: <span className="text-muted">{showtime}</span>
                    </p>

                    {/* QR Code */}
                    <img 
                        className="mb-3" 
                        src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg" 
                        alt="QR Code"
                        style={{ width: '100px', height: '100px' }}
                    />

                    {/* Thông tin chi tiết */}
                    <div className="text-left">
                        <p className="mb-2"><strong>Ghế:</strong> {seat}</p>
                        <p className="mb-2"><strong>Combo:</strong> {combo}</p>
                    </div>

                    {/* Thông tin mã vé và thanh toán */}
                    <div className="d-flex justify-content-between mb-3">
                        <span className="text-muted">Mã vé: {ticketCode}</span>
                        <span className="text-muted">Thanh toán: {paymentAmount}</span>
                    </div>
                </div>

                {/* Nút đóng */}
                <div className="card-footer text-center">
                    <button 
                        className="btn" 
                        style={{ backgroundColor: '#6A0EAD', color: 'white', width: '100%', padding: '12px', borderRadius: '8px', fontSize: '18px' }} 
                        onClick={onClose}
                    >
                        Thoát
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TicketInfo;
