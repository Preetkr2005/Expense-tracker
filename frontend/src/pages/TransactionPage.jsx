import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Transaction.css";

export default function AddTransaction() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const navigate = useNavigate();

  const handleAdd = async () => {
    const token = localStorage.getItem("access");

    try {
      await axios.post(
        "http://127.0.0.1:8000/api/expenses/",
        {
          title,
          amount,
          category
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Transaction Added");
      navigate("/dashboard");

    } catch (error) {
      console.log(error.response?.data || error);
      alert("Failed to Add Transaction");
    }
  };

 return (
  <div className="add-container">
    <div className="add-box">
      <h2>Add Transaction</h2>

      <input
        value={title}
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        value={amount}
        placeholder="Amount"
        onChange={(e) => setAmount(e.target.value)}
      />

      <input
        value={category}
        placeholder="Category"
        onChange={(e) => setCategory(e.target.value)}
      />

      <button onClick={handleAdd}>
        Add Transaction
      </button>
    </div>
  </div>
);
}