import React from 'react';
import './PurchasedTickets.css'; // Import file CSS
return (
    <div className="container mt-5 purchased-tickets-container">
      <h2 className="title">Vé đã mua</h2>

      <div className="ticket-list">
        {tickets.map((ticket) => (
          <div key={ticket.id} className="ticket-item card mb-3">
            <div className="card-body">
              <h5 className="card-title">{ticket.movie}</h5>
              <p className="card-text">Rạp: {ticket.cinema}</p>
              <p className="card-text">Ngày chiếu: {ticket.date}</p>
              <p className="card-text">Ghế ngồi: {ticket.seat}</p>
              <p className="card-text">
                Giá vé: {ticket.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
export default PurchasedTickets;