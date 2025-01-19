import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();


export const database=()=>{
    mongoose.connect(`${process.env.MONGOURL}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    mongoose.connection.once('open',()=>{
        console.log(('database connected 👌'))
    })
}