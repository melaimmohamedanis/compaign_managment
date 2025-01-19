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
    const { invoiceNumber, company, tax, client, items } = trimKeys(request.body); 
console.log('invoiceNumber',invoiceNumber)
     if (!invoiceNumber || !company || !tax || !client || !items ) {
        return response.status(400).send('All required fields must be provided.'); }
    if (!company.name || !company.location || !company.phone || !company.pan || !company.email) 
       { return response.status(400).send('Company fields must all be provided.'); }
     if (!client.name || !client.location || !client.email)
        { return response.status(400).send('Client fields must all be provided.'); }
      for (let item of items) { 
       if (!item.name || !item.price || !item.quantity)
            { return response.status(400).send('Each item must have a name, price, and quantity.'); } }
  
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
    invoiceNumber,
    tax,
    company,
    client,
    items
}

//console.log("invoice",trimmedBody)
const invoice_added=await Invoice.create(invoice)

response.status(200).send(invoice_added)
    
    
} catch (error) {
    console.log(error)
}
})
router.put('/edit-campaign/:id',async(request,response)=>{
    const { invoiceNumber, company, tax, client, items, approved } = trimKeys(request.body); 
    const id=request.params
    console.log(id)
    if (!id) return response.status(404).send('Invoice not found');
    if (!invoiceNumber || !company || !tax || !client || !items || approved === undefined) {
         return response.status(400).send('All required fields must be provided.'); }
     if (!company.name || !company.location || !company.phone || !company.pan || !company.email) 
        { return response.status(400).send('Company fields must all be provided.'); }
      if (!client.name || !client.location || !client.email)
         { return response.status(400).send('Client fields must all be provided.'); }
       for (let item of items) { 
        if (!item.name || !item.price || !item.quantity)
             { return response.status(400).send('Each item must have a name, price, and quantity.'); } }
    try {
     
        var invoice_updated = await Invoice.findByIdAndUpdate(
            { _id: id.id},
            {
              $set: trimKeys(request.body),
            }
          );
          if (!invoice_updated) return response.status(404).send('Invoice not found');
         
        
          return response.status(200).send(invoice_updated);
        
    } catch (error) {
        response.status(500).send(error.message);
    }
})
router.delete('/delete-campaign/:id',async(request,response)=>{
    console.log("invoice",request.params.id)
    try {
         const result = await Invoice.findByIdAndDelete(request.params.id);
      //   console.log('result',result)
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
       // console.log(result)
    if(result){
        return response.status(200).send(result)
    } else { response.status(404).send('Invoice not found'); }
    } catch (error) {
        response.status(500).send(`Server error.${error}`);
    }
   
})
export default router;