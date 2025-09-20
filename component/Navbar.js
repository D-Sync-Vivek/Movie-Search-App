"use client";
import Link from "next/link";
import Image from "next/image";

const Navbar = ({ value, onChange }) => {
  return (
    <div className="my-3">
      <div className="flex items-center gap-4 justify-between">
        {/* Logo */}
       
          <Image
            src="/logo.png" // put your logo inside /public
            alt="Logo"
            width={40}
            height={40}
            className="rounded-full bg-white hover:cursor-pointer"
          />
     

        {/* Search Bar */}
        <div className="flex w-[70vw] lg:w-[40vw] justify-center items-center">
          <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            type="text"
            placeholder="Search Movie"
            className="border text-white rounded-full py-2 px-4 w-[70vw] lg:w-[40vw] outline-white"
          />
          <Image
            width={20}
            height={20}
            src="/searchicon.png"
            alt="searchicon"
            className="invert right-10 relative"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
