// ExpenseDetails.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./TransactionDetails.css";

export default function TransactionDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [expense, setExpense] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExpense();
  }, []);

  const fetchExpense = async () => {
    try {
      const token = localStorage.getItem("access");

      const response = await axios.get(
        `http://127.0.0.1:8000/api/expenses/${id}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setExpense(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this transaction?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("access");

      await axios.delete(
        `http://127.0.0.1:8000/api/expenses/${id}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Transaction Deleted");
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) return <h2>Loading...</h2>;

  if (!expense) return <h2>Transaction not found</h2>;

  return (
    <div className="details-container">
      <h1>Transaction Details</h1>

      <div className="card">
        <p><strong>Title:</strong> {expense.title}</p>
        <p><strong>Amount:</strong> ₹{expense.amount}</p>
        <p><strong>Category:</strong> {expense.category}</p>
        <p><strong>Description:</strong> {expense.description}</p>
        <p><strong>Date:</strong> {expense.date}</p>
      </div>

      <div className="buttons">
        <button
          className="edit-btn"
          onClick={() => navigate(`/edit-expense/${id}`)}
        >
          Edit
        </button>

        <button
          className="delete-btn"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
}