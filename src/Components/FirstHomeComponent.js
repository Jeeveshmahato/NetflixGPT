import React from "react";

const firstHomeComponent = ({ title, overview }) => {
  return (
    <>
      <div className=" absolute pt-[20%] text-white  bg-gradient-to-r from-black aspect-video  px-10 flex flex-col gap-5">
        <h2 className=" text-[44px] font-[700]">{title}</h2>
        <p className=" text-[20px] font-[400] w-[45%]">{overview}</p>
        <div className=" flex gap-3">
          <button className=" w-[200px] flex items-center rounded-lg text-white bg-gray-600 bg-opacity-40 text-[16px] font-[500] justify-center py-5 ">
            ▶️ Play
          </button>
          <button className=" w-[200px] flex items-center rounded-lg text-white bg-gray-600 bg-opacity-40 text-[16px] font-[500] justify-center py-5 ">
           ℹ️ Info
          </button>
        </div>
      </div>
    </>
  );
};

export default firstHomeComponent;
