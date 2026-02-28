import { useRef, useState } from "react";
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
  const [message, setMessage] = useState(null);
  const dispatch = useDispatch();

  const handleSign = () => {
    setSignUp(!signUp);
  };

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleSubmit = () => {
    const validation = Validate(email.current.value, password.current.value);
    setMessage(validation);
    if (validation) return;

    if (signUp) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          return updateProfile(user, {
            displayName: name.current.value,
            photoURL: avatar,
          }).then(() => {
            const updatedUser = auth.currentUser;
            dispatch(
              addUser({
                email: updatedUser.email,
                uid: updatedUser.uid,
                displayName: updatedUser.displayName,
                photoURL: updatedUser.photoURL,
              })
            );
          });
        })
        .catch((error) => {
          setMessage(error.code + " - " + error.message);
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then(() => {})
        .catch((error) => {
          setMessage(error.code + " - " + error.message);
        });
    }
  };

  return (
    <div
      className="flex relative flex-col h-screen bg-cover"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black opacity-70 z-0"></div>
      <Header />
      <div className="bg-transparent z-10 w-full h-full flex justify-center items-center">
        <div className="bg-black bg-opacity-50 bg-blend-overlay p-10 rounded-md w-[380px]">
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
                type="email"
                placeholder="Email or mobile number"
                className="w-full p-3 text-[12px] bg-transparent border border-gray-500 text-white rounded-md focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <input
                ref={password}
                type="password"
                autoComplete="current-password"
                placeholder="Password"
                className="w-full p-3 text-[12px] bg-transparent border border-gray-500 text-white rounded-md focus:outline-none"
              />
            </div>
            {message && <p className="text-red-600 text-sm mb-2">{message}</p>}
            <div className="flex justify-center items-center font-[300] flex-col gap-4">
              <button
                onClick={handleSubmit}
                type="submit"
                className="w-full py-[10px] bg-red-600 text-[12px] hover:bg-red-700 text-white font-[500] rounded-md"
              >
                {!signUp ? "Sign In" : "Sign Up"}
              </button>
            </div>
            <div
              onClick={handleSign}
              className="mt-3 text-[14px] font-[300] text-white cursor-pointer"
            >
              {!signUp ? (
                <p>
                  New to Netflix?&nbsp;
                  <span className="font-[400] hover:underline">
                    Sign up now.
                  </span>
                </p>
              ) : (
                <p>
                  Already have an account?&nbsp;
                  <span className="font-[400] hover:underline">
                    Sign in now.
                  </span>
                </p>
              )}
            </div>
            <div className="mt-5 text-[#8c8c8c] text-xs">
              <p>
                This page is protected by Google reCAPTCHA to ensure you're not
                a bot.&nbsp;
                <a
                  href="/"
                  className="text-blue-600 font-[400] hover:underline"
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
