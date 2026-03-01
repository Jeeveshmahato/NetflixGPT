import { useEffect } from "react";
import { API_OPTIONS } from "../Utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addNowTrailer } from "../Utils/movieSlice";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();
  const trailer = useSelector((store) => store.movies.nowPlayTrailers);

  useEffect(() => {
    if (trailer || !movieId) return;

    const getVideo = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos`,
        API_OPTIONS
      );
      if (!response.ok) return;
      const json = await response.json();
      const trailers = json.results.filter((video) => video.type === "Trailer");
      const mainTrailer = trailers.length ? trailers[0] : json.results[0];
      if (mainTrailer) dispatch(addNowTrailer(mainTrailer));
    };

    getVideo();
  }, [movieId, dispatch, trailer]);
};

export default useMovieTrailer;
