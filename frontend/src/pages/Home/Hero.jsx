import React from "react";
import heroImg from "../../assets/images/hero.png";

function Hero() {
  return (
    <div className=" h-screen md:h-[75vh] mt-8 lg:mt-0 flex flex-col md:flex-row items-center justify-center ">
      <div className="w-full lg:mb-0 mb-12 lg:w-3/6 flex flex-col items-center lg:items-start md:text-left text-center justify-center animate-slide-in">
        <h1 className="text-4xl lg:text-6xl font-semibold text-center lg:text-left ">
          Find Your Next Favorite Read
        </h1>
        <p className="mt-4 text-xl text-center lg:text-left ">
          From timeless classics to the latest bestsellers, explore a vast
          collection of books curated just for you. Whether you're a casual
          reader or a passionate bibliophile, we've got something special
          waiting
        </p>
        <button className="px-8 py-2 bg-[#201E50] text-[#C4F1BE] rounded-md font-semibold hover:bg-[#82A3A1] hover:text-[#201E50] hover:border-2 hover:border-[#201E50] transition-all ease-in-out hover:scale-x-110 duration-1000 mt-8 text-xl">
          Discover Books
        </button>
      </div>
      <div className="w-full lg:w-3/6 h-auto lg:h-[100%] flex items-center justify-center animate-fade-in md:mb-0 mb-12">
        <img
          src={heroImg}
          alt="Hero"
        ></img>
      </div>
    </div>
  );
}

export default Hero;
