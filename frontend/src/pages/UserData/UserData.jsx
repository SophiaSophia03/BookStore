import React from 'react'
import { RxCross2 } from "react-icons/rx";


function UserData({userBoxData, userBox, setuserBox}) {
  return (
    <>
    <div className={`${userBox} top-0 left-0 h-screen w-full bg-[#7a9594] opacity-80`}></div>
    <div className={`${userBox} top-0 left-0 h-screen w-full flex items-center justify-center`}>
    <div className='bg-[#5c7c7a] px-8 py-8 md:w-[40%] w-[90%] border-2 border-[#1e3434] shadow-lg'>
      <div className='flex flex-row w-full justify-between'>
      <h1 className='text-2xl font-bold '>User Information</h1>
      <button className='text-2xl font-extrabold hover:text-red-800 hover:scale-150 transition-all' onClick={()=> setuserBox("hidden")}><RxCross2 /></button>
      </div>
      <div className='flex flex-col gap-4 items-center justify-center mt-8'>
        <div className='font-semibold text-xl'>
          <label>Username : </label>
          <span>{userBoxData.username}</span>
        </div>
        <div className='font-semibold text-xl'>
          <label>Email : </label>
          <span>{userBoxData.email}</span>
        </div>
        <div className='font-semibold text-xl'>
          <label >Address : </label>
          <span>{userBoxData.address}</span>
        </div>
      </div>
      </div>
    </div>
    </>
  )
}

export default UserData
