import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from"cors";
import { database } from "./db.js";
import signupRoute from './routes/signupRoute.js'
dotenv.config()
database();
const app =express();
app.use(express.json());
app.use(cors(
{
origin: 'http://localhost:3000',
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}
));
app.get('/', (req, res) => {
    res.send('Server working !');
  });
  app.use("/",signupRoute);


app.listen(5000,()=>{console.log('server listening on port 5000')})