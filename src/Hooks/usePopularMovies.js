import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNowPopularMovies } from "../Utils/movieSlice";
import { API_OPTIONS } from "../Utils/constant";

const usePopularMovies = () => {
  const dispatch = useDispatch();
  const nowPopularMovie = useSelector((store) => store.movies.nowPopularMovie);
  const getPopularMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1r",
      API_OPTIONS
    );
    const json = await data.json();
    // console.log(json.results);
    dispatch(addNowPopularMovies(json.results));
  };
  useEffect(() => {
    !nowPopularMovie && getPopularMovies();
  }, []);
};

export default usePopularMovies;
