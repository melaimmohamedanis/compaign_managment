import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();


export const database=()=>{
    mongoose.connect(`${process.env.MONGOURL}`);
    mongoose.connection.once('open',()=>{
        console.log(('database connected 👌'))
    })
}