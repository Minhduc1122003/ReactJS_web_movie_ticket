import React, { useState, useEffect } from 'react';
import './PurchasedTickets.css'; // Import CSS for styling
import { getTicketBuyUserId, paymentVNP, paymentVNPcallBack } from '../../services/api_provider';
import Swal from 'sweetalert2';

function PurchasedTickets() {
  // State to manage the list of purchased tickets
  const [user, setUser] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [payment, setPayment] = useState(0);

  useEffect(() => {
    const userString = localStorage.getItem('user');
    if (userString) {
      setUser(JSON.parse(userString));  // Chỉ setUser khi có userString
    }
  }, []);

  useEffect(() => {
    if (user && user.userId) {  // Kiểm tra xem user đã được set chưa
      // Gọi API từ api_provider
      getTicketBuyUserId(user.userId)
        .then(data => setTickets(data))
        .catch(error => console.error('Lỗi xảy ra:', error));
      setPayment(0);
    }
  }, [user, payment]);

  const handlePayment = async (amount, numId) => {
    console.log(amount);
    const id = String(numId);
    console.log(id);

    try {
      const data = await paymentVNP(amount, id);
      window.location.href = data.paymentUrl;

    } catch (error) {
      console.error('Lỗi khi thanh toán:', error);
    }
  };

  const handleCallback = async (queryParams) => {
    try {
      const data = await paymentVNPcallBack(queryParams);
      console.log(data);
      await Swal.fire({
        title: 'Thành công',
        text: 'Thanh toán thành công!',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      setPayment(1);
    } catch (error) {
      await Swal.fire({
        title: 'Thất bại',
        text: 'Thanh toán thất bại!',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      console.error(error);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ticketId = params.get('id');
    const vnp_TransactionStatus = params.get('vnp_TransactionStatus');
    const vnp_SecureHash = params.get('vnp_SecureHash');

    if (ticketId && vnp_TransactionStatus && vnp_SecureHash) {
      // Chuyển dữ liệu từ URL thành object để gọi API callback
      const queryParams = Object.fromEntries(params.entries());
      handleCallback(queryParams);
    }
  }, []);

  return (
    <div className="purchased-tickets-container">
      <div className="divider">
        <h2>Vé đã đặt</h2>
      </div>
      <div className="tickets-grid">
        {tickets.map((ticket, index) => (
          <div className="ticket-card" key={index}>
            <img src={ticket.posterUrl} alt={ticket.title} className="ticket-image" />
            <div className="ticket-details">
              <h3>{ticket.title}</h3>
              <hr />
              <p><strong>Ngày:</strong> {ticket.showtimeDate}</p>
              <p><strong>Giờ:</strong> {ticket.startTime}</p>
              <p><strong>Ghế:</strong> {ticket.chairCodes}</p>
              <p><strong>Địa điểm:</strong> {ticket.cinemaName}</p>
              <p><strong>Tổng tiền:</strong> {ticket.totalPrice} VND</p>
              <button
                type="button"
                className="btn btn-primary float-end"
                disabled={ticket.status.trim() === 'Đã thanh toán'}
                onClick={() => handlePayment(ticket.totalPrice, ticket.buyTicketInfoId)}
              >
                {ticket.status}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PurchasedTickets;
