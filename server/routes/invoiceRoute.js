import express, { request, response } from"express";
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

response.status(200).send(invoice_added)
    
    
} catch (error) {
    console.log(error)
}
})
router.put('/edit-campaign/:id',async(request,response)=>{
    try {
        const trimmedBody = trimKeys(request.body); 
        const id=request.body.invoice_id
        const invoice={
            invoiceNumber:trimmedBody.invoiceNumber,
            tax:trimmedBody.tax,
            company:trimmedBody.company,
            client:trimmedBody.client,
            items:trimmedBody.items
        }
        var invoice_updated = await Invoice.findByIdAndUpdate(
            { _id: id },
            {
              $set: invoice,
            }
          );
        
          return invoice_updated;
        
    } catch (error) {
        
    }
})
router.delete('/delete-campaign/:id',async(request,response)=>{
    console.log("invoice",request.params.id)
    try {
         const result = await Invoice.findByIdAndDelete(request.params.id);
         console.log('result',result)
         if (result) { response.status(200).send(`Invoice with ID ${request.params.id} deleted.`); }
          else { response.status(404).send('Invoice not found.'); } }
     catch (error) { response.status(500).send(`Server error.${error}`); }
})
router.get('/get-campaigns',async(request,response)=>{
    
    try {
        const compaigns=await Invoice.find()
    response.status(200).send(compaigns);
    }catch (error) { response.status(500).send(`Server error.${error}`); }
})
router.get('/get-one-compaign/:id',async(request,response)=>{
    
    try {
        const result = await Invoice.findById(request.params.id)
        console.log(result)
    if(result){
        return response.status(200).send(result)
    } else { response.status(404).send('Invoice not found'); }
    } catch (error) {
        response.status(500).send(`Server error.${error}`);
    }
   
})
export default router;