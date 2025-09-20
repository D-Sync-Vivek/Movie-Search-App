import React from "react";
import Link from "next/link";
const page = async ({ params }) => {
  let movieData = null;
  try {
    const { id } = await params;
    const res = await fetch(
      `https://www.omdbapi.com/?apikey=${process.env.NEXT_PUBLIC_APIKEY}&i=${id}`
    );
    movieData = await res.json();
  } catch (error) {
    console.log("Couldn't found the movie.");
  }

  const formatRuntime = (runtime) => {
    const minutes = parseInt(runtime);
    if (isNaN(minutes)) return runtime;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div>
      {movieData ? (
        <>
          <div className="grid md:grid-cols-2 justify-center items-center min-h-screen bg-[#18181b] overflow-hidden">
            <div className="poster flex justify-end mx-auto my-5">
              <img
                src={
                  movieData.Poster && movieData.Poster !== "N/A"
                    ? movieData.Poster
                    : "/noposter.jpg"
                }
                alt={`${movieData.Title} Poster`}
                className="border border-gray-600 shadow-2xl shadow-gray-800 rounded-2xl h-[500px] object-cover"
              />
            </div>
            {/* Movie Information */}
            <div className=" mx-auto rounded-r-lg px-5">
              <div className="text-white p-2 rounded-r-lg flex flex-col justify-center my-5">
                {/* Movie Title */}
                <span className="Title">
                  <h2 className="text-3xl font-bold ">{movieData.Title}</h2>
                </span>
                {/* Header*/}
                <div className="text-xs mt-2">
                  <div className="flex gap-2">
                    <span>{movieData.Type}</span> |
                    <span>{movieData.Genre}</span> |
                    <span>{movieData.Released}</span>
                  </div>
                </div>
                {/* Movie Rating */}
                <p className="h-[1px] bg-gray-600 my-5"></p>
                <div className="Ratings">
                  <div>
                    <span className="text-lg font-semibold">IMDb Rating: </span>
                    <span>⭐{movieData.imdbRating}/10</span>
                  </div>
                </div>

                {/* Movie Plot */}
                <div className="Movie Plot">
                  <span className="font-semibold">Plot: </span>
                  <span className="text-sm">{movieData.Plot}</span>
                </div>

                {/* Movie's Creators, Director, Casts */}
                <p className="h-[1px] bg-gray-600 my-5"></p>
                <div className="flex flex-col">
                  <div>
                    <span className="font-semibold">Writers: </span>
                    <span>{movieData.Writer}</span>
                  </div>
                  <div>
                    <span className="font-semibold">Director: </span>
                    <span>{movieData.Director}</span>
                  </div>
                  <div>
                    <span className="font-semibold">Actors: </span>
                    <span>{movieData.Actors}</span>
                  </div>
                </div>

                {/* Movie's Runtime,Languages  */}
                <p className="h-[1px] bg-gray-600 my-5"></p>
                <div>
                  <span className="font-semibold">Duration: </span>
                  <span>{formatRuntime(movieData.Runtime)}</span>
                </div>
                <div>
                  <span className="font-semibold">Languages: </span>
                  <span>{movieData.Language}</span>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div>Movie Not Found</div>
      )}
    </div>
  );
};

export default page;
