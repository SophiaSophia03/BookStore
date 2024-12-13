import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [Values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
  });
  const navigate = useNavigate();

  const inputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value });
  };

  const userSubmit = async () => {
    try {
      if (Values.username === "" || Values.email === "" || Values.password === "") {
        alert("All fields are required!");
        return;
      }
      if (!Values.email.includes("@")) {
        alert("Please enter a valid email address!");
        return;
      }
      if (Values.password.length < 6) {
        alert("Password must be at least 6 characters!");
        return;
      }
      const response = await axios.post("https://bookstore-backend-u2h5.onrender.com/api/signup", Values);
      alert(response.data.message);
      navigate("/login");
    } catch (error) {
      alert(error.response?.data.message || "Signup failed");
    }
  };

  return (
    <div className="bg-[#201E50] lg:px-24 px-8 py-8 font-medium h-screen flex items-center justify-center">
      <div className="w-full p-8 md:w-3/6 lg:w-2/6 rounded-xl bg-[#82A3A1]">
        <p className="text-4xl font-bold mb-8 text-center">Signup</p>
        <div className="flex flex-col items-start justify-start text-xl gap-4">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter Your Username"
            className="w-full bg-zinc-300 text-zinc-900 p-2 outline-none rounded-md"
            required
            value={Values.username}
            onChange={inputChange}
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter Your Email"
            className="w-full bg-zinc-300 text-zinc-900 p-2 outline-none rounded-md"
            required
            value={Values.email}
            onChange={inputChange}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter Your Password"
            className="w-full bg-zinc-300 text-zinc-900 p-2 outline-none rounded-md"
            required
            value={Values.password}
            onChange={inputChange}
          />
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            placeholder="Enter Your Address"
            className="w-full bg-zinc-300 text-zinc-900 p-2 outline-none rounded-md"
            value={Values.address}
            onChange={inputChange}
          />
          <div className="w-full flex flex-col items-center justify-center">
            <button
              onClick={userSubmit}
              className="w-full text-center px-8 py-2 bg-[#201E50] text-[#C4F1BE] rounded-md font-semibold hover:bg-[#82A3A1] hover:text-[#201E50] hover:border-2 hover:border-[#201E50] transition-all ease-in-out hover:scale-x-110 duration-1000 mt-8 text-xl"
            >
              Sign Up
            </button>
            <p className="mt-2">Or</p>
            <p>
              Already have an account?{" "}
              <Link to={"/login"} className="text-2xl font-bold underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
