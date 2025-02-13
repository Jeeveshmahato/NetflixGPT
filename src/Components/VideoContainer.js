import { useSelector } from "react-redux";
import useMovieTailer from "../Hooks/useMovieTailer";

const VideoContainer = ({ movieId }) => {
  const TailerVideo = useSelector((store) => store.movies?.nowPlayTailers);
  useMovieTailer(movieId);

  return (
    <div className="w-full pt-[-20px] ">
      <iframe
        className="w-full aspect-video"
        src={`https://www.youtube.com/embed/${TailerVideo?.key}?autoplay=1&mute=1&controls=0&modestbranding=1&showinfo=0&loop=1`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>
    </div>
  );
};

export default VideoContainer;
