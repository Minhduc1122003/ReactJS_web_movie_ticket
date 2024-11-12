import React, { useState } from 'react';
import './PurchasedTickets.css'; // Import CSS for styling

function PurchasedTickets() {
  // State to manage the list of purchased tickets
  const [tickets] = useState([
    {
      id: 1,
      event: 'Avengers: Endgame',
      date: '12/10/2024',
      time: '7:00 PM',
      seat: 'A12',
      venue: 'Cinema Hall 5',
      image: '/img/anhtraivuotmoitamtai.jpg',
    },
    {
      id: 2,
      event: 'The Lion King',
      date: '14/10/2024',
      time: '5:00 PM',
      seat: 'B6',
      venue: 'Theatre Hall 3',
      image: 'https://example.com/lionking.jpg',
    },
    {
      id: 2,
      event: 'The Lion King',
      date: '14/10/2024',
      time: '5:00 PM',
      seat: 'B6',
      venue: 'Theatre Hall 3',
      image: 'https://example.com/lionking.jpg',
    },
    {
      id: 2,
      event: 'The Lion King',
      date: '14/10/2024',
      time: '5:00 PM',
      seat: 'B6',
      venue: 'Theatre Hall 3',
      image: 'https://example.com/lionking.jpg',
    },
    {
      id: 2,
      event: 'The Lion King',
      date: '14/10/2024',
      time: '5:00 PM',
      seat: 'B6',
      venue: 'Theatre Hall 3',
      image: 'https://example.com/lionking.jpg',
    },  
    {
      id: 2,
      event: 'The Lion King',
      date: '14/10/2024',
      time: '5:00 PM',
      seat: 'B6',
      venue: 'Theatre Hall 3',
      image: 'https://example.com/lionking.jpg',
    },
    {
      id: 2,
      event: 'The Lion King',
      date: '14/10/2024',
      time: '5:00 PM',
      seat: 'B6',
      venue: 'Theatre Hall 3',
      image: 'https://example.com/lionking.jpg',
    },
    // Add more ticket objects as needed
  ]);

  return (
    <div className="purchased-tickets-container">
      <h2>Vé Đã Mua</h2>
      <div className="tickets-grid">
        {tickets.map((ticket) => (
          <div key={ticket.id} className="ticket-card">
            <img src={ticket.image} alt={ticket.event} className="ticket-image" />
            <div className="ticket-details">
              <h3>{ticket.event}</h3>
              <p><strong>Ngày:</strong> {ticket.date}</p>
              <p><strong>Giờ:</strong> {ticket.time}</p>
              <p><strong>Ghế:</strong> {ticket.seat}</p>
              <p><strong>Địa điểm:</strong> {ticket.venue}</p>
              <button className="details-button">Xem chi tiết</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PurchasedTickets;
