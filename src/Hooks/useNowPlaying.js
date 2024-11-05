import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addNowMoviePlay } from "../Utils/movieSlice";
import { API_OPTIONS } from "../Utils/constant";

const useNowPlayimg = () => {
  const dispatch = useDispatch();
  const getmovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?page=1",
      API_OPTIONS
    );
    const json = await data.json();
    // console.log(json.results);
    dispatch(addNowMoviePlay(json.results));
  };
  useEffect(() => {
    getmovies();
  }, []);
};

export default useNowPlayimg;
