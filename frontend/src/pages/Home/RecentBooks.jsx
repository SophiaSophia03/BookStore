import React from 'react'
import axios from "axios";
import { useState, useEffect } from 'react';
import BookCard from '../../components/BookCard/BookCard';

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
    <div className='w-full md:mt-16 mt-16 text-center md:text-left '>
       <h3 className="text-3xl lg:text-4xl font-semibold">Recently Added Books</h3>
       <div className='my-4 grid md:grid-cols-4 grid-cols-1 gap-4 '>
        {Data && Data.map((items, i) =>(<div key={i} className='text-center'> <BookCard data={items} /> {" "} </div>))}
       </div>
    </div>
  );
};

export default RecentBooks