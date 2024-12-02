import React, { useState, useEffect } from 'react';
import './PurchasedTickets.css'; // Import CSS for styling
import { getTicketBuyUserId, paymentVNP, paymentVNPcallBack, delBuyTicket } from '../../services/api_provider';
import Swal from 'sweetalert2';

function PurchasedTickets() {
  // State to manage the list of purchased tickets
  const [user, setUser] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [payment, setPayment] = useState(0);
  const [cancel, setCancel] = useState(0);

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
      setCancel(0);
    }
  }, [user, payment, cancel]);

  const handlePayment = async (amount, numId) => {
    const { isConfirmed } = await Swal.fire({
      title: 'Thông báo',
      text: 'Sau khi thanh toán sẽ không thể hủy chỗ và hoàn tiền dưới mọi hình thức !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Hủy'
    });

    if(!isConfirmed){
      return;
    }

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

  const handleCancel = async (buyTicketId) => {
    const { isConfirmed } = await Swal.fire({
      title: 'Thông báo',
      text: 'Bạn có chắc muốn hủy vé ?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Hủy'
    });

    if(!isConfirmed){
      return;
    }

    console.log(buyTicketId);

    try {
      const data = await delBuyTicket(buyTicketId);
      await Swal.fire({
        title: 'Thành công',
        text: 'Hủy vé thành công!',
        icon: 'success',
        confirmButtonText: 'OK'
    });
    console.log("Buy ticket response:", data);
    setCancel(1);

    } catch (error) {
      await Swal.fire({
        title: 'Thất bại',
        text: 'Hủy vé thất bại. Vui lòng thử lại!',
        icon: 'error',
        confirmButtonText: 'OK'
    });
    console.error("Error buying ticket:", error);
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
              <p hidden><strong>BuyTicketId:</strong> {ticket.buyTicketId}</p>
              <button
                type="button"
                className="btn btn-primary btn-payment"
                disabled={ticket.status.trim() === 'Đã thanh toán'}
                onClick={() => handlePayment(ticket.totalPrice, ticket.buyTicketInfoId)}
              >
                {ticket.status}
              </button>

              <button
                type="button"
                className="btn btn-danger btn-cancel"
                disabled={ticket.status.trim() === 'Đã thanh toán'}
                onClick={() => handleCancel(ticket.buyTicketId)}
              >
                Hủy
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PurchasedTickets;
