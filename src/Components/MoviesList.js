import MovieCard from "./MovieCard";

const MoviesList = ({ title, movies }) => {
  if (!movies) return null;
  return (
    <div className="px-4 sm:px-6 lg:px-12">
      <h2 className="text-base sm:text-lg lg:text-xl text-white font-bold mb-2 sm:mb-3">
        {title}
      </h2>
      <div className="flex overflow-x-scroll scrollbar-hide gap-2 sm:gap-3 pb-2">
        {movies.map((movie) => (
          <MovieCard key={movie.id} posterPath={movie.poster_path} />
        ))}
      </div>
    </div>
  );
};

export default MoviesList;
