import express from"express";
import User from "../Models/UserModel.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config()
const router =express.Router();
router.post('/register',async (request,response)=>{
   // console.log("body",request.body)
    try {
        const regex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
        const regex_email=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const regex_password = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        
        if(!request.body.firstname || !request.body.lastname ||
             !request.body.email || !request.body.password || 
             !request.body.phone_number || !request.body.phone_number) {
                return response.status(400).send({
                    message:'Send all required fileds:firstname,lastname,email,password,phone number,PAN card number'
                })
            }else if(regex.test(request.body.pan_card_number)===false){
                return response.status(400).send({
                    message:'you need to put the correct PAN Card Number'
                })
                
            }
            else if(regex_email.test(request.body.email)===false){
                return response.status(400).send({
                    message:'you need to put a valid email'
                })
                
            }
            else if(regex_password.test(request.body.password)===false){
                return response.status(400).send({
                    message:'you need to put a password with 8 Caracters,1 Uppercase,1 Number,1 Special Caracter'
                })
                
            }
            else{
            const password= request.body.password 
            const newUser={
                firstname:request.body.firstname,
                lastname:request.body.lastname,
                email:request.body.email,
                password:bcrypt.hashSync(password,3),
                phone_number:request.body.phone_number,
                pan_card_number:request.body.pan_card_number,
            };
            try {
                const user=await User.create(newUser);
                return response.status(201).send(
                   { message:'User successflly register'}  );
            } catch (error) {
                return response.status(400).send({
                    message:error.message
                })
            }
           
          
        }
    } catch (error) {
       
        return response.status(400).send({
            message:error.message
        })
    }

})
router.post('/login',async(request,response)=>{
   
    const JWT_SECRET_KEY=process.env.JWT_SECRET_KEY;
    const ACCESS_TOKEN_TIME=process.env.ACCESS_TOKEN_TIME;
    
    const email=request.body.email;
    const password=request.body.password;
    console.log("password",password)
    console.log("email",email)
    try {
      const user=await User.findOne({email:email})
   
      if(!user || user==null || user==undefined){
        return response.status(400).send({message:"User does not exist try to Signup"})
      }
      else{
        const isMatch=bcrypt.compareSync(password,user.password);
        if(!isMatch){
          return response.status(400).send({message:"Password wrong"})
        }else{
          const accesstoken=jwt.sign({user},JWT_SECRET_KEY,{expiresIn:ACCESS_TOKEN_TIME});
         
          response.cookie("accesstoken",accesstoken,{
            expires:new Date(Date.now()+1000*20*60),
            httpOnly:true,
            sameSite:true,
            secure:false
          });

          
          return response.status(201).send(
            { user,accesstoken}  ); 

          
        }
         
      }
          
    } catch (error) {
      console.log("error",error)
    }

})
export default router;