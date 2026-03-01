import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../Utils/constant";
import {
  appendNowPlayingMovies,
  appendPopularMovies,
  appendTopRatedMovies,
  appendUpcomingMovies,
  setPagination,
} from "../Utils/movieSlice";

const CATEGORY_CONFIG = {
  nowPlaying: {
    endpoint: "now_playing",
    appendAction: appendNowPlayingMovies,
  },
  popular: {
    endpoint: "popular",
    appendAction: appendPopularMovies,
    extraParams: "language=en-US&",
  },
  topRated: {
    endpoint: "top_rated",
    appendAction: appendTopRatedMovies,
  },
  upcoming: {
    endpoint: "upcoming",
    appendAction: appendUpcomingMovies,
  },
};

const useFetchMoreMovies = (categoryKey) => {
  const dispatch = useDispatch();
  const pagination = useSelector(
    (store) => store.movies.pagination[categoryKey]
  );

  const fetchMore = useCallback(async () => {
    if (!pagination || pagination.loading || !pagination.hasMore) return;

    const config = CATEGORY_CONFIG[categoryKey];
    if (!config) return;

    const nextPage = pagination.page + 1;

    dispatch(
      setPagination({
        category: categoryKey,
        data: { loading: true },
      })
    );

    try {
      const extraParams = config.extraParams || "";
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${config.endpoint}?${extraParams}page=${nextPage}`,
        API_OPTIONS
      );
      if (!response.ok) throw new Error("API error");
      const json = await response.json();

      dispatch(config.appendAction(json.results));
      dispatch(
        setPagination({
          category: categoryKey,
          data: {
            page: nextPage,
            totalPages: json.total_pages,
            loading: false,
            hasMore: nextPage < json.total_pages,
          },
        })
      );
    } catch (err) {
      dispatch(
        setPagination({
          category: categoryKey,
          data: { loading: false },
        })
      );
    }
  }, [dispatch, categoryKey, pagination]);

  return {
    fetchMore,
    loading: pagination?.loading || false,
    hasMore: pagination?.hasMore ?? true,
  };
};

export default useFetchMoreMovies;
