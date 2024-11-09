import React from "react";
import Header from "./Header";
import usePopularMovies from "../Hooks/usePopularMovies";
import useTopRatedMovies from "../Hooks/useTopRatedMovies";
import useUpcommingMovies from "../Hooks/useUpcommingMovies";
import useNowPlaying from "../Hooks/useNowPlaying";
import MainComponent from "./MainComponent";

const Home = () => {
  useNowPlaying();
  usePopularMovies();
  useTopRatedMovies();
  useUpcommingMovies();
  

  return (
    <>
      <div className="relative w-screen overflow-x-hidden h-screen bg-blend-overlay bg-gradient-to- from-black  ">
        <Header />
        <MainComponent />
      </div>
    </>
  );
};

export default Home;
