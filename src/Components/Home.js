import Header from "./Header";
import usePopularMovies from "../Hooks/usePopularMovies";
import useTopRatedMovies from "../Hooks/useTopRatedMovies";
import useUpcomingMovies from "../Hooks/useUpcomingMovies";
import useNowPlaying from "../Hooks/useNowPlaying";
import MainComponent from "./MainComponent";

const Home = () => {
  useNowPlaying();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();

  return (
    <div className="relative w-screen overflow-x-hidden h-screen bg-gradient-to-b from-black">
      <Header />
      <MainComponent />
    </div>
  );
};

export default Home;
