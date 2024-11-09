import FirstContainer from "./FirstContainer";
import SecondConatiner from "./SecondConatiner";

const MainComponent = () => {
  return (
    <>
     <div className=" bg-black ">
     <FirstContainer />
    <div className=" -mt-40 relative z-10">
    <SecondConatiner />
    </div>
     </div>
    </>
  );
};

export default MainComponent;
