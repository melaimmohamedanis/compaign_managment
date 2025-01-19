import React, { useState } from 'react'
import UploadCSV from './UploadCSV'
import InvoiceExemple from './InvoiceExemple'
import { saveAs } from "file-saver";
import ReadCSV from './ReadCSV';
export default function InvoiceContainer() {
  const [file,setFile]=useState(null)
  const invoiceNumber="12345";
  const tax=10;
  const company=
  {  name: "Your Company",
    location: "123 Business St;City;Country",
    email: "support@yourcompany.com",
    phone: "+1 123-456-7890",
    pan: "ABCDE1234F",}
  ;
  const client={  
    name: "Client Name",
    location: "456 Client St; City; Country",
    email: "client@example.com"};
  const items=[
    { name: "Product A", quantity: 2, price: 50 },
    { name: "Product B", quantity: 1, price: 75 }
  ];
  const handleDownloadCSV = () => {
    const headers = ["Item Name", "Quantity", "Price"];
    const rows = items.map((item) => [item.name, item.quantity, item.price]);
    const csvContent = [
      `Invoice Number:,${invoiceNumber}`,
      `Tax:,${tax}`,
      `Company Name:,${company.name}`,
      `Company Location:,${company.location}`,
      `Company Email:,${company.email}`,
      `Company Phone:,${company.phone}`,
      `Company PAN:,${company.pan}`,
      `Client Name:,${client.name}`,
      `Client Location:,${client.location}`,
      `Client Email:,${client.email}`,
      "",
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, `invoice_${invoiceNumber}.csv`);
  };
  return (
    
    <div>
      
        <h1 className='text-lg text-gray-700 flex justify-center items-center '>Upload a CSV file containing your campaign data. Ensure it includes valid PAN Card Numbers</h1>
    <h1 className='text-lg text-gray-700 flex justify-center items-center ' >CSV Format should be like this :</h1>
    <div className="flex items-center justify-center ">
      <button
        onClick={handleDownloadCSV}
        className="px-4 py-2 bg-blue-700 text-white font-bold rounded hover:bg-blue-600"
      >
        Download CSV Template
      </button>
    </div>
    <div className=" ">
      <div className="min-h-screen grid grid-cols-2 gap-4 bg-gray-100">
      
         <InvoiceExemple
                 invoiceNumber={invoiceNumber}
                 company={company}
                 client={client}
                 items={items}
                 tax={tax}
                 />
                
           
                 <ReadCSV/>
                 
      </div>
    </div>
        
    </div>
  )
}
