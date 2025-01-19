import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { registeruserApi } from '../Api/UserApi';
import { replace, useNavigate } from "react-router-dom";


export default function Register() {
    const navigate=useNavigate();
    const [message, setMessage] = useState({ type: "", text: "" });
    const {mutate:registeruser}=useMutation( {mutationFn:registeruserApi, onSuccess:()=>{
        setMessage({type: "success", text:"register successfly ,an email sent to activate your account"});
        navigate("/login",{replace:true})
      }})

      //  console.log("message",message) 
    
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        phone_number: "",
        pan_card_number: "",
      });
      console.log(formData.email)
      
    
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = async(e) => {
        e.preventDefault();
     
        try {
            const message = await registeruserApi(formData);
            
            // Handle success (e.g., set a success message in state)
            setMessage({type:message.type,text:message.text});
            //setErrorMessage(""); // Clear any previous errors
          } catch (error) {
          

                setMessage({type:"error",text:error.response?.data?.messag})
            // Handle errors (e.g., set an error message in state)
            setMessage({type:"error",text: "Something went wrong!"})
           // setSuccessMessage(""); // Clear success messages
          }
           
    
    }
       
    
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 text-red-700">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Register
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* First Name */}
          <div>
            <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              value={formData.firstname}
              onChange={(e)=>{
                setFormData({
                  ...formData,
                  firstname:e.target.value
                })
              }}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          {/* Last Name */}
          <div>
            <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              value={formData.lastname}
              onChange={(e)=>{
                setFormData({
                  ...formData,
                  lastname:e.target.value
                })
              }}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={(e)=>{
                setFormData({
                  ...formData,
                  email:e.target.value
                })
              }}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={(e)=>{
                setFormData({
                  ...formData,
                  password:e.target.value
                })
              }}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          {/* Phone Number */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone_number}
              onChange={(e)=>{
                setFormData({
                  ...formData,
                  phone_number:e.target.value
                })
              }}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          {/* PAN Card Number */}
          <div>
            <label htmlFor="pancard" className="block text-sm font-medium text-gray-700">
              PAN Card Number
            </label>
            <input
              type="text"
              id="pancard"
              name="pancard"
              value={formData.pan_card_number}
              onChange={(e)=>{
                setFormData({
                  ...formData,
                  pan_card_number:e.target.value
                })
              }}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-sm font-medium"
            >
              Register
            </button>
          </div>
        </form>
        {/* Message Section */}
        {message.text && (
          <div
            className={`mt-4 text-center text-sm font-medium ${
              message.type === "error" ? "text-red-500" : "text-green-500"
            }`}
          >
            {message.text}
          </div>
        )}
      </div>
    </div>
  )
}
