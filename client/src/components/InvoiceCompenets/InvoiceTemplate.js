import React from 'react'

export default function InvoiceTemplate() {
  return (
   <div>
    <h1 className='text-lg text-gray-700 flex justify-center items-center '>Upload a CSV file containing your campaign data. Ensure it includes valid PAN Card Numbers</h1>
    <h1 className='text-lg text-gray-700 flex justify-center items-center ' >CSV Format should be like this :</h1>
    {/* Tempalate Format */}
    <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl mx-auto">
    <div className="flex justify-between items-center border-b pb-6 mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-700">Invoice</h1>
        <p className="text-sm text-gray-500">Invoice #12345</p>
      </div>
      <div>
        <h2 className="text-lg font-bold text-gray-700">Your Company</h2>
        <p className="text-sm text-gray-500">123 Business St, City, Country</p>
        <p className="text-sm text-gray-500">Email: support@yourcompany.com</p>
        <p className="text-sm text-gray-500">Phone: +1 123-456-7890</p>
        <p className="text-sm text-gray-500">Invoice Number: ABCDE1234F</p>
      </div>
    </div>
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-700 mb-2">Bill To:</h3>
      <p className="text-sm text-gray-500">Client Name</p>
      <p className="text-sm text-gray-500">456 Client St, City, Country</p>
      <p className="text-sm text-gray-500">Email: client@example.com</p>
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
        <tr className="border-t">
          <td className="p-4 text-sm text-gray-700">Product A</td>
          <td className="p-4 text-sm text-right text-gray-700">2</td>
          <td className="p-4 text-sm text-right text-gray-700">$50</td>
          <td className="p-4 text-sm text-right text-gray-700">$100</td>
        </tr>
        <tr className="border-t">
          <td className="p-4 text-sm text-gray-700">Product B</td>
          <td className="p-4 text-sm text-right text-gray-700">1</td>
          <td className="p-4 text-sm text-right text-gray-700">$75</td>
          <td className="p-4 text-sm text-right text-gray-700">$75</td>
        </tr>
      </tbody>
      <tfoot>
        <tr className="border-t">
          <td colspan="3" className="p-4 text-sm text-right font-semibold text-gray-700">Subtotal:</td>
          <td className="p-4 text-sm text-right text-gray-700">$175</td>
        </tr>
        <tr>
          <td colspan="3" className="p-4 text-sm text-right font-semibold text-gray-700">Tax (10%):</td>
          <td className="p-4 text-sm text-right text-gray-700">$17.50</td>
        </tr>
        <tr className="border-t-2 border-gray-300">
          <td colspan="3" className="p-4 text-sm text-right font-bold text-gray-700">Total:</td>
          <td className="p-4 text-sm text-right font-bold text-gray-700">$192.50</td>
        </tr>
      </tfoot>
    </table>
    <div className="mt-6 text-sm text-gray-500">
      <p>Thank you for your business! Please make payment by the due date.</p>
      <p className="mt-2">If you have any questions, contact us at support@yourcompany.com.</p>
    </div>
  </div>
  </div>
  )
}
