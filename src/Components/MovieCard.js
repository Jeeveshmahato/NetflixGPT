import { Image_URL } from "../Utils/constant";

const MovieCard = ({ posterPath }) => {
  if (!posterPath) return null;
  return (
    <img
      className="w-[200px] h-[200px] object-cover"
      src={Image_URL + posterPath}
      alt="Movie poster"
      loading="lazy"
    />
  );
};

export default MovieCard;
