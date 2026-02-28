import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNowPopularMovies } from "../Utils/movieSlice";
import { API_OPTIONS } from "../Utils/constant";

const usePopularMovies = () => {
  const dispatch = useDispatch();
  const nowPopularMovies = useSelector((store) => store.movies.nowPopularMovies);

  useEffect(() => {
    if (nowPopularMovies) return;

    const getPopularMovies = async () => {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
        API_OPTIONS
      );
      if (!response.ok) return;
      const json = await response.json();
      dispatch(addNowPopularMovies(json.results));
    };

    getPopularMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, nowPopularMovies]);
};

export default usePopularMovies;
