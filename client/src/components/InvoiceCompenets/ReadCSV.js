import React, { useState } from "react";
import Papa from "papaparse";
import UploadCSV from "./UploadCSV";
import InvoiceExemple from "./InvoiceExemple";
import { addInvoice } from "../Api/InvoiceApi";

export default function ReadCSV() {
 const [invoiceData, setInvoiceData] = useState({});
 const [message,setMessage]=useState('')
   const [items1, setItems1] = useState([]);
    const [file, setFile] = useState(null);
 //console.log("invoicedata",invoiceData['Company Location']);
// console.log("items",items1);
   const handleFileUpload = (file) => {
    // const file = event.target.files[0];
   // console.log("file",file)
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


//console.log("items",items1)

const handleAdd=()=>{
  try {
    addInvoice({ invoiceNumber,
      tax,
      company,
      client,
      items})
      setMessage("Upload  Successfly ")
  } catch (error) {
    setMessage(error.message)
    
  }
  
}
console.log('message',message)
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

                  {message===""?
                 <button onClick={()=>handleAdd()} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Upload your Invoice</button>
              : message
                }
                 </div>
                 )}  


 </div>
   );
 
}
