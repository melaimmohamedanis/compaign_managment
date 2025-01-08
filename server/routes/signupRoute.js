import express from"express";
import User from "../Models/UserModel.js";
import bcrypt from 'bcryptjs'
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
                    message:error
                })
            }
           
          
        }
    } catch (error) {
       
        return response.status(400).send({
            message:error
        })
    }

})
export default router;