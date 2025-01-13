import React, { useState } from "react";
import Papa from "papaparse";
import UploadCSV from "./UploadCSV";
import InvoiceExemple from "./InvoiceExemple";

export default function ReadCSV() {
 const [invoiceData, setInvoiceData] = useState({});
   const [items1, setItems1] = useState([]);
    const [file, setFile] = useState(null);
 //console.log("invoicedata",invoiceData['Company Location']);
 console.log("items",items1);
   const handleFileUpload = (file) => {
    // const file = event.target.files[0];
    console.log("file",file)
     if (!file) return;
    setFile(file)
     Papa.parse(file, {
       complete: (results) => {
         parseCSV(results.data);
      //   console.log("csv_result",results.data)
       },
       error: (error) => {
         console.error("Error parsing CSV file:", error);
       },
     });
   };
 
   const parseCSV = (data) => {
     const metadata = {};
     const items1 = [];
 
     // Extract metadata
     data.forEach((line) => {
       if (line.length === 2 && line[0].endsWith(":")) {
         const key = line[0].replace(":", "").trim();
       //  console.log('key',key)
         const value = line[1].trim();
        // console.log('value',value)
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
         items1.push(item);
       });
     }
 
     setInvoiceData(metadata);
     setItems1(items1);
   };
  // console.log("invoiceData",invoiceData['Company Location'])
   
//put inoiceData in correct objects:'
const invoiceNumber=invoiceData['Invoice Number'];
const tax=invoiceData['Tax'];
const company=
{  name: invoiceData['Company Name'],
  location: invoiceData['Company Location'],
  email: invoiceData['Company Email'],
  phone: invoiceData['Company Phone'],
  pan: invoiceData['Company PAN'],}
;
const client={  
  name: invoiceData['Client Name'],
  location: invoiceData['Client Location'],
  email: invoiceData['Client Email']};
  const items = items1.map(item => ({
        name: item["Item Name"],
        quantity: parseInt(item.Quantity),
        price: parseFloat(item.Price)
    }));


console.log("items",items1)



   return (
   <div className=""> 
  {file ===null ?(
    <div className='flex justify-center  items-center '>
                   
                      <UploadCSV 
              onFileSelect={handleFileUpload} />
                     </div>
            ):(
                <div className="w-full h-full"> 
             <InvoiceExemple
               invoiceNumber={invoiceNumber}
               company={company}
               client={client}
               items={items}
               tax={tax}
                 />
                 </div>
                 )}  


 </div>
   );
 
}
