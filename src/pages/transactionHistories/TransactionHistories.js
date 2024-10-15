import React from 'react';
import './TransactionHistories.css'; // Import CSS
return (
    <div className="container mt-5 transaction-history-container">
      <h2 className="title">Lịch sử giao dịch</h2>

      <table className="table table-bordered table-striped mt-4">
        <thead className="thead-dark">
          <tr>
            <th>Mã giao dịch</th>
            <th>Ngày giao dịch</th>
            <th>Số tiền</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.id}</td>
              <td>{transaction.date}</td>
              <td>{transaction.amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
              <td>
                <span
                  className={`status-label ${transaction.status === 'Thành công' ? 'success' : 
                                transaction.status === 'Thất bại' ? 'failed' : 'pending'}`}
                >
                  {transaction.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

export default TransactionHistories;