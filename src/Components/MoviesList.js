import React from "react";
import MovieCard from "./MovieCard";

const MoviesList = ({ title, movies }) => {
  // console.log(movies);
  return (
    <>
      <div className=" flex flex-col gap-5">
        <h2 className=" text-3xl text-white font-[700]">{title}</h2>
        <div className=" flex overflow-x-scroll gap-5">
          {movies?.map((movie) => (
            <MovieCard key={movie.id} posterPath={movie.poster_path} />
          ))}
        </div>
      </div>
    </>
  );
};

export default MoviesList;
