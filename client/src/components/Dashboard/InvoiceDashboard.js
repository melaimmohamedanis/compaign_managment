import React, { useState } from "react";
import { getInvoice, getoneInvoice } from "../Api/InvoiceApi";
import { useQuery } from "@tanstack/react-query";
import Modal from 'react-modal';
import InvoiceExemple from "../InvoiceCompenets/InvoiceExemple";
import html2pdf from 'html2pdf.js';
import ReactDOM from 'react-dom/client';
import { createRoot } from 'react-dom/client';
import { useNavigate } from "react-router-dom";


const generatePDF1 = (invoiceData) => {
    const element = document.createElement('div');
    document.body.appendChild(element);
    const root = ReactDOM.createRoot(element); // or ReactDOM.render for older React versions
    root.render(<InvoiceExemple {...invoiceData} />);
  
    setTimeout(() => {
      const pdfElement = element.querySelector('.invoice');
      if (!pdfElement) {
        console.error('Error: .invoice element not found');
        return;
      }
  
      html2pdf().from(pdfElement).save();
      root.unmount();
      document.body.removeChild(element);
    }, 100); // Adjust delay as needed
  };    
const InvoiceDashboard = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false); 
    const [invoiceData, setInvoiceData] = useState(null);
    const { data, isLoading,  isError } = useQuery({ queryKey: ["invoices"],
        queryFn:getInvoice});
      console.log('invoices',data)
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("Last 30 days");

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    setDropdownOpen(false);
  };

  const filters = [
    "Last day",
    "Last 7 days",
    "Last 30 days",
    "Last month",
    "Last year",
  ];
  const customStyles = { content: { top: '0', left: '0', right: '0', bottom: '0', margin: '0', padding: '20px', backgroundColor: '#fff', borderRadius: '0', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', }, overlay: { backgroundColor: 'rgba(0, 0, 0, 0.75)', }, };
const navigate=useNavigate()
  const handleEdit = async (invoiceId) => {
     console.log('Editing invoice', invoiceId);
     navigate(`/dashboard/invoices/${invoiceId}`,{replace:true})
      }; 
     const handleDelete = async (invoiceId) => {
         console.log('Deleting invoice', invoiceId); 
        // Add your delete logic here
         };
const closeModal = () => { setModalIsOpen(false); setInvoiceData(null); };
const handleDownload=async(invoice_id)=>{
    console.log('invoice_id',invoice_id)
    const OneInvoice=await getoneInvoice(invoice_id)
    generatePDF1(OneInvoice);
}
const handleView=async(invoice_id)=>{
    console.log('hello',invoice_id)
    const OneInvoice=await getoneInvoice(invoice_id)
    console.log('OneInvoice',OneInvoice)
    setInvoiceData(OneInvoice);
    setModalIsOpen(true)
}
    
if (isLoading) return <div>Loading...</div>; if (isError) return <div>Error: {isError.message}</div>;
  return (
    <div className=" shadow-md sm:rounded-lg">
      <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
        <div>
          <button
            onClick={toggleDropdown}
            className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5"
          >
            {selectedFilter}
            <svg
              className="w-2.5 h-2.5 ms-2.5"
              aria-hidden="true"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>
          {dropdownOpen && (
            <div className="absolute z-10 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow">
              <ul className="p-3 space-y-1 text-sm text-gray-700">
                {filters.map((filter, index) => (
                  <li key={index}>
                    <div
                      className="flex items-center p-2 rounded hover:bg-gray-100"
                      onClick={() => handleFilterChange(filter)}
                    >
                      <input
                        type="radio"
                        name="filter-radio"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                        checked={selectedFilter === filter}
                        readOnly
                      />
                      <label className="ms-2 text-sm font-medium text-gray-900">
                        {filter}
                      </label>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="relative">
          <input
            type="text"
            id="table-search"
            className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search for items"
          />
        </div>
      </div>
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            
            <th className="px-6 py-3">Invoice number</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3">Date Created</th>
            <th className="px-6 py-3">Download PDF</th>
            <th className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {data && data.map((item, index) => (
            <tr key={index} className="bg-white border-b hover:bg-gray-50">
             
              <th className="px-6 py-4 font-medium text-gray-900">
                {item.invoiceNumber}
              </th>
              {item.approved===false ?
              <td className="px-6 py-4">
        False
              </td>:
               <td className="px-6 py-4">
               True
                     </td>
              }
              <td className="px-6 py-4">{item.updatedAt}</td>
              <td className="px-6 py-4">
              <button onClick={() =>handleDownload(item._id)} className="font-medium text-blue-600 hover:underline">
                 Download PDF
                </button>
              </td>
              <td className="px-6 py-4">
              <button onClick={() =>handleView(item._id)} className="font-medium text-blue-600 hover:underline">
                 View
                </button>
              </td>
              <td className="px-6 py-4">
              <button onClick={() =>handleEdit(item._id)} className="font-medium text-blue-600 hover:underline">
                 Edit
                </button>
              </td>
              <td className="px-6 py-4">
              <button onClick={() =>handleView(item._id)} className="font-medium text-red-600 hover:underline">
                Delete
                </button>
              </td>
              
            </tr>
          ))}
        </tbody>
      </table>
     
      <Modal style={customStyles}
       isOpen={modalIsOpen} 
       onRequestClose={closeModal} 
       contentLabel="Invoice Modal">
     

      <button onClick={closeModal} class="   text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm  mx-auto w-16 py-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Close</button>

         {invoiceData && <InvoiceExemple {...invoiceData} />} 
      </Modal>
     
    </div>
  );
};

export default InvoiceDashboard;
