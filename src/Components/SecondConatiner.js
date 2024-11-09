import React from "react";
import { useSelector } from "react-redux";
import MoviesList from "./MoviesList";

const SecondConatiner = () => {
  const playingMovies = useSelector((store) => store.movies?.nowPlayingMovies);
  const popularMovies = useSelector((store) => store.movies?.nowPopularMovies);
  const topMovies = useSelector((store) => store.movies?.nowTopRatedMovies);
  const upcommingMovies = useSelector(
    (store) => store.movies?.nowUpcommingMovies
  );

  return (
    <>
      <div className="bg-black flex flex-col gap-10">
        <MoviesList title={"NowPlaying"} movies={playingMovies} />
        <MoviesList title={"PopularPlaying"} movies={popularMovies} />
        <MoviesList title={"TopPlaying"} movies={topMovies} />
        <MoviesList title={"Upcomming "} movies={upcommingMovies} />
      </div>
    </>
  );
};

export default SecondConatiner;
