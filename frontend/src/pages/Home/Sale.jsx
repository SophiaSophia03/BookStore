import React from "react";
import { RiCustomerServiceFill } from "react-icons/ri";
import { RiExchangeFundsFill } from "react-icons/ri";
import { IoIosCheckmarkCircle } from "react-icons/io";
import DiscountVideo from "../../assets/videos/sales.mp4";
import { Link } from "react-router-dom";

function Sale() {
  return (
    <div className="md:h-[75vh] animate-slide-in">
      <div className="w-full mt-16 text-center items-center flex flex-col md:flex-row gap-24 justify-center">
        <div className="flex flex-col gap-2 justify-center items-center ">
          <div className="text-6xl">
            <RiExchangeFundsFill />
          </div>
          <h1 className="text-xl font-semibold">Easy Exchange Policy</h1>
          <p className="text-zinc-700">We offer hassle free exchange policy</p>
        </div>
        <div className="flex flex-col gap-2 justify-center items-center">
          <div className="text-6xl">
            <IoIosCheckmarkCircle />
          </div>
          <h1 className="text-xl font-semibold">7-Days Return Policy</h1>
          <p className="text-zinc-700">We provide 7-days return policy</p>
        </div>
        <div className="flex flex-col gap-2 justify-center items-center">
          <div className="text-6xl">
            <RiCustomerServiceFill />
          </div>
          <h1 className="text-xl font-semibold">Best Customer Support</h1>
          <p className="text-zinc-700">We provide 24/7 customer support</p>
        </div>
      </div>
      <div className=" p-8 bg-[rgb(32,30,80)] text-white w-full mt-16 text-center items-center flex flex-col gap-4 justify-center rounded-xl md:mb-16">
        <h1 className="text-2xl font-semibold">
          Signup now to get amazing offers during holiday season
        </h1>
        <Link
          to={"/signup"}
          className="px-16 py-2 border-2 bg-[#C4F1BE] text-[#201E50] rounded-md font-medium hover:bg-[#201E50] hover:text-[#C4F1BE] transition-all duration-500 ">
          Sign Up
        </Link>
      </div>
    </div>
  );
}

export default Sale;
