import { useSelect } from "@material-tailwind/react";
import FirstContainer from "./FirstContainer";
import SecondConatiner from "./SecondConatiner";
import { useSelector } from "react-redux";
import GptSearch from "./GptSearch";

const MainComponent = () => {
  const Gpt = useSelector((store) => store.gpt.SearchGpt);
  return (
    <>
      <div className=" bg-black ">
        {Gpt ? (
          <GptSearch />
        ) : (
          <>
            <FirstContainer />
            <div className="  relative z-10">
              <SecondConatiner />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default MainComponent;
