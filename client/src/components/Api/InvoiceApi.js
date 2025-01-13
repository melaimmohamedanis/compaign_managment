import axios from 'axios';

const userapi=axios.create({
    baseURL:"http://localhost:5000"
});
export const addInvoice=async(invoice_data)=>{
    try {
        const response = await userapi.post("/addinvoice", invoice_data);
    } catch (error) {
        
    }
}
