import axios from 'axios';

const invoiceapi=axios.create({
    baseURL:"http://localhost:5000"
});
export const addInvoice=async(invoice_data)=>{
    try {
        const response = await invoiceapi.post("/addinvoice", invoice_data);
    } catch (error) {
        
    }
}

export const deleteInvoice=async(invoice_id)=>{
    try {
        const response = await invoiceapi.delete("/delete-campaign", invoice_id);

    } catch (error) {
        
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
        console.log("data",response.data)
        if(response.data){
        
        return response.data
    }
    return{ message:"something went wrong"}
    } catch (error) {
       
         console.log(error);
    }
}

