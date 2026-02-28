import { useSelector } from "react-redux";
import useMovieTrailer from "../Hooks/useMovieTrailer";

const VideoContainer = ({ movieId }) => {
  const trailerVideo = useSelector((store) => store.movies?.nowPlayTrailers);
  useMovieTrailer(movieId);

  if (!trailerVideo) return null;

  return (
    <div className="w-full">
      <iframe
        className="w-full aspect-video"
        src={`https://www.youtube.com/embed/${trailerVideo?.key}?autoplay=1&mute=1&controls=0&modestbranding=1&showinfo=0&loop=1`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        sandbox="allow-scripts allow-same-origin allow-presentation"
        loading="lazy"
      ></iframe>
    </div>
  );
};

export default VideoContainer;
