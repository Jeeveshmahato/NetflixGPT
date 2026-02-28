import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNowUpcomingMovies } from "../Utils/movieSlice";
import { API_OPTIONS } from "../Utils/constant";

const useUpcomingMovies = () => {
  const dispatch = useDispatch();
  const nowUpcomingMovies = useSelector((store) => store.movies.nowUpcomingMovies);

  useEffect(() => {
    if (nowUpcomingMovies) return;

    const getUpcomingMovies = async () => {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/upcoming?page=1",
        API_OPTIONS
      );
      if (!response.ok) return;
      const json = await response.json();
      dispatch(addNowUpcomingMovies(json.results));
    };

    getUpcomingMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, nowUpcomingMovies]);
};

export default useUpcomingMovies;
