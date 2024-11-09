import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {addNowPopularMovies } from "../Utils/movieSlice";
import { API_OPTIONS } from "../Utils/constant";

const usePopularMovies = () => {
  const dispatch = useDispatch();
  const getPopularMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/popular?&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    // console.log(json.results);
    dispatch(addNowPopularMovies(json.results));
  };
  useEffect(() => {
    getPopularMovies();
  }, []);
};

export default usePopularMovies;
