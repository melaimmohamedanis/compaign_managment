import React from 'react'
import Sidebar from '../Dashboard/SideBar';
import Navbar from '../Navbar';
import { Outlet, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { IslogedIn } from '../Api/UserApi';

export default function AdminRoute() {
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

  if( data?.role==='user' || data===null || data===undefined){
    setTimeout(()=>navigate('/',{replace:true}),3000)
    return(
      <>
      <Navbar/>
   
      <div class="py-24 px-0 pb-12 border-2 border-blue-500 flex items-center justify-center">
      <h1>you didnt have Permission to access this page</h1>
</div>
          </>
          )
  }else{
    return(
      <div className='flex flex-row'>
      <Sidebar/>
      <div className='w-full h-full'>
      <Outlet/>
      </div>
          </div>    )
  }
}
