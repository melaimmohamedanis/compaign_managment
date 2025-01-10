import React from 'react'
import UploadCSV from './UploadCSV'
import InvoiceExemple from './InvoiceExemple'

export default function InvoiceContainer() {
  const invoiceNumber="12345";
  const company=
  {  name: "Your Company",
    location: "123 Business St, City, Country",
    email: "support@yourcompany.com",
    phone: "+1 123-456-7890",
    pan: "ABCDE1234F",}
  ;
  const client={  
    name: "Client Name",
    location: "456 Client St, City, Country",
    email: "client@example.com"};
  const items=[
    { name: "Product A", quantity: 2, price: 50 },
    { name: "Product B", quantity: 1, price: 75 }
  ];
  const tax=10;
  return (
    <div>
        <UploadCSV/>
        <h1 className='text-lg text-gray-700 flex justify-center items-center '>Upload a CSV file containing your campaign data. Ensure it includes valid PAN Card Numbers</h1>
    <h1 className='text-lg text-gray-700 flex justify-center items-center ' >CSV Format should be like this :</h1>
   
          <InvoiceExemple
                 invoiceNumber={invoiceNumber}
                 company={company}
                 client={client}
                 items={items}
                 tax={tax}
                 />
    </div>
  )
}
