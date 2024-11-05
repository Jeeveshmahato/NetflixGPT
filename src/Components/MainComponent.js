import React from "react";
import FirstHomeComponent from "./FirstHomeComponent";
import { useSelector } from "react-redux";
import SecondHomeComponent from "./SecondHomeComponent";
const MainComponent = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  // console.log(movies);
  if (!movies) return;
  const mainMovie = movies[0];
  // console.log(mainMovie);
  const { title, overview, id } = mainMovie;
  return (
    <>
      <FirstHomeComponent title={title} overview={overview} />

      <SecondHomeComponent movieId={id} />
    </>
  );
};

export default MainComponent;
