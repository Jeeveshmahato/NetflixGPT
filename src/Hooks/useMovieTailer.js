import React, { useEffect } from "react";
import { API_OPTIONS } from "../Utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addNowTailer } from "../Utils/movieSlice";

const useMovieTailer = (movieId) => {
  const dispatch = useDispatch();
  const movieTailer = useSelector((store) => store.movies.nowPlayTailers);
  const getvideo = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos`,
      API_OPTIONS
    );
    const json = await data.json();
    // console.log(json);
    const tailer = json.results.filter((video) => video.type === "Trailer");
    // console.log(tailer);
    const mainTailer = tailer.length ? tailer[0] : json.results[0];
    // console.log(mainTailer);
    dispatch(addNowTailer(mainTailer));
  };
  useEffect(() => {
   !movieTailer && getvideo();
  }, []);
  return <></>;
};

export default useMovieTailer;
