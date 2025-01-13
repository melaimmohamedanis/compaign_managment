import React, { useState } from "react";
import Papa from "papaparse";
import InvoiceExemple from "./InvoiceExemple";

const  ReadCSV_exemple = () => {
  const [invoiceData, setInvoiceData] = useState({});
  const [items, setItems] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      complete: (results) => {
        parseCSV(results.data);
        console.log("csv_result",results.data)
      },
      error: (error) => {
        console.error("Error parsing CSV file:", error);
      },
    });
  };

  const parseCSV = (data) => {
    const metadata = {};
    const items = [];

    // Extract metadata
    data.forEach((line) => {
      if (line.length === 2 && line[0].endsWith(":")) {
        const key = line[0].replace(":", "").trim();
        const value = line[1].trim();
        metadata[key] = value;
      }
    });

    // Extract headers and rows
    const headersIndex = data.findIndex((line) => line.includes("Item Name"));
    if (headersIndex >= 0) {
      const headers = data[headersIndex];
      const rows = data.slice(headersIndex + 1);

      rows.forEach((row) => {
        const item = {};
        headers.forEach((header, index) => {
          item[header.trim()] = row[index]?.trim();
        });
        items.push(item);
      });
    }

    setInvoiceData(metadata);
    setItems(items);
  };
  console.log("invoiceData",invoiceData)

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-bold mb-4">CSV Reader with PapaParse</h1>
        <input
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          className="mb-4 p-2 border rounded"
        />
        {Object.keys(invoiceData).length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold">Invoice Details</h2>
            <ul className="list-disc list-inside">
              {Object.entries(invoiceData).map(([key, value]) => (
                <li key={key}>
                  <strong>{key}:</strong> {value}
                </li>
              ))}
            </ul>
          </div>
        )}
        {items.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold mb-2">Items</h2>
            <table className="w-full border-collapse border">
              <thead>
                <tr className="bg-gray-100">
                  {Object.keys(items[0]).map((header) => (
                    <th
                      key={header}
                      className="border p-2 text-left font-semibold"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index} className="border-t">
                    {Object.values(item).map((value, idx) => (
                      <td key={idx} className="p-2 border">
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
    </div>
  );
};

export default ReadCSV_exemple;
