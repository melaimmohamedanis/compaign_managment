import express from"express";
import User from "../Models/UserModel.js";
import bcrypt from 'bcryptjs'
const router =express.Router();
router.post('/',async (request,response)=>{
   // console.log("body",request.body)
    try {
        const regex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
        
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
                
            }else{
            const password= request.body.password 
            const newUser={
                firstname:request.body.title,
                lastname:request.body.author,
                email:request.body.publishYear,
                password:bcrypt.hashSync(password,3),
                phone_number:request.body.author,
                pan_card_number:request.body.publishYear,
            };
            const user=await User.create(newUser);
            return response.status(201).send(user);
        }
    } catch (error) {
        console.log("erbbbbrr",error)
        
    }

})
export default router;