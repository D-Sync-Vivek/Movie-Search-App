"use client";
import Link from "next/link";
const Navbar = ({ value, onChange }) => {
  return (
    <>
      <div className="grid grid-cols-1 items-center my-3">
        {/* <div className="flex justify-center text-white">Logo Here</div> */}
        <div>
          <input
            value={value}
            onChange={(e) => {
              onChange(e.target.value);
            }}
            type="text"
            placeholder="Search Movie"
            className="border text-white rounded-full py-2 px-4 w-[80vw] md:w-[50vw] focus:outline-1"
          />
        </div>
        
      </div>
    </>
  );
};

export default Navbar;
