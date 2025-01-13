import mongoose from "mongoose";

const invoiceSchema=new mongoose.Schema({
    invoiceNumber:{
        type:String,
        require:true,
    },
    company:{
        name:{ type:String,
            require:true},
        location:{ type:String,
            require:true},
        phone:{ type:String,
            require:true},
        pan:{ type:String,
            require:true},
        email:{ type:String,
            require:true}
    },
    tax:{
        type:String,
        require:true,   
    },
    client:{
        name:{ type:String,
            require:true},
        location:{ type:String,
            require:true},
        email:{ type:String,
            require:true}
    },
   items:[
    {
        name:{ type:String,
               require:true},
        price:{ type:String,
                require:true},
        quantity:{ type:String,
                    require:true},
    }],
    approved:{
        type:Boolean,
        require:true,
        default:false
    }
},{timestamps:true});
const Invoice=mongoose.model('Invoice',invoiceSchema)
export default Invoice;