import { Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Dashboard from "./pages/Dashboard";
import UploadCSV from "./pages/UploadCSV";
import Navbar from "./Components/Navbar";
import Transactions from "./pages/TransactionPage";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/upload" element={<UploadCSV />} />
      </Routes>
    </>
  );
}

export default App;