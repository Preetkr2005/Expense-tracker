import { Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Dashboard from "./pages/Dashboard";
import UploadCSV from "./pages/UploadCSV";
import Navbar from "./Components/Navbar";
import Transactions from "./pages/TransactionPage";
import TransactionDetails from "./pages/TansactionDetails";
import EditTransaction from "./pages/EditTransaction";

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
        <Route path="/edit-expense/:id" element={<EditTransaction />} />
        <Route path="/expense/:id" element={<TransactionDetails />} />
      </Routes>
    </>
  );
}

export default App;