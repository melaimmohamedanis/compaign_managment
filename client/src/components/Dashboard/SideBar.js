import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaFileInvoiceDollar } from "react-icons/fa";
import { SiCampaignmonitor } from "react-icons/si";
import { FaUsers } from "react-icons/fa6";




export default function Sidebar() {
  return (
    <div className="flex flex-col w-64 h-screen px-4 py-8 bg-white border-r dark:bg-gray-900 dark:border-gray-700">
      <nav className="flex flex-col justify-between flex-1 mt-6">
        <ul>
          <li>
            <Link
              to="/"
              className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-200 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
            >
              <FaHome className="w-5 h-5" />
              <span className="mx-4 font-medium">Home</span>
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-200 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
            >
              <FaUsers className="w-5 h-5" />
              <span className="mx-4 font-medium">Users</span>
            </Link>
          </li>
          <li>
            <Link
              to="/campaigns"
              className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-200 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
            >
              <SiCampaignmonitor className="w-5 h-5" />
              <span className="mx-4 font-medium">Campaigns</span>
            </Link>
          </li>
          <li>
            <Link
              to="/invoices"
              className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-200 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
            >
              <FaFileInvoiceDollar  className="w-5 h-5 text-red-500" />
              <span className="mx-4 font-medium">Invoices</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
