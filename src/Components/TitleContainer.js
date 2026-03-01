import { IoPlay } from "react-icons/io5";
import { IoIosInformationCircle } from "react-icons/io";

const TitleContainer = ({ title, overview }) => {
  return (
    <div className="absolute w-full aspect-video flex flex-col justify-end pb-[15%] sm:pb-[12%] px-4 sm:px-6 lg:px-12 bg-gradient-to-r from-black via-black/60 to-transparent">
      <h2 className="text-lg sm:text-2xl lg:text-4xl xl:text-5xl font-bold text-white max-w-[60%] sm:max-w-[50%] leading-tight">
        {title}
      </h2>
      <p className="hidden md:block text-sm lg:text-base text-gray-200 font-normal w-[40%] mt-3 line-clamp-3">
        {overview}
      </p>
      <div className="flex gap-2 sm:gap-3 mt-3 sm:mt-4">
        <button className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-6 lg:px-8 py-2 sm:py-2.5 rounded bg-white text-black text-xs sm:text-base lg:text-lg font-semibold hover:bg-white/80 transition-colors min-h-[36px] sm:min-h-[44px]">
          <IoPlay className="text-base sm:text-xl" />
          <span>Play</span>
        </button>
        <button className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-6 lg:px-8 py-2 sm:py-2.5 rounded bg-gray-500/60 text-white text-xs sm:text-base lg:text-lg font-semibold hover:bg-gray-500/40 transition-colors min-h-[36px] sm:min-h-[44px]">
          <IoIosInformationCircle className="text-base sm:text-xl" />
          <span>More Info</span>
        </button>
      </div>
    </div>
  );
};

export default TitleContainer;
