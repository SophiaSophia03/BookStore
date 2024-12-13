import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';
import { GrLanguage } from "react-icons/gr";
import { FaCartPlus } from "react-icons/fa";
import { BsBookmarkHeartFill } from "react-icons/bs";
import {useSelector} from "react-redux"
import { FaTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { Link } from 'react-router-dom';


function ViewBookDetails() {

  const navigate = useNavigate();
  const { id } = useParams();
  const [Data, setData] = useState(null);

  const isLoggedIn = useSelector((state) =>  state.auth.isLoggedIn);
  const role = useSelector((state) =>  state.auth.role);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://bookstore-backend-u2h5.onrender.com/api/view-book-details/${id}`);
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };
    fetchData();
  }, [id]);


  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id,
  }
  const handleFavourite = async () => {
    const response = await axios.put("https://bookstore-backend-u2h5.onrender.com/api/add-book-to-fav", {} ,{headers});
    alert(response.data.message);
  }

  const handleCart = async() => {
    const response = await axios.put("https://bookstore-backend-u2h5.onrender.com/api/add-to-cart", {} ,{headers});
    alert(response.data.message);
  }

  const handleDelete = async()=> {
    const response = await axios.delete("https://bookstore-backend-u2h5.onrender.com/api/deleteBook", {headers});
    alert(response.data.message);
    navigate("/books")
  }

  return (
    <>
      {Data && (<div className='lg:px-12 px-8 py-8 bg-[#82A3A1] flex flex-col lg:flex-row h-auto text-center lg:text-left'>
      <div className='bg-[#201E50] text-white rounded-md md:w-2/6 w-full h-[60vh] lg:h-[80vh] flex items-center justify-center animate-slide-in'>
        <img
          src={Data.url}
          alt='Book Cover'
          className='lg:h-[70vh] h-[50vh] lg:w-auto w-[90%] object-contain'
        />
      </div>
      <div className='lg:px-16 lg:py-8 py-4  md:w-4/6 w-full animate-fade-in'>
        <h1 className='lg:text-7xl text-4xl font-bold mb-4'>{Data.title}</h1>
        <p className='mt-4 lg:text-2xl text-xl font-semibold text-zinc-800'>
          <b>By:</b> <i> {Data.author}</i>
        </p>
        <p className='text-xl mt-4'>{Data.desc}</p>

        <p className='mt-4 text-xl flex flex-row gap-4 items-center lg:justify-start justify-center'>
          <strong><GrLanguage /></strong>{Data.language}
        </p>

        <p className='mt-4 text-4xl font-bold'>
          Price: ${Data.price}
        </p>

        {isLoggedIn === true && role === "user" && <div className='flex items-left gap-4 flex-col md:flex-row'>
          <button onClick={handleFavourite} className='px-12 py-2 bg-[#201E50] text-[#C4F1BE] rounded-md font-semibold hover:bg-[#82A3A1] hover:text-[#201E50] hover:border-2 hover:border-[#201E50] transition-all ease-in-out hover:scale-x-110 duration-1000 mt-8 text-xl flex items-center justify-center gap-4'><BsBookmarkHeartFill /> Add to Favourites</button>
          <button onClick={handleCart} className='px-12 py-2 bg-[#201E50] text-[#C4F1BE] rounded-md font-semibold hover:bg-[#82A3A1] hover:text-[#201E50] hover:border-2 hover:border-[#201E50] transition-all ease-in-out hover:scale-x-110 duration-1000 mt-8 text-xl flex items-center justify-center gap-4'><FaCartPlus /> Add to Cart</button>
        </div>}

        {isLoggedIn === true && role === "admin" && <div className='flex items-left gap-4 flex-col md:flex-row'>
          <Link to={`/update-book/${id}`} className='px-12 py-2 bg-[#201E50] text-[#C4F1BE] rounded-md font-semibold hover:bg-[#82A3A1] hover:text-[#201E50] hover:border-2 hover:border-[#201E50] transition-all ease-in-out hover:scale-x-110 duration-1000 mt-8 text-xl flex items-center justify-center gap-4'><FaEdit /> Edit Book Details</Link>
          <button onClick={handleDelete} className='px-12 py-2 bg-[#201E50] text-[#C4F1BE] rounded-md font-semibold hover:bg-[#82A3A1] hover:text-[#201E50] hover:border-2 hover:border-[#201E50] transition-all ease-in-out hover:scale-x-110 duration-1000 mt-8 text-xl flex items-center justify-center gap-4'><FaTrashAlt /> Delete Book</button>
        </div>}

      </div>
    </div>)}
    {!Data && <div className='flex justify-center items-center my-8 h-screen'><Loader /></div>}
    </>

  );
}

export default ViewBookDetails;
