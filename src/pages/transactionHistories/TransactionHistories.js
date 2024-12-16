import React, { useState, useEffect } from 'react';
import './TransactionHistories.css'; // Import CSS for styling
import { getHistory } from '../../services/api_provider';
import { QRCodeSVG } from 'qrcode.react';

function TransactionHistories() {
  // State to manage the list of purchased tickets
  const [user, setUser] = useState(null);
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const userString = localStorage.getItem('user');
    if (userString) {
      setUser(JSON.parse(userString));  // Chỉ setUser khi có userString
    }
  }, []);

  useEffect(() => {
    if (user && user.userId) {  // Kiểm tra xem user đã được set chưa
      // Gọi API từ api_provider
      getHistory(user.userId)
        .then(data => {
          console.log(data);
          setTickets(data);
        })
        .catch(error => console.error('Lỗi xảy ra:', error));
    }
  }, [user]);

  return (
    <div className="purchased-tickets-container">
      <div className="divider">
        <h2>Lịch sử giao dịch</h2>
      </div>
      <div className="tickets-grid">
        {tickets.map((ticket, index) => (
          <div className="ticket-card bg-light" key={index}>
            <img src={ticket.posterUrl} alt={ticket.title} className="ticket-image" />
            <div className="ticket-details">
              <h3 className='d-inline text-dark'>{ticket.title}</h3>
              <p className={`check-in-ticket float-end ${ticket.checkIn ? 'text-success' : 'text-danger'}`}>
                <strong>{ticket.checkIn ? 'Đã sử dụng' : 'Chưa sử dụng'}</strong>
              </p>
              <hr className='text-dark' />
              <p className='text-dark'><strong>Ngày:</strong> {ticket.showtimeDate}</p>
              <p className='text-dark'><strong>Giờ:</strong> {ticket.startTime}</p>
              <p className='text-dark'><strong>Ghế:</strong> {ticket.chairCodes}</p>
              <p className='text-dark'><strong>Địa điểm:</strong> {ticket.cinemaName}</p>
              <p className='text-dark'><strong>Tổng tiền:</strong> {ticket.totalPrice} VND</p>
              
              <QRCodeSVG className='QR-img' value={ticket.buyTicketId} size={128} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TransactionHistories;
