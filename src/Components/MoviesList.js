import { useRef, useEffect } from "react";
import MovieCard from "./MovieCard";
import useFetchMoreMovies from "../Hooks/useFetchMoreMovies";

const MoviesList = ({ title, movies, categoryKey }) => {
  const scrollContainerRef = useRef(null);
  const sentinelRef = useRef(null);
  const { fetchMore, loading, hasMore } = useFetchMoreMovies(categoryKey);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    const container = scrollContainerRef.current;
    if (!sentinel || !container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          fetchMore();
        }
      },
      {
        root: container,
        rootMargin: "0px 300px 0px 0px",
        threshold: 0.1,
      }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [fetchMore]);

  if (!movies) return null;

  return (
    <div className="px-4 sm:px-6 lg:px-12">
      <h2 className="text-base sm:text-lg lg:text-xl text-white font-bold mb-2 sm:mb-3">
        {title}
      </h2>
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-scroll scrollbar-hide gap-2 sm:gap-3 pb-2"
      >
        {movies.map((movie) => (
          <MovieCard key={movie.id} posterPath={movie.poster_path} />
        ))}
        {/* Sentinel element at the end for infinite scroll */}
        {hasMore && (
          <div
            ref={sentinelRef}
            className="flex-shrink-0 w-[60px] flex items-center justify-center"
          >
            {loading && (
              <div className="w-6 h-6 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MoviesList;
