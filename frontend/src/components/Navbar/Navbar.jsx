import React from "react";
import logoImg from "../../assets/images/logo.png";

function Navbar() {
  const links = [
    {
      title:"Home",
      link:"/"
    },
    {
      title:"About Us",
      link:"/about"
    },
    {
      title:"Discover Books",
      link:"/books"
    },
    {
      title:"Cart",
      link:"/cart"
    },
    {
      title:"Profile",
      link:"/profile"
    },
  ]
  return (
    <div className="bg-[#201E50] text-white px-8 py-4 items-center flex justify-between">
      <div className="flex items-center gap-4">
        <img src={logoImg} style={{width:"10%"}} alt="logo"></img>
        <h1 className="text-3xl font-semibold">Book store</h1>
      </div>
      <div className="nav-links items-center flex gap-8">
        <div className="flex gap-8">
          {links.map((items, i)=> <div key={i} className="hover:text-[#C4F1BE] text-lg font-medium transition-all duration-300 cursor-pointer">{items.title}</div>)}
        </div>
        <div className="flex gap-4">
          <button className="px-4 py-2 border border-[#C4F1BE] rounded-md font-medium hover:bg-[#C4F1BE] hover:text-[#201E50] transition-all duration-500 ">Login</button>
          <button className="px-4 py-2 border bg-[#C4F1BE] text-[#201E50] rounded-md font-medium hover:bg-[#201E50] hover:text-[#C4F1BE] transition-all duration-500 ">Sign Up</button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
