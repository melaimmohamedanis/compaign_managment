import React from 'react'
import Sidebar from './SideBar'
import { Outlet } from 'react-router-dom'

export default function DashboardMain() {
  return (
    <div className='flex flex-row'>
    <Sidebar/>
    <div className='w-full h-full'>
    <Outlet/>
    </div>
        </div>
  )
}
