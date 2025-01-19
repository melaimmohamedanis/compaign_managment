import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar'

export default function PublicRoute() {
  return (
    <>
    <Navbar/>
   
    <div class="px-0 pb-12">
    <Outlet/>
</div>
    
  
        </>
  )
}
