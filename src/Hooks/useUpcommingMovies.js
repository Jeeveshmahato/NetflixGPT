import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNowMoviePlay, addNowUpcommingMovies } from "../Utils/movieSlice";
import { API_OPTIONS } from "../Utils/constant";

const useUpcommingMovies = () => {
  const dispatch = useDispatch();
  const NowUpcommingMovies = useSelector((store) => store.movies.addNowUpcommingMovies);
  const getUpcommingMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/upcoming?&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    // console.log(json.results);
    dispatch(addNowUpcommingMovies(json.results));
  };
  useEffect(() => {
   !NowUpcommingMovies && getUpcommingMovies();
  }, []);
};

export default useUpcommingMovies;
