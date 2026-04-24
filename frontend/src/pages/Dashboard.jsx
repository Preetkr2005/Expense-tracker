import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Dashboard.css";

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const navigate = useNavigate();

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

  const total = transactions.reduce(
    (sum, t) => sum + Number(t.amount),
    0
  );

  return (
    <div className="dashboard">

      <div className="total-card">
        <h3>Total Spending</h3>
        <h2>₹ {total}</h2>
      </div>

      <div className="transaction-list">
        <h3>Recent Transactions</h3>

        {transactions.map((t) => (
          <div className="transaction-item" key={t.id}>
            <div>
              <p className="title">{t.title}</p>
              <p className="category">{t.category}</p>
            </div>

            <h4>₹ {t.amount}
              <br />
              <br />
              <button
        className="view-btn"
        onClick={() => navigate(`/expense/${t.id}`)}
      >
        View
      </button>
            </h4>
          </div>
        ))}

         

      </div>

    </div>
  );
}