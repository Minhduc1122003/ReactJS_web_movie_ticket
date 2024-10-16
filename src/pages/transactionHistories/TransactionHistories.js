import React, { useState } from 'react';
import './TransactionHistories.css'; // Import CSS

function TransactionHistories() {
  // State to manage the list of transactions
  const [transactions, setTransactions] = useState([
    {
      id: 'TXN001',
      date: '2024-10-10',
      amount: 500000,
      status: 'Thành công',
    },
    {
      id: 'TXN002',
      date: '2024-10-12',
      amount: 300000,
      status: 'Thất bại',
    },
    {
      id: 'TXN003',
      date: '2024-10-15',
      amount: 1000000,
      status: 'Đang chờ xử lý',
    },
  ]);

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
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.id}</td>
                <td>{transaction.date}</td>
                <td>{transaction.amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                <td>
                  <span
                    className={`status-label ${
                      transaction.status === 'Thành công'
                        ? 'success'
                        : transaction.status === 'Thất bại'
                        ? 'failed'
                        : 'pending'
                    }`}
                  >
                    {transaction.status}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">Không có giao dịch nào.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionHistories;
