import express from"express";
import User from "../Models/UserModel.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config()
const router =express.Router();
router.post('/register',async (request,response)=>{
    console.log("body",request.body.email)
    try {
        const regex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
        const regex_email=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const regex_password = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      //  console.log(regex_email.test(request.body.email))
      
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
                const existingUser = await User.findOne({ email:request.body.email });
                if (existingUser) {
                  return res
                    .status(400)
                    .send({ message: "User with the same email already exists" });
                } 
            const password= request.body.password 
          
            const newUser={
                firstname:request.body.firstname,
                lastname:request.body.lastname,
                email:request.body.email,
                password:bcrypt.hashSync(password,3),
                phone_number:request.body.phone_number,
                pan_card_number:request.body.pan_card_number,
            };
            console.log(newUser)
                const user=await User.create(newUser);
                return response.status(201).send(
                   { message:'User successflly register'}  );
            
            
           
          
        }
    } catch (error) {
       //console.log('error',error)
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
    //console.log("password",password)
   // console.log("email",email)
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
            sameSite:'none',
            secure:true,
            path: '/',
          });

          
          return response.status(201).send(
            { user,accesstoken}  ); 

          
        }
         
      }
          
    } catch (error) {
      console.log("error",error)
    }

})
router.get('/me',async(request,response)=>{
    var cookies=request.cookies;
    //console.log("cookies",cookies)
    if (!cookies) {
        return response.status(400).send( {user:null,loginStatus:false,message: 'Not authorized, try to login in' });
             }
  
    const accesstoken=cookies?.accesstoken;
    try {
   
            if(accesstoken==undefined || !accesstoken){
              return response.status(400).send( {user:null,loginStatus:false,message: 'Not authorized, try to login in' });
            }else{
            const verifytoken=jwt.verify(accesstoken,process.env.JWT_SECRET_KEY,async(error,decoded)=>{
             if(error){
                return response.status(400).send( {user:null,loginStatus:false,message: 'Not authorized, try to login in' });
            }else{
            //  console.log("decoded",decoded)
              const user=decoded.user
              
                return response.status(201).send({user:user,loginStatus:true})
              
             }
            })
             return verifytoken
              }
          
        
            
          
         
        } catch (error) {
          console.log("error",error)
        }
  
})
router.post('/logout',async(request,response)=>{
  console.log('Incoming request to /logout'); // Debug log

 try{
  console.log('Cookies before clear:', request.cookies.accesstoken);
 
response.clearCookie("accesstoken")
console.log('Cookies after clear:', request.cookies.accesstoken);
 
 return  response.send('User Logout')
}catch(error){
  console.log(error)
}


})

export default router;