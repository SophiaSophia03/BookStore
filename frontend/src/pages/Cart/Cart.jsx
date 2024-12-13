import React, { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
import { FaTrashAlt} from "react-icons/fa";


function Cart() {
  const [Cart, setCart] = useState([]);
  const [Total, setTotal] = useState(0);
  const navigate = useNavigate();


  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    const fetchData = async() => {
      const response = await axios.get("https://bookstore-backend-u2h5.onrender.com/api/getCartBooks", {headers});
      setCart(response.data.data);
    }
    fetchData();
  }, [Cart]);

  const handleRemoveCartBook = async(bookid) => {
    try {
      const response = await axios.delete(
        `https://bookstore-backend-u2h5.onrender.com/api/delCartBook/${bookid}`,
        { headers }
      );
      alert(response.data.message);
    } catch (error) {
      console.error("Error removing book from favorites:", error);
      alert("Failed to remove the book from favorites.");
    }
  };

  useEffect(() => {
    if(Cart && Cart.length > 0){
      let total = 0;
      Cart.map((items)=> {
        total += items.price;
      });
      setTotal(total.toFixed(2));
      total=0;
    }
  }, [Cart]);

  const placeOrder = async()=> {
    try{
      const response = await axios.post(`https://bookstore-backend-u2h5.onrender.com/api/placeOrders`,{order: Cart}, {headers});
      alert(response.data.message);
      navigate("/profile/orderHistory")
    }catch(error){
      console.log(error);;
    }
  }


  return (
    <div className="min-h-screen bg-[#82A3A1]">
      {!Cart && (
        <div className="flex justify-center items-center  h-screen bg-[#82A3A1]">
          <Loader />{" "}
        </div>
      )}

      {Cart && Cart.length === 0 && (
        <div className="h-screen bg-[#82A3A1]">
          <div className="h-[100%] flex justify-center items-center flex-col">
            <h1 className="text-3xl md:text-5xl font-bold">
              Sorry!! Cart is Empty &#128546;
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

      {Cart && Cart.length > 0 && (
        <div className="md:px-12 px-4 py-8 text-center md:text-left bg-[#82A3A1]">
          <h1 className="text-3xl md:text-5xl font-bold">Your Cart</h1>
          {Cart.map((items, i) => (
            <div
              key={i}
              className="w-full bg-[#7a9594] my-4 rounded-2xl flex flex-col md:flex-row p-4 justify-between items-center px-8"
            >
              <img
                src={items.url}
                alt="cart book"
                className="h-[20vh] md:h-[15vh] object-cover"
              ></img>
              <div className="w-full md:w-auto flex flex-col gap-2 justify-center items-center ">
                <h1 className="text-2xl font-semibold text-center mt-2 md:mt-0">
                  {items.title}
                </h1>
                <p className="mt-2 hidden lg:block text-normal">{items.desc.slice(0,100)}...</p>
              </div>
              <div className="w-full md:w-auto flex flex-col md:flex-row gap-4 justify-center items-center">
                <div className="text-2xl font-semibold flex">
                 Price: ${items.price}
                </div>
                <button
                  onClick={() => handleRemoveCartBook(items._id)}
                  className="bg-red-800 px-4 py-2 rounded-full flex items-center justify-center gap-2 w-auto text-center hover:bg-red-900 transition-all"
                >
                  <FaTrashAlt /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {Cart && Cart.length > 0 && (
        <div className=" md:px-12 px-4 py-8mt-4 flex items-center md:justify-end justify-center w-full">
          <div className="bg-[#7a9594] rounded-2xl p-8 mb-8" >
            <h1 className="text-3xl font-bold text-center">Total Amount</h1>
            <div className="flex justify-between items-center mt-4 text-xl font-semibold">
              <h2>{Cart.length} books</h2>
              <h2>$ {Total}</h2>
            </div>
            <div>
            <button onClick={placeOrder} className="px-12 py-2 bg-[#201E50] text-[#C4F1BE] rounded-md font-semibold hover:bg-[#82A3A1] hover:text-[#201E50] hover:border-2 hover:border-[#201E50] transition-all ease-in-out hover:scale-x-110 duration-1000 mt-8 text-xl flex items-center justify-center gap-4">Place Your Order</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
