import React from 'react'
import Sidebar from './SideBar'
import { Outlet } from 'react-router-dom'

export default function DashboardMain() {
  return (
    <>
    <Sidebar/>
   
    <div class="py-24 px-0 pb-12 border-2 border-blue-500 flex items-center justify-center">
    <Outlet/>
</div>
    
  
        </>
  )
}
