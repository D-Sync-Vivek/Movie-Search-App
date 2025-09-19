"use client";
import Link from "next/link";
import Image from "next/image";

const Navbar = ({ value, onChange }) => {
  return (
    <div className="my-3">
      <div className="flex items-center gap-4 justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png" // put your logo inside /public
            alt="Logo"
            width={40}
            height={40}
            className="rounded-full bg-white"
          />
        </Link>

        {/* Search Bar */}
        <div className="flex w-[70vw] lg:w-[40vw] justify-center items-center">
          <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            type="text"
            placeholder="Search Movie"
            className="border text-white rounded-full py-2 px-4 w-[70vw] lg:w-[40vw] outline-white"
          />
          <img src="/searchicon.png" alt="searchicon" className="invert w-6 h-6 right-10 relative" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
