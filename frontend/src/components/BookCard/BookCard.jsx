import React from "react";
import { Link } from "react-router-dom";
import { FaTrashAlt, FaCartPlus } from "react-icons/fa";
import axios from "axios"; // Import axios

function BookCard({ data, favourite }) {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: data._id,
  };

  // Function to handle removing a favorite book
  const handleRemoveFavBook = async () => {
    try {
      const response = await axios.delete(
        "http://localhost:3000/api/delfavBook", // Change PUT to DELETE
        { headers }
      );
      alert(response.data.message);
    } catch (error) {
      console.error("Error removing book from favorites:", error);
      alert("Failed to remove the book from favorites.");
    }
  };


  // Function to handle adding a book to the cart
  const handleCart = async () => {
    try {
      const response = await axios.put(
        "http://localhost:3000/api/add-to-cart",
        {},
        { headers }
      );
      alert(response.data.message);
    } catch (error) {
      console.error("Error adding book to cart:", error);
      alert("Failed to add the book to the cart.");
    }
  };

  return (
    <div className="bg-[#201E50] text-white rounded-md px-2 py-4 flex flex-col h-[100%] hover:scale-105 transition-all duration-900">
      {/* Link to book details */}
      <Link to={`/view-book-details/${data._id}`}>
        <div>
          <div className="rounded-md flex items-center justify-center">
            <img src={data.url} alt={data.title} className="h-[35vh]" />
          </div>
          <h2 className="mt-4 text-xl font-semibold text-center">
            {data.title}
          </h2>
          <p className="mt-2 font-semibold text-zinc-400 text-center">
            By: {data.author}
          </p>
          <p className="mt-2 font-semibold text-zinc-300 text-xl text-center">
            Price: $ {data.price}
          </p>
        </div>
      </Link>

      {/* Actions: Remove from Favorites & Add to Cart */}
      {favourite && (
        <div className="flex items-center justify-center gap-4 mt-4">
          <button
            onClick={handleRemoveFavBook}
            className="bg-red-800 px-4 py-2 rounded-full flex items-center justify-center gap-2 w-auto text-center hover:bg-red-900 transition-all"
          >
            <FaTrashAlt /> Delete
          </button>
          <button
            onClick={handleCart}
            className=" bg-green-800 px-4 py-2 rounded-full flex items-center justify-center gap-2 w-auto text-center hover:bg-green-700 transition-all"
          >
            <FaCartPlus /> Add to Cart
          </button>
        </div>
      )}
    </div>
  );
}

export default BookCard;
