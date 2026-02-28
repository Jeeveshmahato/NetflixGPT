import TitleContainer from "./TitleContainer";
import { useSelector } from "react-redux";
import VideoContainer from "./VideoContainer";

const FirstContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  if (!movies) return null;

  const { title, overview, id } = movies[0];

  return (
    <div className="pt-[100px] lg:pt-0">
      <TitleContainer title={title} overview={overview} />
      <VideoContainer movieId={id} />
    </div>
  );
};

export default FirstContainer;
