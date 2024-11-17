import React from "react";
import { useSelector } from "react-redux";
import MoviesList from "./MoviesList";

const GptMovies = () => {
  const movies = useSelector((store) => store.gpt);
  const { searchMovie, GptMovies } = movies;
  if (!searchMovie) return null;
  if (!GptMovies) return null;
  return (
    <>
      <div className=" ">
        <MoviesList
          key={searchMovie}
          title={searchMovie}
          movies={GptMovies}
        />
      </div>
    </>
  );
};

export default GptMovies;
