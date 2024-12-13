import React, {useEffect, useState} from 'react'
import axios from "axios"
import BookCard from "../BookCard/BookCard"

function Favourites() {
  const [FavBook, setFavBook] = useState()

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  }
  useEffect(() => {
    const fetchData = async() => {
      const response = await axios.get("https://bookstore-backend-u2h5.onrender.com/api/getFavBooks", {headers} );
      setFavBook(response.data.data);
    }
    fetchData();
  }, [FavBook])



  return (
    <div className=''>
    <div>
      <h1 className='font-semibold text-3xl'>Favourite Books</h1>
    </div>
    {FavBook && FavBook.length === 0 && (<div className='flex items-center justify-center text-2xl font-semibold w-full h-[100%] mt-24'>No Favourite Books Available</div>)}
    <div className='my-4 grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-8'>
      {FavBook && FavBook.map((items,i) => <div key={i}><BookCard data={items} favourite={true} /></div>)}
    </div>
    </div>
  )
}

export default Favourites