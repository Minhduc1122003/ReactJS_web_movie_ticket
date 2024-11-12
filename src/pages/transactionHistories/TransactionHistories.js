import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TransactionHistories.css'; // Import CSS

function TransactionHistories() {
  // State to manage the list of transactions
  const [transactions] = useState([
    {
      movie: 'Phim A',
      showDate: '2024-10-10',
      showTime: '18:00',
      totalAmount: 500000,
    },
    {
      movie: 'Phim B',
      showDate: '2024-10-12',
      showTime: '20:00',
      totalAmount: 300000,
    },
    {
      movie: 'Phim C',
      showDate: '2024-10-15',
      showTime: '19:30',
      totalAmount: 1000000,
    },
  ]);

  const navigate = useNavigate();

  // Function to handle viewing details
  const handleViewDetails = (transaction) => {
    navigate(`/details/${transaction.movie}`, { state: { transaction } });
  };

  return (
    <div className="container mt-5 transaction-history-container">
      <h2 className="title">Vé đã mua</h2>

      <table className="table table-bordered table-striped mt-4">
        <thead className="thead-dark">
          <tr>
            <th>Phim</th>
            <th>Ngày chiếu</th>
            <th>Giờ chiếu</th>
            <th>Tổng tiền</th>
            <th>Chi tiết</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 ? (
            transactions.map((transaction, index) => (
              <tr key={index}>
                <td>{transaction.movie}</td>
                <td>{transaction.showDate}</td>
                <td>{transaction.showTime}</td>
                <td>{transaction.totalAmount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                <td>
                  <button 
                    className="btn btn-primary" 
                    onClick={() => handleViewDetails(transaction)}
                  >
                    Xem chi tiết
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">Không có giao dịch nào.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionHistories;
