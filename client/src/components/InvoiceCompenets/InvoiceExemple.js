import React from 'react'

export default function InvoiceExemple({ invoiceNumber, company, client, items, tax }) {
    const subtotal = items.reduce((acc, item) => acc + item.quantity * item.price, 0);
  const taxAmount = (subtotal * tax) / 100;
  const total = subtotal + taxAmount;
  return (
    <div className="invoice">
         <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl mx-auto">
    <div className="flex justify-between items-center border-b pb-6 mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-700">Invoice</h1>
        <p className="text-sm text-gray-500">Invoice #{invoiceNumber}</p>
      </div>
      <div>
        <h2 className="text-lg font-bold text-gray-700">Your Company</h2>
        <p className="text-sm text-gray-500">{company.location}</p>
        <p className="text-sm text-gray-500">Email: {company.email}</p>
        <p className="text-sm text-gray-500">Phone: {company.phone}</p>
        <p className="text-sm text-gray-500">Invoice Number: {company.pan}</p>
      </div>
    </div>
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-700 mb-2">Bill To:</h3>
      <p className="text-sm text-gray-500">{client.name}</p>
      <p className="text-sm text-gray-500">{client.location}</p>
      <p className="text-sm text-gray-500">Email: {client.email}</p>
    </div>
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-gray-100">
          <th className="text-left text-sm font-semibold text-gray-600 p-4">Item</th>
          <th className="text-right text-sm font-semibold text-gray-600 p-4">Quantity</th>
          <th className="text-right text-sm font-semibold text-gray-600 p-4">Price</th>
          <th className="text-right text-sm font-semibold text-gray-600 p-4">Total</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item,index)=>(
        <tr key={index} className="border-t">
          <td className="p-4 text-sm text-gray-700">{item.name}</td>
          <td className="p-4 text-sm text-right text-gray-700">{item.quantity}</td>
          <td className="p-4 text-sm text-right text-gray-700">${item.price}</td>
          <td className="p-4 text-sm text-right text-gray-700">${item.quantity*item.price}</td>
        </tr>
      ))}
      </tbody>
      <tfoot>
        <tr className="border-t">
          <td colspan="3" className="p-4 text-sm text-right font-semibold text-gray-700">Subtotal:</td>
          <td className="p-4 text-sm text-right text-gray-700">${subtotal}</td>
        </tr>
        <tr>
          <td colspan="3" className="p-4 text-sm text-right font-semibold text-gray-700">Tax ({tax}%):</td>
          <td className="p-4 text-sm text-right text-gray-700">${taxAmount}</td>
        </tr>
        <tr className="border-t-2 border-gray-300">
          <td colspan="3" className="p-4 text-sm text-right font-bold text-gray-700">Total:</td>
          <td className="p-4 text-sm text-right font-bold text-gray-700">${total}</td>
        </tr>
      </tfoot>
    </table>
    <div className="mt-6 text-sm text-gray-500">
      <p>Thank you for your business! Please make payment by the due date.</p>
      <p className="mt-2">If you have any questions, contact us at {company.email}.</p>
    </div>
  </div>

    </div>
  )
}
