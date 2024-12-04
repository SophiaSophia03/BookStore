import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';
import { GrLanguage } from "react-icons/gr";

function ViewBookDetails() {
  const { id } = useParams();
  const [Data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/view-book-details/${id}`);
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };
    fetchData();
  }, [id]);

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

      </div>
    </div>)}
    {!Data && <div className='flex justify-center items-center my-8 h-screen'><Loader /></div>}
    </>

  );
}

export default ViewBookDetails;
