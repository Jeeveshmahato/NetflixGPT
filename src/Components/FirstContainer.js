import React from "react";
import TitleContainer from "./TitleContainer";
import { useSelector } from "react-redux";
import VideoContainer from "./VideoContainer";

const FirstContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
//   console.log(movies);
  if (!movies) return;
  const mainMovie = movies[0];
  // console.log(mainMovie);
  const { title, overview, id } = mainMovie;
  return (
    <>
    <div className=" pt-[100px] lg:pt-0">

    <TitleContainer title={title} overview={overview} />

<VideoContainer movieId={id} />
    </div>
    </>
  );
};

export default FirstContainer;
