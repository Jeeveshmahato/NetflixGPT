import React from "react";
import Header from "./Header";

import useNowPlaying from "../Hooks/useNowPlaying";
import MainComponent from "./MainComponent";

const Home = () => {
  useNowPlaying();

  return (
    <>
      <div className="relative w-screen h-screen bg-blend-overlay bg-gradient-to- from-black  ">
        <Header />
        <MainComponent />
      </div>
    </>
  );
};

export default Home;
