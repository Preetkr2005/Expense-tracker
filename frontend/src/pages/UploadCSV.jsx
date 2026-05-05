import { useState } from "react";
import axios from "axios";
import "./UploadCSV.css";
import { useNavigate } from "react-router-dom"; 

export default function UploadCSV({ onUploadSuccess }) {
  const [file, setFile] = useState(null);

  const navigate = useNavigate();

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first");
      return;
    }

    const formData = new FormData();
    formData.append("file", file); //IMPORTANT KEY

    const token = localStorage.getItem("access");

    try {
      await axios.post(
        "http://127.0.0.1:8000/api/expenses/upload_csv/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`
          },
        }
      );

      alert("Uploaded Successfully");

      navigate("/dashboard");

      // refresh dashboard
      if (onUploadSuccess) {
        onUploadSuccess();
      }

    } catch (err) {
      console.error(err);
      alert("Upload failed ");
    }
  };

  return (
    <div className="upload-container">
      <div className="upload-box">
        <h2>Upload CSV</h2>
        <p>Add your bank or expense file</p>

        <input
          type="file"
          accept=".csv"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button onClick={handleUpload}>
          Upload File
        </button>
      </div>
    </div>
  );
}