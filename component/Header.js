"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import Link from "next/link";
import Navbar from "./Navbar";

const Header = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchMovies = async (query, pageNumber) => {
    try {
      setLoading(true);
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${process.env.NEXT_PUBLIC_APIKEY}&s=${query}&page=${pageNumber}`
      );
      const data = await res.json();
      if (data.Response === "True") {
        setResults((prev) => [...prev, ...data.Search]);
      } else {
        if (pageNumber === 1) setResults([]);
      }
    } catch (err) {
      console.error("Encountered Error" + err);
    } finally {
      setLoading(false);
    }
  };

  // if user hasn't searched then show this.
  useEffect(() => {
    const defaults = ["Avengers", "Batman", "Harry Potter", "Boys"];
    const random = defaults[Math.floor(Math.random() * defaults.length)];
    fetchMovies(random, 1);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim() !== "") {
      setResults([]);
      setPage(1);
      fetchMovies(search, 1);
    }
  };

  const handleLoadMore = () => {
    const prevScrollY = window.scrollY; // remember scroll position.
    setPage((prev) => {
      const nextPage = page + 1;
      fetchMovies(search, nextPage).then(() => {
        window.scrollTo({ top: prevScrollY, behavior: "auto" });
      });
      return nextPage;
    });
  };

  const SkeletonCard = () => (
    <div className="bg-gray-700 rounded-lg pb-4 p-1 flex flex-col items-center animate-pulse">
      <div className="bg-gray-500 rounded-lg w-full h-[300px]" /> {/* Poster */}
      <div className="bg-gray-500 rounded w-[150px] h-4 mt-2" /> {/* Title */}
    </div>
  );

  return (
    <>
      {/* Navbar */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center bg-[#27272a]"
      >
        <Navbar value={search} onChange={setSearch} />
      </form>

      {/* Display Results */}
      <div className="bg-[#18181b] py-3">
        {loading ? (
          <div className="cards grid gap-6 px-5 lg:mx-20 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {Array.from({ length: 10 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : results && results.length > 0 ? (
          <div className="card grid gap-6 px-5 lg:mx-20 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 ">
            {results.map((item, index) => (
              <Link
                href={`/movie/${item.imdbID}`}
                key={`${item.imdbID}-${index}`}
                className="bg-[#27272a] hover:bg-[#434344]  rounded-lg"
              >
                <div className="flex flex-col justify-center items-center ">
                  <img
                    width={200}
                    height={300}
                    src={item.Poster !== "N/A"? item.Poster : "/noposter.jpg"}
                    alt={`${item.Title} Poster`}
                    className="rounded-t-lg w-full object-cover aspect-2/3"
                  />
                  <p className="break-words pb-2 mx-1 flex text-center items-center mt-2 text-white lg:h-[60px]">
                    {item.Title}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-red-500 px-2 text-center text-2xl">
            No movies found.
          </p>
        )}
      </div>

      {/* Load More Movies */}
      {results.length > 0 && (
        <>
          <p className="bg-gray-700 h-[1px]"></p>
          <div className="flex justify-center items-center bg-[#18181b] h-20">
            <button
              disabled={loading}
              className={`px-4 py-2 rounded my-2 hover:shadow-md ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-700 text-white "
              }`}
              onClick={handleLoadMore}
            >
              {loading ? "Loading..." : "Load More"}
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default Header;
