import { useRef, useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import useFetchMoreMovies from "../Hooks/useFetchMoreMovies";

const MoviesList = ({ title, movies, categoryKey }) => {
  const scrollContainerRef = useRef(null);
  const sentinelRef = useRef(null);
  const { fetchMore, loading, hasMore } = useFetchMoreMovies(categoryKey);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  // Keep a stable ref to fetchMore so the observer never needs to reconnect
  const fetchMoreRef = useRef(fetchMore);
  fetchMoreRef.current = fetchMore;

  useEffect(() => {
    const sentinel = sentinelRef.current;
    const container = scrollContainerRef.current;
    if (!sentinel || !container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          fetchMoreRef.current();
        }
      },
      {
        root: container,
        rootMargin: "0px 400px 0px 0px",
        threshold: 0.1,
      }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []); // Stable — observer set up once

  // Track scroll position for arrow visibility
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      setShowLeftArrow(container.scrollLeft > 50);
      setShowRightArrow(
        container.scrollLeft < container.scrollWidth - container.clientWidth - 50
      );
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => container.removeEventListener("scroll", handleScroll);
  }, [movies]);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const scrollAmount = container.clientWidth * 0.75;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  if (!movies) return null;

  return (
    <div className="px-4 sm:px-6 lg:px-12 group/row">
      <h2 className="text-base sm:text-lg lg:text-xl text-white font-bold mb-2 sm:mb-3">
        {title}
      </h2>
      <div className="relative">
        {/* Left scroll arrow */}
        {showLeftArrow && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-0 bottom-0 z-10 w-10 bg-gradient-to-r from-[#141414] to-transparent flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity duration-200"
            aria-label="Scroll left"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        <div
          ref={scrollContainerRef}
          className="flex overflow-x-scroll scrollbar-hide gap-1.5 sm:gap-2 lg:gap-3 pb-2 scroll-smooth"
        >
          {movies.map((movie) => (
            <MovieCard key={movie.id} posterPath={movie.poster_path} />
          ))}
          {/* Sentinel element for infinite scroll — always rendered so ref stays attached */}
          <div
            ref={sentinelRef}
            className="flex-shrink-0 w-[80px] flex items-center justify-center"
            style={{ display: hasMore ? "flex" : "none" }}
          >
            {loading && (
              <div className="flex flex-col items-center gap-2">
                <div className="w-6 h-6 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </div>
        </div>

        {/* Right scroll arrow */}
        {showRightArrow && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-0 bottom-0 z-10 w-10 bg-gradient-to-l from-[#141414] to-transparent flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity duration-200"
            aria-label="Scroll right"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default MoviesList;
