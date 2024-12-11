import React from "react";
import { TfiEmail } from "react-icons/tfi";
import { Link, useNavigate } from "react-router-dom";
import { BsBookmarkHeartFill } from "react-icons/bs";
import { TbTruckDelivery } from "react-icons/tb";
import { IoSettingsSharp } from "react-icons/io5";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import {useDispatch} from "react-redux"
import {authActions} from "../../store/auth"


function Sidebar({ data }) {

  const navigate = useNavigate();
  const dispatch = useDispatch();


  const submitLogout = () => {
    dispatch(authActions.logout());
    dispatch(authActions.changeRole("user"));
    localStorage.clear("id");
    localStorage.clear("token");
    localStorage.clear("role");
    navigate("/");
  }

  return (
    <div className="bg-[#7a9594] p-4 rounded-md flex flex-col items-center justify-evenly md:h-[100%]">

      <div className="flex flex-col items-center justify-center">
        <img src={data.avatar} className="h-[15vh]"></img>
        <p className="text-2xl font-bold mt-4 ">{data.username}</p>
        <p className="text-xl font-semibold flex items-center justify-center mt-4 gap-2">
          <TfiEmail /> {data.email}
        </p>
        <div className="block h-[2px] w-full bg-zinc-600 mt-4 mb-4"></div>
      </div>

      <div className="w-full flex-col items-center justify-center md:flex">
        <Link
          to={"/profile"}
          className="font-semibold w-full py-2 text-center hover:bg-[#201E50] hover:text-white rounded transition-all duration-500 mt-4 flex items-center justify-center gap-4"
        >
          <BsBookmarkHeartFill />
          Favourites
        </Link>
        <Link
          to={"/profile/orderHistory"}
          className="font-semibold w-full py-2 text-center hover:bg-[#201E50] hover:text-white rounded transition-all duration-500 mt-4 flex items-center justify-center gap-4"
        >
          <TbTruckDelivery />
          Order History
        </Link>
        <Link
          to={"/profile/settings"}
          className="font-semibold w-full py-2 text-center hover:bg-[#201E50] hover:text-white rounded transition-all duration-500 mt-4 mb-4 flex items-center justify-center gap-4"
        >
          <IoSettingsSharp />
          Profile Settings
        </Link>
      </div>
      <div className="flex items-center justify-center gap-4">
      <button onClick={submitLogout} className="px-12 py-2 bg-[#201E50] text-[#C4F1BE] rounded-md font-semibold hover:bg-[#82A3A1] hover:text-[#201E50] hover:border-2 hover:border-[#201E50] transition-all ease-in-out hover:scale-x-110 duration-1000 mt-8 text-xl flex items-center justify-center gap-4">Logout <FaArrowRightFromBracket /></button>
      </div>
    </div>
  );
}

export default Sidebar;
