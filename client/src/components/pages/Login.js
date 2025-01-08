import React, { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { loginuserApi } from '../Api/UserApi';
export default function () {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
      });
       const {mutate:loginuser}=useMutation( {mutationFn:loginuserApi, onSuccess:()=>{
              setMessage({type: "success", text:"Login successfly "});
            //  navigate("/",{replace:true})
            }})
      const [message, setMessage] = useState({ type: "", text: "" });
      const handleSubmit = async(e) =>{
        e.preventDefault();
             
                try {
                    const data= await loginuserApi(formData);
                    
                  console.log("data",data)
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
       Login
      </h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
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
       
       

   {/* Forgot Password Link */}
   <div className="mt-2 text-right">
          <a
            href="/forgot-password" // Update this with the correct route
            className="text-sm text-indigo-600 hover:underline"
          >
            Forgot Password?
          </a>
        </div>
      </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-sm font-medium"
          >
            Login
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
