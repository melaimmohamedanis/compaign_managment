import React from 'react'
import { Link } from 'react-router-dom'

export default function ProfileDetails() {
  return (
   
    <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
    <div className="px-4 py-3">
      <span className="block text-sm text-gray-900 dark:text-white">Bonnie Green</span>
      <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">name@flowbite.com</span>
    </div>
    <ul class="py-2" aria-labelledby="user-menu-button">
      <li>
       < Link to='/'>
        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Home</a>
        </Link>
      </li>
      <li>
      < Link to='/compaigns'>
        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Campaigns</a>
        </Link>
      </li>
      <li>
      < Link to='/invoices'>
        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Invoices</a>
        </Link>
      </li>
     
     
        <li> 
       
        <Link to='/login'>
         <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Login</a> </Link> </li> )
       
     
      
        <li>
        < Link to='/register'>
          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Signup</a>
          </Link>
        </li>
   
    
    </ul>
  </div>
  )
}
