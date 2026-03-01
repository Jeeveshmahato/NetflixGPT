import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../Utils/Firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../Utils/userSlice";
import { Logo, SelectLanguage } from "../Utils/constant";
import { addSearch } from "../Utils/GptSlice";
import { changeLanguage } from "../Utils/LanguageSlice";
import { IoGlobeOutline, IoChevronDown } from "react-icons/io5";

const Header = () => {
  const user = useSelector((store) => store.user);
  const GptSearch = useSelector((store) => store.gpt.SearchGpt);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, displayName, email, photoURL } = user;
        dispatch(addUser({ email, uid, displayName, photoURL }));
        navigate("/");
      } else {
        dispatch(removeUser());
        navigate("/login");
      }
    });
    return () => unSubscribe();
  }, []);

  const handleSignOut = () => {
    signOut(auth).catch((error) => {
      console.error("Sign out failed:", error.message);
    });
  };

  const handleGptSearch = () => {
    dispatch(addSearch());
  };

  const handleLang = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-black/95 shadow-lg" : "bg-gradient-to-b from-black/80 via-black/40 to-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-3 sm:px-6 lg:px-12 py-2 sm:py-3">
        <img
          className="w-20 sm:w-28 lg:w-36"
          src={Logo}
          alt="Netflix Logo"
        />
        {user && (
          <div className="flex items-center gap-1.5 sm:gap-3 lg:gap-4">
            {GptSearch && (
              <div className="relative inline-flex items-center">
                <IoGlobeOutline
                  className="absolute left-2 sm:left-3 text-white pointer-events-none"
                  size={14}
                />
                <select
                  className="appearance-none bg-black/60 pl-7 sm:pl-9 pr-6 sm:pr-8 py-1.5 sm:py-2 text-xs sm:text-sm text-white border border-gray-500 rounded hover:border-white focus:border-white focus:outline-none cursor-pointer transition-colors min-h-[36px] sm:min-h-[40px]"
                  name="language"
                  onChange={handleLang}
                >
                  {SelectLanguage.map((lang) => (
                    <option
                      key={lang.identifier}
                      className="bg-black text-white"
                      value={lang.identifier}
                    >
                      {lang.name}
                    </option>
                  ))}
                </select>
                <IoChevronDown
                  className="absolute right-1.5 sm:right-2 text-white pointer-events-none"
                  size={12}
                />
              </div>
            )}
            <button
              onClick={handleGptSearch}
              className="bg-purple-700 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded text-xs sm:text-sm text-white font-medium hover:bg-purple-800 transition-colors whitespace-nowrap min-h-[36px] sm:min-h-[44px]"
            >
              {GptSearch ? "Home" : "Search"}
            </button>
            {user.photoURL && /^https:\/\//.test(user.photoURL) && (
              <img
                className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 object-cover rounded"
                src={user.photoURL}
                alt="User avatar"
                referrerPolicy="no-referrer"
              />
            )}
            <button
              onClick={handleSignOut}
              className="bg-red-600 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded text-xs sm:text-sm text-white font-medium hover:bg-red-700 transition-colors min-h-[36px] sm:min-h-[44px]"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
