import React, { useState } from "react";

import BackgroundImage from "../Assests/Login/background_image.jpg";
import Header from "./Header";

function SignIn() {
  const [isChecked, setIsChecked] = useState(false); // Manage checkbox state
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked); // Toggle the state
  };
  return (
    <div
      className="flex relative  flex-col h-screen bg-cover"
      style={{
        backgroundImage: `url(${BackgroundImage})`,
      }}
    >
      <div className="absolute inset-0 bg-black opacity-70 z-0"></div>

      <Header />
      <div className=" bg-transparent z-10 bg-opacity-70s w-full h-full flex justify-center items-center">
        <div className="bg-black bg-opacity-50s bg-blend-overlay p-10 rounded-md  w-[380px]">
          <h2 className="text-2xl text-white font-bold mb-4">Sign In</h2>
          <form>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Email or mobile number"
                className="w-full p-3 text-[12px] bg-transparent border border-gray-500 text-white rounded-md focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                placeholder="Password"
                className="w-full p-3 text-[12px]  bg-transparent border border-gray-500 text-white rounded-md focus:outline-none"
              />
            </div>
            <div className=" flex justify-center items-center font-[300]  flex-col gap-4">
              <button
                type="submit"
                className="w-full py-[10px] bg-red-600 text-[12px]  hover:bg-red-700 text-white font-[500] rounded-md"
              >
                Sign In
              </button>
              <p className="text-[#a0a0a0] text-[14px]">OR</p>
              <button className="text-white w-full bg-[#3d3937] text-[14px] bg-opacity-70 px-8 py-[10px] font-[500] rounded-lg  text-lg hover:bg-opacity-80 transition duration-300">
                Use a sign-in code
              </button>
              <a href="/" className="hover:underline text-white text-[12px] font-[400]">
                Forgot password?
              </a>
            </div>
            <div className="flex justify-between text-[14px] items-center mt-4 text-sm text-white">
              <div className="flex items-center text-white">
                <input
                  type="checkbox"
                  id="rememberMe"
                  className={`mr-2 w-4 h-4 rounded-sm border-2 
                    ${isChecked ? 'bg-blue-600 border-blue-600' : 'bg-gray-400 border-gray-400'} 
                    focus:ring-0`}
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="rememberMe" className="cursor-pointer text-sm">
                  Remember me
                </label>
              </div>
            </div>
            <div className="mt-3 text-[14px] font-[300] text-white">
              <p>
                New to Netflix? &nbsp;
                <a href="/" className=" font-[400] hover:underline">
                  Sign up now.
                </a>
              </p>
            </div>
            <div className="mt-5 text-[#8c8c8c] text-xs ">
              <p>
                This page is protected by Google reCAPTCHA to ensure you're not
                a bot. &nbsp;
                <a
                  href="/"
                  className=" text-blue-600 font-[400] hover:underline"
                >
                  Learn more.
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
