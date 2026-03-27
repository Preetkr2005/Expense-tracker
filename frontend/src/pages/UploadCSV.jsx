import { useState } from "react";
import "./UploadCSV.css"

export default function UploadCSV() {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    alert("Uploaded");
  };

  return (
  <div className="upload-container">

    <div className="upload-box">
      <h2>Upload CSV</h2>
      <p>Add your bank or expense file</p>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button onClick={handleUpload}>
        Upload File
      </button>
    </div>

  </div>
);
}