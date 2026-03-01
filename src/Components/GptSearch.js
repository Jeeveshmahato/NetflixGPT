import { useRef } from "react";
import { API_OPTIONS, backgroundImage } from "../Utils/constant";
import lang from "../Utils/LanguageConstant";
import { useDispatch, useSelector } from "react-redux";
import { addGptMovies } from "../Utils/GptSlice";
import GptMovies from "./GptMovies";

const GptSearch = () => {
  const inputtext = useRef(null);
  const dispatch = useDispatch();
  const langkey = useSelector((store) => store.language.language);

  const handleButton = async () => {
    const findMovie = inputtext.current.value.trim();
    if (!findMovie) return;

    const encodedQuery = encodeURIComponent(findMovie);
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${encodedQuery}&include_adult=false&language=en-US&page=1`,
      API_OPTIONS
    );
    if (!response.ok) return;
    const json = await response.json();
    dispatch(addGptMovies({ searchMovie: findMovie, GptMovies: json.results }));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleButton();
  };

  return (
    <div
      className="flex flex-col items-center relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black/80"></div>
      <div className="z-10 w-full max-w-2xl px-4 sm:px-6 pt-28 sm:pt-36">
        <div className="flex w-full rounded-full overflow-hidden shadow-lg">
          <input
            ref={inputtext}
            type="text"
            onKeyDown={handleKeyDown}
            className="flex-1 px-4 sm:px-6 py-3 sm:py-4 bg-white/10 backdrop-blur-sm text-white placeholder-gray-400 border border-gray-600 rounded-l-full focus:outline-none focus:border-red-500 text-base transition-colors min-h-[44px]"
            placeholder={lang[langkey].gptSearchPlaceholder}
          />
          <button
            onClick={handleButton}
            className="bg-red-600 px-4 sm:px-8 py-3 sm:py-4 text-white font-semibold text-base hover:bg-red-700 transition-colors whitespace-nowrap min-h-[44px]"
          >
            {lang[langkey].search}
          </button>
        </div>
      </div>
      <div className="z-10 w-full mt-8 pb-8">
        <GptMovies />
      </div>
    </div>
  );
};

export default GptSearch;
