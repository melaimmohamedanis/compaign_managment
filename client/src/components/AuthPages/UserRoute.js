import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { IslogedIn } from '../Api/UserApi';
import Navbar from '../Navbar';
export default function UserRoute() {
  const navigate=useNavigate(); 
  const { data, isLoading,  error } = useQuery({ queryKey: ["user"],
    queryFn:IslogedIn});
  console.log('query_data',data)
console.log(data)
  if(error){
    return <h1>{error}</h1>
  }else if(isLoading){
    return <h1>Loading</h1>
  }

  if( data?.me?.loginStatus===false || data?.me===null || data?.me===undefined){
    setTimeout(()=>navigate('/login',{replace:true}),3000)
    return(
      <>
      <Navbar/>
   
      <div class="py-24 px-0 pb-12 border-2 border-blue-500 flex items-center justify-center">
      <h1>you need to login before access this page</h1>
</div>
          </>
          )
  }else{
    return(
      <>
      <Navbar/>
     
      <div class="py-24 px-0 pb-12 border-2 border-blue-500 flex items-center justify-center">
      <Outlet/>
</div>
      
    
          </>
          )
  }
}
