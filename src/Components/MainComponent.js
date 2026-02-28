import FirstContainer from "./FirstContainer";
import SecondContainer from "./SecondContainer";
import { useSelector } from "react-redux";
import GptSearch from "./GptSearch";

const MainComponent = () => {
  const Gpt = useSelector((store) => store.gpt.SearchGpt);
  return (
    <div className="bg-black">
      {Gpt ? (
        <GptSearch />
      ) : (
        <>
          <FirstContainer />
          <div className="relative z-10">
            <SecondContainer />
          </div>
        </>
      )}
    </div>
  );
};

export default MainComponent;
