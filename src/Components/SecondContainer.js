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
    <div className="flex flex-col gap-10">
      <MoviesList title="Now Playing" movies={playingMovies} />
      <MoviesList title="Popular" movies={popularMovies} />
      <MoviesList title="Top Rated" movies={topMovies} />
      <MoviesList title="Upcoming" movies={upcomingMovies} />
    </div>
  );
};

export default SecondContainer;
