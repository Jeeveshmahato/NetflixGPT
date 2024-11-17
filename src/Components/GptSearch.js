import React, { useRef } from "react";
import { API_OPTIONS, backgroundImage } from "../Utils/constant";
import lang from "../Utils/LanguageConstant";
import { useDispatch, useSelector } from "react-redux";
import { addGptMovies } from "../Utils/GptSlice";
import GptMovies from "./GptMovies";

const GptSearch = () => {
  const inputtext = useRef(null);
  const dispatch = useDispatch();
  const langkey = useSelector((store) => store.language.language);
  // console.log(langkey);
  const handleButton = async () => {
    const findMovie = inputtext.current.value;

    console.log(findMovie);
    const getMovies = async () => {
      const data = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${findMovie}&include_adult=false&language=en-US&page=1`,
        API_OPTIONS
      );
      const json = await data.json();
      const movies = json.results;
      dispatch(addGptMovies({ searchMovie: findMovie, GptMovies: movies }));
      console.log(movies);
    };
    getMovies();
  };

  return (
    <div
      className="flex flex-col items-center relative  justify-center gap-3  h-screen bg-cover"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="absolute inset-0 bg-black opacity-70 z-0"></div>
      <div className=" z-10 flex items-center">
        <input
          ref={inputtext}
          type="text"
          className="h-fit border-4 border-black p-3"
          placeholder={lang[langkey].gptSearchPlaceholder}
        />
        <button
          onClick={handleButton}
          className="bg-red-600 px-4 py-3 flex items-center justify-center h-fit  rounded text-white font-[500]"
        >
          {lang[langkey].search}
        </button>
      </div>
  <div className=" px-[20px] z-10">
  <GptMovies />
  </div>
    </div>
  );
};

export default GptSearch;
