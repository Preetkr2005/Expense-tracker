import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Dashboard.css";

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    const token = localStorage.getItem("access");

    try {
      const res = await axios.get(
        "http://127.0.0.1:8000/api/expenses/",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setTransactions(res.data);

    } catch (error) {
      console.log(error.response?.data || error);
    }
  };

  const filteredTransactions = selectedMonth
    ? transactions.filter((t) =>
        t.date.startsWith(selectedMonth)
      )
    : transactions;

  const total = filteredTransactions.reduce(
    (sum, t) => sum + Number(t.amount),
    0
  );

  return (
    <div className="dashboard">

      <div className="top-section">

        <div className="total-card">
          <h3>Total Spending</h3>
          <h2>₹ {total}</h2>
        </div>

        <div className="month-filter">
          <label>Select Month</label>
          <input
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          />
        </div>

      </div>

      <div className="transaction-list">
        <h3>
          {selectedMonth
            ? `Transactions - ${selectedMonth}`
            : "Transactions"}
        </h3>

        {filteredTransactions.length === 0 ? (
          <p className="no-data">No transactions found.</p>
        ) : (
          filteredTransactions.map((t) => (
            <div className="transaction-item" key={t.id}>
              <div>
                <p className="title">{t.title}</p>
                <p className="category">{t.category}</p>
                <p className="date">{t.date}</p>
              </div>

              <div className="right-side">
                <h4>₹ {t.amount}</h4>

                <button
                  className="view-btn"
                  onClick={() => navigate(`/expense/${t.id}`)}
                >
                  View
                </button>
              </div>
            </div>
          ))
        )}

      </div>

    </div>
  );
}