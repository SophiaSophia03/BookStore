import React from 'react'
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="bg-[#201E50] lg:px-16 px-8 py-4 font-medium h-screen flex items-center justify-center">
      <div className="w-full p-8 md:w-3/6 lg:w-2/6 rounded-xl bg-[#82A3A1]">
        <p className="text-4xl font-bold mb-8 text-center">Login </p>
        <div className="flex flex-col items-start justify-start text-xl gap-4">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter Your Username"
            className="w-full bg-zinc-300 text-zinc-900 p-2 outline-none rounded-md"
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter Your Password"
            className="w-full bg-zinc-300 text-zinc-900 p-2 outline-none rounded-md"
          />
          <div className="w-full flex flex-col items-center justify-center">
            <Link
              to={"/signup"}
              className=" w-full text-center  px-8 py-2 bg-[#201E50] text-[#C4F1BE] rounded-md font-semibold hover:bg-[#82A3A1] hover:text-[#201E50] hover:border-2 hover:border-[#201E50] transition-all ease-in-out hover:scale-x-110 duration-1000 mt-8 text-xl"
            >
              Login
            </Link>
            <p className="mt-2">Or</p>
            <p>
              Don't have an account?{" "}
              <Link to={"/signup"} className="text-2xl font-bold underline">
                {" "}
                Sign Up
              </Link>{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login