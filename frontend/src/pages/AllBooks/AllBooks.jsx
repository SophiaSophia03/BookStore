import React from 'react'
import axios from "axios";
import { useState, useEffect } from 'react';
import BookCard from '../../components/BookCard/BookCard';
import Loader from '../../components/Loader/Loader';

function AllBooks() {
  const [Data, setData] = useState();
  useEffect(() => {
    const fetchData = async() => {
      const response = await axios.get("https://bookstore-backend-u2h5.onrender.com/api/get-all-books");
      setData(response.data.data);
    }
    fetchData();
  }, [])

  return (
    <div className='h-auto min-h-screen px-12 py-8 text-center md:text-left bg-[#82A3A1] '>
       <h3 className="text-3xl lg:text-4xl font-semibold md:mb-12">All Books</h3>
       {!Data && <div className='flex justify-center items-center h-screen bg-[#82A3A1]'> <Loader /> </div>}
       <div className='my-4 grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-8 '>
        {Data && Data.map((items, i) =>(<div key={i} className='text-center'> <BookCard data={items} /> {" "} </div>))}
       </div>
    </div>
  )
}

export default AllBooks