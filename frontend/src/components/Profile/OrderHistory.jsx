import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../components/Loader/Loader";
import {Link} from "react-router-dom";

function OrderHistory() {
  const [OrderHistory, setOrderHistory] = useState();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://bookstore-backend-u2h5.onrender.com/api/getOrderHistory",
        { headers }
      );
      setOrderHistory(response.data.data);
    };
    fetchData();
  }, []);

  return (
    <>
      {!OrderHistory && (
        <div className="flex justify-center items-center  h-screen bg-[#82A3A1]">
          <Loader />{" "}
        </div>
      )}

      {OrderHistory && OrderHistory.length === 0 && (
        <div className="h-screen bg-[#82A3A1]">
          <div className="h-[100%] flex justify-center items-center flex-col">
            <h1 className="text-3xl md:text-5xl font-bold">
              No Order History Available &#128546;
            </h1>
            <Link
              to={"/books"}
              className="px-8 py-2 bg-[#201E50] text-[#C4F1BE] rounded-md font-semibold hover:bg-[#82A3A1] hover:text-[#201E50] hover:border-2 hover:border-[#201E50] transition-all ease-in-out hover:scale-x-110 duration-1000 mt-8 text-xl"
            >
              Discover Books
            </Link>
          </div>
        </div>
      )}

      {OrderHistory && OrderHistory.length > 0 && (
        <div>
          <div>
            <h1 className="font-semibold text-3xl">Your Order History</h1>
          </div>
          <div className="bg-[#7a9594] mt-4 w-full py-4 px-4 flex justify-start items-start md:gap-2 gap-4 font-semibold text-xl">
            <div className="md:w-[5%] w-[10%]">
              <h1>Book</h1>
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
            <div className="md:w-[15%] w-[40%]">
              <h1>Status</h1>
            </div>
          </div>
          {OrderHistory.map((items, i) => (
  <div className="bg-[#7a9594] w-full py-4 px-4 flex justify-start items-start gap-4 font-medium text-xl hover:bg-[#5c7c7a] hover:cursor-pointer transition-all duration-700">
    <div className="md:w-[5%] w-[10%]">
      <img src={items.book[0].url}></img>
    </div>
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
        {items.book[0].desc.slice(0, 30) || "No description available"}...
      </h1>
    </div>
    <div className="w-[10%]">
      <h1>${items.book[0].price}</h1>
    </div>
    <div className="md:w-[15%] w-[40%]">
      <h1 className="font-semibold text-green-800">
        {items.status === "Order Placed" ? (
          <div className="text-yellow-500">{items.status}</div>
        ) : items.status === "Order Cancelled" ? (
          <div className="text-red-700">{items.status}</div>
        ) : items.status === "Out for Delivery" ? (
          <div className="text-orange-500">{items.status}</div>
        ) : (
          items.status
        )}
      </h1>
    </div>
  </div>
))}

        </div>
      )}
    </>
  );
}

export default OrderHistory;
