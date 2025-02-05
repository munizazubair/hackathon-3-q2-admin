import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import React from 'react'

export default function DashBoard() {
  return (
    <div className="min-h-screen w-screen bg-gray-100">
      <div className="flex">
    
        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-[18px] md:text-[20px] font-bold text-gray-800">Welcome to Your Dashboard</h1>
            {/* <button className="bg-color text-white w-[90px] h-[30px] text-[12px] rounded-lg shadow-md hover:bg-blue-700">Log Out</button> */}
            <div>
                    <SignedIn>
                <UserButton />
            </SignedIn>
            <SignedOut>
                <SignInButton />
            </SignedOut>
            </div>
          </div>

          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
              <h3 className="text-[15px] font-semibold text-gray-700">Total Sales</h3>
              <p className="text-[22px] font-bold text-blue-600">$3,500</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
              <h3 className="text-[15px] font-semibold text-gray-700">Total Users</h3>
              <p className="text-[22px] font-bold text-green-600">1,250</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
              <h3 className="text-[15px] font-semibold text-gray-700">Pending Orders</h3>
              <p className="text-[22px] font-bold text-red-600">42</p>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Recent Activities</h2>
            <ul className="space-y-4">
              <li className="flex items-center space-x-4">
                <div className="bg-green-500 text-white p-3 rounded-full">
                  <i className="fas fa-check"></i>
                </div>
                <div>
                  <p className="text-gray-700 font-medium">New user registered</p>
                  <p className="text-gray-500 text-sm">2 hours ago</p>
                </div>
              </li>
              <li className="flex items-center space-x-4">
                <div className="bg-yellow-500 text-white p-3 rounded-full">
                  <i className="fas fa-cogs"></i>
                </div>
                <div>
                  <p className="text-gray-700 font-medium">System update completed</p>
                  <p className="text-gray-500 text-sm">3 hours ago</p>
                </div>
              </li>
              <li className="flex items-center space-x-4">
                <div className="bg-red-500 text-white p-3 rounded-full">
                  <i className="fas fa-exclamation"></i>
                </div>
                <div>
                  <p className="text-gray-700 font-medium">Server error detected</p>
                  <p className="text-gray-500 text-sm">1 day ago</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
