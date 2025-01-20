import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from"cors";
import cookieParser from "cookie-parser";
import { database } from "./db.js";
import userRoute from './routes/userRoute.js'
import invoiceRoute from './routes/invoiceRoute.js'
dotenv.config()
database();
const app =express();
app.use(cookieParser())
app.use(express.json());
app.use(cors(
{
origin: process.env.CLIENT_URL,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}
));

app.get('/', (req, res) => {
    res.send('Server working !');
  });
  
  app.use("/",userRoute);
  app.use('/',invoiceRoute)


app.listen(process.env.PORT,()=>{console.log('server listening on port 5000')})