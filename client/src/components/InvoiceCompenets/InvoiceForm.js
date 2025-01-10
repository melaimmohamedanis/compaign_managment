import React, { useState } from "react";
import InvoiceExemple from "./InvoiceExemple";

const InvoiceForm = () => {
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [company, setCompany] = useState({
    name: "",
    location: "",
    email: "",
    phone: "",
    pan: "",
  });
  const [client, setClient] = useState({
    name: "",
    location: "",
    email: "",
  });
  const [items, setItems] = useState([{ name: "", quantity: 1, price: 0 }]);
  const [tax, setTax] = useState(0);
  const [totals, setTotals] = useState({ subtotal: 0, total: 0 });
console.log(items)
  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = field === "quantity" || field === "price" ? parseFloat(value) || 0 : value;
    setItems(updatedItems);
    updateTotals(updatedItems, tax);
  };

  const handleCompanyChange = (field, value) => {
    setCompany({ ...company, [field]: value });
  };

  const handleClientChange = (field, value) => {
    setClient({ ...client, [field]: value });
  };

  const updateTotals = (items, taxRate) => {
    const subtotal = items.reduce((sum, item) => sum + item.quantity * item.price, 0);
    const totalTax = (subtotal * taxRate) / 100;
    const total = subtotal + totalTax;
    setTotals({ subtotal, total });
  };

  const addItem = () => {
    setItems([...items, { name: "", quantity: 1, price: 0 }]);
  };

  const removeItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
    updateTotals(updatedItems, tax);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const invoiceData = {
      invoiceNumber,
      company,
      client,
      items,
      tax,
      totals,
    };
    console.log(invoiceData);
    alert("Invoice submitted successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6 space-y-6">
        {/* Invoice Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Invoice Number</label>
          <input
            type="text"
            value={invoiceNumber}
            onChange={(e) => setInvoiceNumber(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Company and Client Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Company Details */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Company</h3>
            {["name", "location", "email", "phone", "pan"].map((field) => (
              <div key={field} className="mb-4">
                <label className="block text-sm font-medium text-gray-700 capitalize">{field}</label>
                <input
                  type="text"
                  value={company[field]}
                  onChange={(e) => handleCompanyChange(field, e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            ))}
          </div>

          {/* Client Details */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Client</h3>
            {["name", "location", "email"].map((field) => (
              <div key={field} className="mb-4">
                <label className="block text-sm font-medium text-gray-700 capitalize">{field}</label>
                <input
                  type="text"
                  value={client[field]}
                  onChange={(e) => handleClientChange(field, e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Items and Tax */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700">Items</h3>
          {items.map((item, index) => (
            <div key={index} className="flex items-center space-x-4 mb-2">
              <input
                type="text"
                placeholder="Item Name"
                value={item.name}
                onChange={(e) => handleItemChange(index, "name", e.target.value)}
                className="flex-grow px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              <input
                type="number"
                placeholder="Quantity"
                value={item.quantity}
                onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              <input
                type="number"
                placeholder="Price"
                value={item.price}
                onChange={(e) => handleItemChange(index, "price", e.target.value)}
                className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              <button
                type="button"
                onClick={() => removeItem(index)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addItem}
            className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
          >
            Add Item
          </button>
        </div>
        <div  className="mb-4">
                <label className="block text-sm font-medium text-gray-700 capitalize">Tax</label>
                <input
                  type="text"
                  value={tax}
                  onChange={(e) => setTax(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
        {/* Tempalate Format */}
       
        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className=" bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Submit Invoice
          </button>
        </div>
      </form>
      <div>
        <InvoiceExemple
         invoiceNumber={invoiceNumber}
         company={company}
         client={client}
         items={items}
         tax={tax}
         />
      </div>
    </div>
  );
};

export default InvoiceForm;
