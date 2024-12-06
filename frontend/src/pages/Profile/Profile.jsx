import React, { useEffect,useState } from 'react'
import Sidebar from '../../components/Profile/Sidebar'
import { Outlet } from 'react-router-dom'
import {useSelector} from "react-redux"
import axios from "axios";
import Loader from "../../components/Loader/Loader"

function Profile() {
  const [Profile, setProfile] = useState();
  // const isLoggedIn = useSelector();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  }
  useEffect(() => {
    const fetch = async() => {
      const response = await axios.get("http://localhost:3000/api/get-user-Info", {headers});
      setProfile(response.data);
    }
    fetch();
  }, [])

  return (
    <div className='h-screen md:px-12 px-4 py-8 text-center md:text-left bg-[#82A3A1] flex flex-col md:flex-row gap-8'>
    {!Profile && <div className='flex w-full h-[100%] justify-center items-center'> <Loader /> </div> }
    {Profile && <>
      <div className='md:w-1/6 w-full'>
        <Sidebar data = {Profile} />
      </div>
      <div className='md:w-5/6 w-full'>
        <Outlet />
      </div>
    </>}
    </div>
  )
}

export default Profile