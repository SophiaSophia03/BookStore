import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {useDispatch} from "react-redux"
import {authActions} from "../../store/auth"

function Login() {
  const [Values, setValues] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const inputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value });
  };

  const loginSubmit = async () => {
    try {
      if (Values.username === "" || Values.password === "") {
        alert("All fields are required!");
        return;
      }
      const response = await axios.post("https://bookstore-backend-u2h5.onrender.com/api/login", Values);

      dispatch(authActions.login());
      dispatch(authActions.changeRole(response.data.role))
      localStorage.setItem("id",response.data.id);
      localStorage.setItem("token",response.data.token);
      localStorage.setItem("role",response.data.role);
      navigate("/profile")

    } catch (error) {
      alert(error.response.data.message || "Login failed");
    }
  };

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
            required
            value={Values.username}
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
          <div className="w-full flex flex-col items-center justify-center">
            <button
            onClick={loginSubmit}
              className=" w-full text-center  px-8 py-2 bg-[#201E50] text-[#C4F1BE] rounded-md font-semibold hover:bg-[#82A3A1] hover:text-[#201E50] hover:border-2 hover:border-[#201E50] transition-all ease-in-out hover:scale-x-110 duration-1000 mt-8 text-xl"
            >
              Login
            </button>
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