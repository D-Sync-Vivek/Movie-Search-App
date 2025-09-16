"use client";
import React, { useEffect } from "react";
import { useState } from "react";

const Header = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  const fetchMovies = async (query) => {
    try {
      const res = await fetch(
        `http://www.omdbapi.com/?s=${query}&apikey=${process.env.NEXT_PUBLIC_APIKEY}`
      );
      const data = await res.json();
      if (data.Response === "True") {
        console.log(data.Search);
        setResults(data.Search);
      } else {
        setResults([]);
      }
    } catch (err) {
      console.error("Encountered Error" + err);
    }
  };

  // if user hasn't searched then show this.
  useEffect(() => {
    const defaults = ["Avengers", "Batman", "Harry Potter", "Boys"];
    const random = defaults[Math.floor(Math.random() * defaults.length)];
    fetchMovies(random);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim() !== "") {
      fetchMovies(search);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center bg-indigo-500"
      >
        <div className="flex justify-center items-center my-3">
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            type="text"
            placeholder="Search Movie"
            className="border border-black text-white rounded-full py-2 px-4 w-[80vw] md:w-[50vw] focus:outline-1 outline-black ring-black"
          />
        </div>
      </form>

      {/* Display Results */}

      <div className="bg-indigo-900 py-3">
        {results && results.length > 0 ? (
          <div className="cards grid gap-6 px-5 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {results.map((item, index) => (
              <div
                className="bg-gray-700 rounded-lg p-2 flex flex-col justify-center items-center"
                key={`${item.imdbID}-${index}`}
              >
                <img
                  src={item.Poster}
                  alt={`${item.Title} Poster`}
                  className="rounded-lg w-full object-cover"
                />
                <p className="break-words w-[150px] text-center mt-2 text-white">
                  {item.Title}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-red-500 px-2 text-center text-2xl">No movies found.</p>
        )}
      </div>
    </>
  );
};

export default Header;
