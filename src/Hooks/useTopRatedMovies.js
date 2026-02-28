import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNowTopRatedMovies } from "../Utils/movieSlice";
import { API_OPTIONS } from "../Utils/constant";

const useTopRatedMovies = () => {
  const dispatch = useDispatch();
  const nowTopRatedMovies = useSelector((store) => store.movies.nowTopRatedMovies);

  useEffect(() => {
    if (nowTopRatedMovies) return;

    const getTopRatedMovies = async () => {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/top_rated?page=1",
        API_OPTIONS
      );
      if (!response.ok) return;
      const json = await response.json();
      dispatch(addNowTopRatedMovies(json.results));
    };

    getTopRatedMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, nowTopRatedMovies]);
};

export default useTopRatedMovies;
