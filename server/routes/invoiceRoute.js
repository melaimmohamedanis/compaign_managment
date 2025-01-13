import express from"express";
import Invoice from "../Models/InvoiceModel.js";
const router =express.Router();
function trimKeys(obj) { 
    if (Array.isArray(obj)) {
         return obj.map(trimKeys); }
          else if (obj !== null && typeof obj === 'object') { 
            return Object.fromEntries( Object.entries(obj).map(([key, value]) => 
                [key.trim(), trimKeys(value)]) ); } return obj; }
router.post('/upload-campaign',async (request,response)=>{
try {
    // Trim keys in the request body
     const trimmedBody = trimKeys(request.body);
      // Create a new invoice with the trimmed body 
      //const newInvoice = new Invoice(trimmedBody);
/*
    const invoice={
     invoiceNumber:request.body.invoiceNumber,
     tax:request.body.tax,
     company:request.body.company,
     client:request.body.client,
     items:request.body.items
}
*/
const invoice={
    invoiceNumber:trimmedBody.invoiceNumber,
    tax:trimmedBody.tax,
    company:trimmedBody.company,
    client:trimmedBody.client,
    items:trimmedBody.items
}

//console.log("invoice",trimmedBody)
const invoice_added=await Invoice.create(invoice)

return invoice_added
    
    
} catch (error) {
    console.log(error)
}
})
export default router;