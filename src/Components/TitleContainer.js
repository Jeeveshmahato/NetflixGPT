import React from "react";
import { IoPlay } from "react-icons/io5";
import { IoIosInformationCircle } from "react-icons/io";

const TitleContainer= ({ title, overview }) => {
  return (
    <>
      <div className=" absolute pt-[20%]  text-white  bg-gradient-to-r from-black aspect-video  px-10 flex flex-col gap-5">
        <h2 className=" text-xl md:text-2xl xl:text-3xl font-[700]">{title}</h2>
        <p className=" lg:block hidden text-[20px] font-[400] w-[45%]">{overview}</p>
        <div className=" flex gap-3">
          <button className=" px-3 lg:w-[200px] flex items-center gap-3 rounded-lg text-white bg-gray-600 bg-opacity-40 hover:bg-opacity-90 text-[16px] font-[500] justify-center py-3 ">
            <IoPlay /> <p>Play</p>
          </button>
          <button className=" px-3 lg:w-[200px] flex items-center gap-3 rounded-lg text-white bg-gray-600 bg-opacity-40 hover:bg-opacity-90 text-[16px] font-[500] justify-center py-3 ">
            <IoIosInformationCircle />
            <p>Info</p>
          </button>
        </div>
      </div>
    </>
  );
};

export default TitleContainer;
