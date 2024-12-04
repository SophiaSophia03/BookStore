import React from 'react'
import axios from "axios";
import { useState, useEffect } from 'react';
import BookCard from '../../components/BookCard/BookCard';
import Loader from '../../components/Loader/Loader';

function RecentBooks() {
  const [Data, setData] = useState();
  useEffect(() => {
    const fetchData = async() => {
      const response = await axios.get("http://localhost:3000/api/get-recent-books");
      setData(response.data.data);
    }
    fetchData();
  }, [])

  return (
    <div className='h-auto w-full md:mt-16 mt-16 text-center md:text-left mb-16'>
       <h3 className="text-3xl lg:text-4xl font-semibold md:mb-12">Recently Added Books</h3>
       {!Data && <div className='flex justify-center items-center my-8'> <Loader /> </div>}
       <div className='my-4 grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4 '>
        {Data && Data.map((items, i) =>(<div key={i} className='text-center'> <BookCard data={items} /> {" "} </div>))}
       </div>
    </div>
  );
};

export default RecentBooks