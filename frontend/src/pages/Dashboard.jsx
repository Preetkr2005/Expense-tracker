import { useState } from "react";
import demoTransactions from "../Demo/Demodata";
import "./Dashboard.css";

export default function Dashboard() {
  const [transactions] = useState(demoTransactions);

  const total = transactions.reduce(
    (sum, t) => sum + t.amount,
    0
  );

  return (
    <div className="dashboard">

      {/* Total Card */}
      <div className="total-card">
        <h3>Total Spending</h3>
        <h2>₹ {total}</h2>
      </div>

      {/* Transactions */}
      <div className="transaction-list">
        <h3>Recent Transactions</h3>

        {transactions.map((t) => (
          <div className="transaction-item" key={t._id}>
            <div>
              <p className="title">{t.title}</p>
              <p className="category">{t.category}</p>
            </div>

            <h4>₹ {t.amount}</h4>
          </div>
        ))}
      </div>

    </div>
  );
}