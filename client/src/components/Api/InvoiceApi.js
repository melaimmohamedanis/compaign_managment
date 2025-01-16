import axios from 'axios';

const invoiceapi=axios.create({
    baseURL:"http://localhost:5000"
});
export const addInvoice=async(invoice_data)=>{
    try {
        const response = await invoiceapi.post("/addinvoice", invoice_data);
        return response.data
    } catch (error) {
        
    }
}

export const deleteInvoice=async(invoice_id)=>{
    try {
        const response = await invoiceapi.delete(`/delete-campaign/${invoice_id}`);
        return alert('Invoice successflly deleted')

    } catch (error) {
        alert('Invoice not found. Please check the invoice ID and try again.');
        
    }
}
export const getInvoice=async()=>{
    try {
        const response = await invoiceapi.get("/get-campaigns",{ withCredentials: true });
        console.log("data",response.data)
        if(response.data){
        
        return response.data
    }
    return{ message:"something went wrong"}
    } catch (error) {
       
        throw error;
    }
}
export const getoneInvoice=async(invoice_id)=>{
    console.log('invoiceapi',invoice_id)
    try {
        const response = await invoiceapi.get(`/get-one-compaign/${invoice_id}`,{ withCredentials: true });
        console.log("oneinvoice",response.data)
        if(response.data){
        
        return response.data
    }
    return{ message:"something went wrong"}
    } catch (error) {
       
         console.log(error);
    }
}
export const update_invoice=async(invoiceId, updatedInvoiceData)=>{
    console.log('invoiceId',invoiceId)
    try { const response = await invoiceapi.put(`/edit-campaign/${invoiceId}`, updatedInvoiceData); 
   
    console.log('Invoice updated successfully:', response.data); 
    // You can handle additional success actions here, such as updating the state or redirecting the user 
    }
     catch (error) { 

        if (error.response) {
             switch (error.response.status) {
                 case 404: console.error('Invoice not found');
                  alert('Invoice not found. Please check the invoice ID and try again.');
                   break; 
                   case 400: console.error('Validation error:', error.response.data); 
                   alert(`Validation error: ${error.response.data}`); 
                   break;
                    default: console.error('Error updating invoice:', error.response.data);
                     alert(`Error updating invoice: ${error.response.data}`); } } 
                     else { console.error('Network error or server is down:', error.message); 
            alert('Network error or server is down. Please try again later.'); } 
        }
}


