import { useSelector } from "react-redux";
import MoviesList from "./MoviesList";

const GptMovies = () => {
  const { searchMovie, GptMovies: movies } = useSelector((store) => store.gpt);
  if (!searchMovie || !movies) return null;

  return (
    <div>
      <MoviesList key={searchMovie} title={searchMovie} movies={movies} />
    </div>
  );
};

export default GptMovies;
