import { useEffect } from "react";
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
    <div className="relative bg-gradient-to-b from-black">
      <div className="absolute z-10 px-[20px] lg:px-32 flex lg:flex-row flex-col justify-between w-full">
        <img className="w-40 mx-auto" src={Logo} alt="Netflix Logo" />
        {user && (
          <div className="flex mx-auto items-center space-x-4">
            {GptSearch && (
              <div className="relative inline-flex items-center">
                <IoGlobeOutline className="absolute left-3 text-white pointer-events-none" size={16} />
                <select
                  className="appearance-none bg-black/60 pl-9 pr-8 py-2 text-sm text-white border border-gray-500 rounded hover:border-white focus:border-white focus:outline-none cursor-pointer transition-colors"
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
                <IoChevronDown className="absolute right-2 text-white pointer-events-none" size={14} />
              </div>
            )}
            <button
              onClick={handleGptSearch}
              className="bg-purple-700 px-4 py-2 flex items-center justify-center h-fit rounded text-sm text-white font-medium hover:bg-purple-800 transition-colors"
            >
              {GptSearch ? "HomePage" : "Search"}
            </button>
            {user.photoURL && (
              <img
                className="w-10 h-10 object-cover rounded-full"
                src={user.photoURL}
                alt="User avatar"
              />
            )}
            <button
              onClick={handleSignOut}
              className="bg-red-600 px-4 py-2 text-sm lg:text-base flex items-center justify-center h-fit rounded text-white font-medium hover:bg-red-700 transition-colors"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
