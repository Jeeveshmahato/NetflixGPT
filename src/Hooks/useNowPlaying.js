import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNowMoviePlay } from "../Utils/movieSlice";
import { API_OPTIONS } from "../Utils/constant";

const useNowPlaying = () => {
  const dispatch = useDispatch();
  const nowPlayingMovies = useSelector((store) => store.movies.nowPlayingMovies);

  useEffect(() => {
    if (nowPlayingMovies) return;

    const getMovies = async () => {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/now_playing?page=1",
        API_OPTIONS
      );
      if (!response.ok) return;
      const json = await response.json();
      dispatch(addNowMoviePlay(json.results));
    };

    getMovies();
  }, []);
};

export default useNowPlaying;
