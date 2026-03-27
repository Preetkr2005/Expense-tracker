import { useState } from "react";
import axios from "axios";
import "./Transaction.css";

export default function AddTransaction() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  const handleAdd = async () => {
    await axios.post("http://localhost:5000/add", {
      title,
      amount,
    });

    alert("Transaction Added");
  };

  return (
    <div className="add-container">

      <div className="add-box">
        <h2>Add Transaction</h2>

        <input
          placeholder="Transaction Title"
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          placeholder="Amount"
          onChange={(e) => setAmount(e.target.value)}
        />

        <button onClick={handleAdd}>
          Add Transaction
        </button>
      </div>

    </div>
  );
}