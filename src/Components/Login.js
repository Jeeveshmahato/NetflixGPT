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
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSign = () => {
    setSignUp(!signUp);
    setMessage(null);
  };

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleSubmit = () => {
    const validation = Validate(email.current.value, password.current.value);
    setMessage(validation);
    if (validation) return;

    setLoading(true);

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
          const msg = error.code === "auth/email-already-in-use"
            ? "This email is already registered. Try signing in."
            : error.code === "auth/weak-password"
            ? "Password is too weak. Use at least 6 characters."
            : "Sign up failed. Please try again.";
          setMessage(msg);
        })
        .finally(() => setLoading(false));
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then(() => {})
        .catch(() => {
          setMessage("Invalid email or password. Please try again.");
        })
        .finally(() => setLoading(false));
    }
  };

  return (
    <div
      className="flex relative flex-col min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black/60"></div>
      <Header />
      <div className="flex-1 flex justify-center items-center px-4 py-8 z-10">
        <div className="bg-black/75 backdrop-blur-sm p-6 sm:p-10 md:p-14 rounded-md w-full max-w-[450px]">
          <h2 className="text-2xl sm:text-3xl text-white font-bold mb-7">
            {!signUp ? "Sign In" : "Sign Up"}
          </h2>
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4">
            {signUp && (
              <input
                ref={name}
                type="text"
                placeholder="Full Name"
                className="w-full p-4 text-base bg-[#333] border border-[#333] text-white rounded focus:outline-none focus:border-white/50 placeholder-gray-400 transition-colors"
              />
            )}
            <input
              ref={email}
              type="email"
              placeholder="Email or mobile number"
              className="w-full p-4 text-base bg-[#333] border border-[#333] text-white rounded focus:outline-none focus:border-white/50 placeholder-gray-400 transition-colors"
            />
            <div className="relative">
              <input
                ref={password}
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Password"
                className="w-full p-4 pr-12 text-base bg-[#333] border border-[#333] text-white rounded focus:outline-none focus:border-white/50 placeholder-gray-400 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <IoEyeOffOutline size={20} />
                ) : (
                  <IoEyeOutline size={20} />
                )}
              </button>
            </div>
            {message && (
              <p className="text-red-500 text-sm">{message}</p>
            )}
            <button
              onClick={handleSubmit}
              type="submit"
              disabled={loading}
              className="w-full py-3 mt-2 bg-red-600 text-base hover:bg-red-700 text-white font-semibold rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px]"
            >
              {loading ? "Please wait..." : !signUp ? "Sign In" : "Sign Up"}
            </button>
            <div
              onClick={handleSign}
              className="mt-2 text-base text-gray-400 cursor-pointer"
            >
              {!signUp ? (
                <p>
                  New to Netflix?{" "}
                  <span className="text-white font-medium hover:underline">
                    Sign up now.
                  </span>
                </p>
              ) : (
                <p>
                  Already have an account?{" "}
                  <span className="text-white font-medium hover:underline">
                    Sign in now.
                  </span>
                </p>
              )}
            </div>
            <div className="mt-3 text-[#8c8c8c] text-xs leading-relaxed">
              <p>
                This page is protected by Google reCAPTCHA to ensure you're not
                a bot.{" "}
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
