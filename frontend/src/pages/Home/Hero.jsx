import React from 'react'
import heroImg from "../../assets/images/hero.png"

function Hero() {
  return (
    <div className='lg:h-[75vh] h-[90vh] flex flex-col gap-16 lg:flex-row items-center '>
      <div className='w-full lg:w-3/6 flex flex-col text-center lg:text-left items-center lg:items-start justify-center mt-8 mx-auto animate-slide-in'>
        <h1 className='text-5xl lg:mt-0 mt-16 lg:text-7xl font-bold'>Find Your Next Favorite Read</h1>
        <p className='lg:mt-4 mt-8 text-xl text-zinc-800'>From timeless classics to the latest bestsellers, explore a vast collection of books curated just for you. Whether you're a casual reader or a passionate bibliophile, we've got something special waiting</p>
        <button className="px-8 py-2 bg-[#201E50] text-[#C4F1BE] rounded-md font-semibold hover:bg-[#82A3A1] hover:text-[#201E50] hover:border-2 hover:border-[#201E50] transition-all ease-in-out hover:scale-x-110 duration-1000 mt-8 text-xl">Discover Books</button>
      </div>
      <div className='w-full lg:w-3/6 animate-fade-in'>
        <img src={heroImg} alt='Hero' style={{width:"70%"}} className='lg:mx-24 mx-auto lg:my-0 mb-16'></img>
      </div>
    </div>
  )
}

export default Hero