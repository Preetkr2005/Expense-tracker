import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <div className="navbar">

      <h3 className="logo">ExpenseTracker</h3>

      <div className="nav-links">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/transactions">Transactions</Link>
        <Link to="/upload">Upload CSV</Link>
        <Link to="/">Login</Link>
        <Link to="/signup">Signup</Link>
      </div>

    </div>
  );
}