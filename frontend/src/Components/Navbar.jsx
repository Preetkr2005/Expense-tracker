import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("access");
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("username");

    navigate("/");
  };

  return (
    <div className="navbar">

      <h3 className="logo">ExpenseTracker</h3>

      <div className="nav-links">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/transactions">Transactions</Link>
        <Link to="/upload">Upload CSV</Link>

        {token ? (
          <>
            <span className="user-name">{username}</span>
            <button className="logout-btn" onClick={handleLogout}>
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Link to="/">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>

    </div>
  );
}