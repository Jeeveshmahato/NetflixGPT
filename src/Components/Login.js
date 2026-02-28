import { useRef, useState } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
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
  const [showPassword, setShowPassword] = useState(false);
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
      <div className="bg-transparent z-10 w-full h-full flex justify-center items-center px-4">
        <div className="bg-black/75 backdrop-blur-sm p-8 sm:p-12 rounded-md w-full max-w-[400px]">
          <h2 className="text-3xl text-white font-bold mb-7">
            {!signUp ? "Sign In" : "Sign Up"}
          </h2>
          <form onSubmit={(e) => e.preventDefault()}>
            {signUp && (
              <div className="mb-5 w-full">
                <input
                  ref={name}
                  type="text"
                  placeholder="Full name"
                  className="w-full p-4 text-sm bg-[#333] border border-[#333] text-white rounded focus:outline-none focus:border-white/50 placeholder-gray-400 transition-colors"
                />
              </div>
            )}
            <div className="mb-5">
              <input
                ref={email}
                type="email"
                placeholder="Email or mobile number"
                className="w-full p-4 text-sm bg-[#333] border border-[#333] text-white rounded focus:outline-none focus:border-white/50 placeholder-gray-400 transition-colors"
              />
            </div>
            <div className="mb-5 relative">
              <input
                ref={password}
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Password"
                className="w-full p-4 pr-12 text-sm bg-[#333] border border-[#333] text-white rounded focus:outline-none focus:border-white/50 placeholder-gray-400 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors p-1"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <IoEyeOffOutline size={20} />
                ) : (
                  <IoEyeOutline size={20} />
                )}
              </button>
            </div>
            {message && <p className="text-red-500 text-sm mb-4">{message}</p>}
            <div className="flex justify-center items-center flex-col gap-4">
              <button
                onClick={handleSubmit}
                type="submit"
                className="w-full py-3 bg-red-600 text-base hover:bg-red-700 text-white font-semibold rounded transition-colors"
              >
                {!signUp ? "Sign In" : "Sign Up"}
              </button>
            </div>
            <div
              onClick={handleSign}
              className="mt-4 text-base text-gray-400 cursor-pointer"
            >
              {!signUp ? (
                <p>
                  New to Netflix?&nbsp;
                  <span className="text-white font-medium hover:underline">
                    Sign up now.
                  </span>
                </p>
              ) : (
                <p>
                  Already have an account?&nbsp;
                  <span className="text-white font-medium hover:underline">
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
