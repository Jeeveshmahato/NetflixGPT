import { Image_URL } from "../Utils/constant";

const MovieCard = ({ posterPath }) => {
  if (!posterPath) return null;
  return (
    <div className="flex-shrink-0 w-[120px] sm:w-[150px] lg:w-[180px] transition-transform duration-300 hover:scale-110 hover:z-10 cursor-pointer">
      <img
        className="w-full rounded-sm"
        src={Image_URL + posterPath}
        alt="Movie poster"
        loading="lazy"
      />
    </div>
  );
};

export default MovieCard;
