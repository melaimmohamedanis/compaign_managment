import React, { useState } from "react";

export default function UploadCSV  ({ onFileSelect })  {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const handleFileDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    validateFile(droppedFile);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    validateFile(selectedFile);
  };

  const validateFile = (file) => {
    if (file && file.type === "text/csv") {
      setFile(file);
      setError("");
      onFileSelect(file);//
    } else {
      setFile(null);
      setError("Only CSV files are allowed.");
    }
  };

  return (
 
    <div
      className="  flex items-center flex-col justify-center align-middle border-2 border-dashed border-gray-300 rounded-lg p-6 h-80 w-full max-w-xl text-center bg-white mx-auto mb-8"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleFileDrop}
    >
      <p className="text-gray-700 text-sm mb-4">
        Drag and drop your CSV file here, or click to upload.
      </p>
      <label
        htmlFor="file-upload"
        className="cursor-pointer inline-block bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Upload File
        <input
          id="file-upload"
          type="file"
          accept=".csv"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>
      {file && (
        <p className="mt-4 text-green-600 text-sm">File: {file.name}</p>
      )}
      {error && (
        <p className="mt-4 text-red-600 text-sm">{error}</p>
      )}
    </div>
   
  );
};

