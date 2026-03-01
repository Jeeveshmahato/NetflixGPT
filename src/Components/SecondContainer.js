import { useSelector } from "react-redux";
import MoviesList from "./MoviesList";

const SecondContainer = () => {
  const playingMovies = useSelector((store) => store.movies?.nowPlayingMovies);
  const popularMovies = useSelector((store) => store.movies?.nowPopularMovies);
  const topMovies = useSelector((store) => store.movies?.nowTopRatedMovies);
  const upcomingMovies = useSelector(
    (store) => store.movies?.nowUpcomingMovies
  );

  return (
    <div className="-mt-12 sm:-mt-10 lg:-mt-20 relative z-20 flex flex-col gap-6 sm:gap-8 pb-8">
      <MoviesList title="Now Playing" movies={playingMovies} categoryKey="nowPlaying" />
      <MoviesList title="Popular" movies={popularMovies} categoryKey="popular" />
      <MoviesList title="Top Rated" movies={topMovies} categoryKey="topRated" />
      <MoviesList title="Upcoming" movies={upcomingMovies} categoryKey="upcoming" />
    </div>
  );
};

export default SecondContainer;
