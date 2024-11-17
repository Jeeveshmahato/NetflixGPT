import React, { useRef, useState } from "react";
import BackgroundImage from "../Assests/Login/background_image.jpg";
import Header from "./Header";
import Validate from "../Utils/Validate";
import { auth } from "../Utils/Firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../Utils/userSlice";
import { avatar, backgroundImage } from "../Utils/constant";
function SignIn() {
  const [signUp, setSignUp] = useState(false);
  const [message, setmessage] = useState(null);
  const dispatch = useDispatch();
  const handlesign = () => {
    setSignUp(!signUp);
  };
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const handleSubmit = () => {
    // console.log(
    //   email.current.value,
    //   password.current.value,
    //   name.current.value
    // );
    const validation = Validate(email.current.value, password.current.value);
    setmessage(validation);
    // console.log(validation);
    if (validation) return;

    if (signUp) {
      // Sigup logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          // console.log(user);
          return updateProfile(user, {
            displayName: name.current.value,
            photoURL:avatar,
          })
            .then(() => {
              const updatedUser = auth.currentUser;
              dispatch(
                addUser({
                  email: updatedUser.email,
                  uid: updatedUser.uid,
                  displayName: updatedUser.displayName,
                  photoURL: updatedUser.photoURL,
                })
              );
            })
            .catch((error) => {
              setmessage(error.message);
            });
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setmessage(errorCode, errorMessage);
          // ..
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // console.log(user);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setmessage(errorCode, errorMessage);
        });
    }
  };
  return (
    <div
      className="flex relative  flex-col h-screen bg-cover"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="absolute inset-0 bg-black opacity-70 z-0"></div>

      <Header />
      <div className=" bg-transparent z-10 bg-opacity-70s w-full h-full flex justify-center items-center">
        <div className="bg-black bg-opacity-50s bg-blend-overlay p-10 rounded-md  w-[380px]">
          <h2 className="text-2xl text-white font-bold mb-4">
            {!signUp ? "Sign In" : "Sign Up"}
          </h2>
          <form onSubmit={(e) => e.preventDefault()}>
            {signUp && (
              <div className="mb-4 w-full">
                <input
                  ref={name}
                  type="text"
                  placeholder="Full name"
                  className="w-full p-3 text-[12px] bg-transparent border border-gray-500 text-white rounded-md focus:outline-none"
                />
              </div>
            )}
            <div className="mb-4">
              <input
                ref={email}
                type="text"
                placeholder="Email or mobile number"
                className="w-full p-3 text-[12px] bg-transparent border border-gray-500 text-white rounded-md focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <input
                ref={password}
                type="password"
                placeholder="Password"
                className="w-full p-3 text-[12px]  bg-transparent border border-gray-500 text-white rounded-md focus:outline-none"
              />
            </div>
            <p className="text-red-600">{message}</p>
            <div className=" flex justify-center items-center font-[300]  flex-col gap-4">
              <button
                onClick={handleSubmit}
                type="submit"
                className="w-full py-[10px] bg-red-600 text-[12px]  hover:bg-red-700 text-white font-[500] rounded-md"
              >
                {!signUp ? "Sign In" : "Sing Up"}
              </button>
              {/* <p className="text-[#a0a0a0] text-[14px]">OR</p>
              <button className="text-white w-full bg-[#3d3937] text-[14px] bg-opacity-70 px-8 py-[10px] font-[500] rounded-lg  text-lg hover:bg-opacity-80 transition duration-300">
                Use a sign-in code
              </button> */}
              <a
                href="#"
                className="hover:underline text-white text-[12px] font-[400]"
              >
                {!signUp ? "Forgot password?" : "Sign In Now..."}
              </a>
            </div>

            <div
              onClick={handlesign}
              className="mt-3 text-[14px] font-[300] text-white"
            >
              {!signUp ? (
                <p>
                  New to Netflix? &nbsp;
                  <a href="#" className=" font-[400] hover:underline">
                    Sing up now.
                  </a>
                </p>
              ) : (
                <p>
                  Already! have an account? &nbsp;
                  <a href="#" className=" font-[400] hover:underline">
                    Sing In now.
                  </a>
                </p>
              )}
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
