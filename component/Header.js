"use client";
import React from "react";
import { useState } from "react";

const Header = () => {
  const [search, setSearch] = useState("");

  return (
    <>
      <nav className="flex flex-col justify-center items-center">
        <div className="text-white bg-blue-500 w-full text-lg text-center py-2">
          Movie Search
        </div>
        <div className="flex justify-center items-center mt-5">
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            type="text"
            placeholder="Search Movie"
            className="border rounded-full py-2 px-4 w-[80vw] md:w-[50vw] focus:outline-1 outline-black ring-black"
          />
        </div>
      </nav>
          {/* <p className="mt-5 text-gray-500 text-center">You typed : {search}</p> */}
    </>
  );
};

export default Header;
