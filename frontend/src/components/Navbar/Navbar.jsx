import React from "react";
import logoImg from "../../assets/images/logo.png";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import { useSelector } from "react-redux";

function Navbar() {
  const [MobileNav, setMobileNav] = useState("hidden");

  const handleMenuClick = () => {
    MobileNav === "hidden" ? setMobileNav("block") : setMobileNav("hidden");
  };

  const links = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "Discover Books",
      link: "/books",
    },
    {
      title: "Cart",
      link: "/cart",
    },
    {
      title: "Profile",
      link: "/profile",
    },
    {
      title: "Admin Profile",
      link: "/profile",
    },
  ];

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  if (isLoggedIn === false) {
    links.splice(2, 3);
  }
  if(isLoggedIn === true && role === "admin"){
    links.splice(2,2);
  }
  if(isLoggedIn === true && role === "user"){
    links.splice(4,1);
  }

  return (
    <>
      <nav className="bg-[#201E50] z-50 relative text-white px-8 py-4 items-center flex justify-between">
        <Link to={"/"} className="flex items-center gap-4">
          <img src={logoImg} style={{ width: "10%" }} alt="logo"></img>
          <h1 className="text-3xl font-semibold">Book store</h1>
        </Link>
        <div className="nav-links items-center block md:flex gap-8">
          <div className="md:flex hidden gap-8">
            {links.map((items, i) => (
              <div className="flex items-center justify-center">
                {items.title === "Profile" || items.title === "Admin Profile" ? <Link
                to={items.link}
                key={i}
                className="px-8 py-2 border-2 bg-[#82A3A1] text-[#201E50] rounded-md font-medium hover:bg-[#201E50] hover:text-[#82A3A1] transition-all duration-500"
              >
                {items.title} {" "}
              </Link>: <Link
                to={items.link}
                key={i}
                className="hover:text-[#82A3A1] text-lg font-medium transition-all duration-300 cursor-pointer"
              >
                {items.title}
              </Link>}
              </div>
            ))}
          </div>
          {isLoggedIn === false && (
  <div className="hidden md:flex gap-4">
    <Link
      to={"/login"}
      className="px-8 py-2 border-2 border-[#82A3A1] rounded-md font-medium hover:bg-[#82A3A1] hover:text-[#201E50] transition-all duration-500"
    >
      Login
    </Link>
    <Link
      to={"/signup"}
      className="px-8 py-2 border-2 bg-[#82A3A1] text-[#201E50] rounded-md font-medium hover:bg-[#201E50] hover:text-[#82A3A1] transition-all duration-500"
    >
      Sign Up
    </Link>
  </div>
)}
          <button
            className="text-white text-xl md:hidden hover:text-zinc-500"
            onClick={handleMenuClick}
          >
            <GiHamburgerMenu />
          </button>
        </div>
      </nav>
      {/* Mobile View Login/Signup */}
<div className={`${MobileNav} md:hidden bg-[#201E50] text-white text-2xl font-semibold h-[70vh] absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center gap-8`}>
  {links.map((items, i) => (
    <Link
      to={items.link}
      key={i}
      onClick={handleMenuClick}
      className="hover:text-[#82A3A1] text-lg font-medium transition-all duration-300 cursor-pointer"
    >
      {items.title}
      <hr />
    </Link>
  ))}
  {isLoggedIn === false && (
    <>
      <Link
        to={"/login"}
        onClick={handleMenuClick}
        className="px-16 py-2 border-2 border-[#82A3A1] rounded-md font-medium hover:bg-[#82A3A1] hover:text-[#201E50] transition-all duration-500"
      >
        Login
      </Link>
      <Link
        to={"/signup"}
        onClick={handleMenuClick}
        className="px-16 py-2 border-2 bg-[#82A3A1] text-[#201E50] rounded-md font-medium hover:bg-[#201E50] hover:text-[#82A3A1] transition-all duration-500"
      >
        Sign Up
      </Link>
    </>
  )}
</div>
    </>
  );
}

export default Navbar;
