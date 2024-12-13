import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../components/Loader/Loader";
import { Link } from "react-router-dom";
import { FaCheckSquare } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { FaExternalLinkAlt } from "react-icons/fa";
import UserData from "../UserData/UserData";

export default function AllOrders() {
  const [data, setData] = useState();
  const [Option, setOption] = useState(-1);
  const [Values, setValues] = useState({ status: "" });
  const [userBox, setuserBox] = useState("hidden")
  const [userBoxData, setuserBoxData] = useState()

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://bookstore-backend-u2h5.onrender.com/api/getAllOrders",
          { headers }
        );
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchData();
  }, [data]);

  const selectChange = (e) => {
    const { value } = e.target;
    setValues({ status: value });
  };

  const setOptions = (i) => {
    setOption(i);
  };

  const submitStatus = async (i) => {
    const id = data[i]._id;
    try {
      const response = await axios.put(
        `https://bookstore-backend-u2h5.onrender.com/api/orderStatus/${id}`,
        Values,
        { headers }
      );
      alert(response.data.message);
    } catch (error) {
      console.error("Error updating status:", error.response || error.message);
    }
  };

  return (
    <>
      {/* Loader when data is not yet fetched */}
      {!data && (
        <div className="flex justify-center items-center h-screen bg-[#82A3A1]">
          <Loader />
        </div>
      )}

      {/* When no orders are available */}
      {data && data.length === 0 && (
        <div className="h-screen bg-[#82A3A1]">
          <div className="h-[100%] flex justify-center items-center flex-col">
            <h1 className="text-3xl md:text-5xl font-bold">
              No Order Available &#128546;
            </h1>
          </div>
        </div>
      )}

      {/* When orders are available */}
      {data && data.length > 0 && (
        <div>
          <div>
            <h1 className="font-semibold text-3xl">All Orders</h1>
          </div>
          <div className="bg-[#7a9594] mt-4 w-full py-4 px-4 flex justify-start items-start md:gap-2 gap-4 font-semibold text-xl">
            <div className="md:w-[5%] w-[10%]">
              <h1>Sr.</h1>
            </div>
            <div className="md:w-[30%] w-[40%]">
              <h1>Book's Name</h1>
            </div>
            <div className="hidden md:block md:w-[30%]">
              <h1>Description</h1>
            </div>
            <div className="w-[10%]">
              <h1>Price</h1>
            </div>
            <div className="md:w-[20%] w-[40%]">
              <h1>Status</h1>
            </div>
            <div className="md:w-[5%] w-[10%]">
              <h1>
                <FaUserCircle />
              </h1>
            </div>
          </div>
          {data.map((items, i) => (
            <div className="bg-[#7a9594] w-full py-4 px-4 flex justify-start items-start md:gap-2 gap-4 font-medium text-xl hover:bg-[#5c7c7a] hover:cursor-pointer transition-all duration-700">
              <div className="md:w-[5%] w-[10%]">{i + 1}</div>
              <div className="md:w-[30%] w-[40%]">
                <Link
                  to={`/view-book-details/${items.book[0]._id}`}
                  className="hover:text-blue-700"
                >
                  {items.book[0].title}
                </Link>
              </div>
              <div className="hidden md:block md:w-[30%]">
                <h1>
                  {items.book[0].desc.slice(0, 30) ||
                    "No description available"}
                  ...
                </h1>
              </div>
              <div className="w-[10%]">
                <h1>${items.book[0].price}</h1>
              </div>
              <div className="md:w-[20%] w-[40%]">
                <button
                  onClick={() => setOptions(i)}
                  className="font-semibold text-green-800"
                >
                  {items.status === "Order Placed" ? (
                    <div className="text-yellow-500">{items.status}</div>
                  ) : items.status === "Order Cancelled" ? (
                    <div className="text-red-700">{items.status}</div>
                  ) : items.status === "Out for Delivery" ? (
                    <div className="text-orange-500">{items.status}</div>
                  ) : (
                    items.status
                  )}
                </button>
                <div
                  className={`${
                    Option === i
                      ? "flex gap-2 justify-start items-center"
                      : "hidden"
                  } w-full md:w-auto`}
                >
                  <select
                    name="status"
                    id="status"
                    className="bg-[#5c7c7a] w-full md:w-[75%]"
                    onChange={selectChange}
                    value={Values.status}
                  >
                    {[
                      "Order Placed",
                      "Out for Delivery",
                      "Order completed",
                      "Order Cancelled",
                    ].map((items, i) => (
                      <option value={items} key={i}>
                        {items}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => {
                      setOption(-1);
                      submitStatus(i);
                    }}
                  >
                    <FaCheckSquare />
                  </button>
                </div>
              </div>
              <div className="md:w-[5%] w-[10%]">
                <button onClick={()=> {
                  setuserBox("fixed");
                  setuserBoxData(items.user[0]);
                }} className="hover:text-red-800 hover:scale-125 transition-all">
                  <FaExternalLinkAlt />
                  </button>
              </div>
            </div>
          ))}
          {userBoxData && (<UserData userBoxData={userBoxData} userBox={userBox} setuserBox={setuserBox} />)}
        </div>
      )}
    </>
  );
}
