import { Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Dashboard from "./pages/Dashboard";
import UploadCSV from "./pages/UploadCSV";
import Navbar from "./Components/Navbar";
import Transactions from "./pages/TransactionPage";
import TransactionDetails from "./pages/TansactionDetails";
import EditTransaction from "./pages/EditTransaction";
import PrivateRoute from "./pages/PrivateRoute";
import OTPPage from "./pages/OtpPage";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element=
        {<PrivateRoute>
          <Dashboard />
          </PrivateRoute>} />
        <Route path="/transactions" element={
          <PrivateRoute>
          <Transactions />
          </PrivateRoute>} />
        <Route path="/upload" element={
          <PrivateRoute>
          <UploadCSV />
          </PrivateRoute>} />
        <Route path="/edit-expense/:id" element={<EditTransaction />} />
        <Route path="/expense/:id" element={<TransactionDetails />} />
        <Route path="/otp" element={<OTPPage />} />
      </Routes>
    </>
  );
}

export default App;