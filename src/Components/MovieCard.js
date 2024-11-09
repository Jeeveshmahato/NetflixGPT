import React from "react";
import { Image_URL } from "../Utils/constant";

const MovieCard = ({posterPath}) => {
  console.log(posterPath);
  return (
    <>
      <img className=" w-[200px] h-[200px]" src={Image_URL + posterPath} />
    </>
  );
};

export default MovieCard;
