import React from 'react'
import { Link } from 'react-router-dom';

function BookCard({data}) {
  console.log(data);
  return (
    <>
      <Link>
        <div className='bg-[#201E50] text-white rounded-md px-2 py-4 flex flex-col h-[100%]'>
          <div className=' rounded-md flex items-center justify-center'>
            <img src={data.url} className='h-[35vh]'></img>
          </div>
          <h2 className='mt-4 text-xl font-semibold'>{data.title}</h2>
          <p className='mt-2 font-semibold text-zinc-400'>By: {data.author}</p>
          <p className='mt-2 font-semibold text-zinc-300'>Price: $ {data.price}</p>
        </div>
      </Link>
    </>
  )
}

export default BookCard