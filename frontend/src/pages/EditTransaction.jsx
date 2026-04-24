import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./EditTransaction.css";

export default function EditTransaction() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: ""
  });

  useEffect(() => {
    fetchExpense();
  }, []);

  const fetchExpense = async () => {
    const token = localStorage.getItem("access");

    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/api/expenses/${id}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setForm({
        title: res.data.title,
        amount: res.data.amount,
        category: res.data.category
      });

    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("access");

    try {
      await axios.patch(
        `http://127.0.0.1:8000/api/expenses/${id}/`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Updated Successfully");
      navigate(`/expense/${id}`);

    } catch (error) {
      console.log(error);
    }
  };

  return (
  <div className="edit-page">
    <div className="edit-box">
      <h1>Edit Transaction</h1>

      <form onSubmit={handleUpdate}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
        />

        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
        />

        <button type="submit">Update</button>
      </form>
    </div>
  </div>
);
}