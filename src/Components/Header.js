import { useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../Utils/Firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../Utils/userSlice";
import { Logo, SelectLanguage } from "../Utils/constant";
import { addSearch } from "../Utils/GptSlice";
import { changeLanguage } from "../Utils/LanguageSlice";

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
          <div className="flex mx-auto items-center space-x-5">
            {GptSearch && (
              <select
                className="bg-transparent px-4 py-[5px] active:text-white text-white border border-gray-500 rounded"
                name="language"
                onChange={handleLang}
              >
                {SelectLanguage.map((lang) => (
                  <option
                    key={lang.identifier}
                    className="active:text-white text-black"
                    value={lang.identifier}
                  >
                    {lang.name}
                  </option>
                ))}
              </select>
            )}
            <button
              onClick={handleGptSearch}
              className="bg-purple-700 px-4 py-[5px] flex items-center justify-center h-fit rounded text-white font-[500]"
            >
              {GptSearch ? "HomePage" : "Search"}
            </button>
            {user.photoURL && (
              <img
                className="w-14 h-14 object-cover rounded-full"
                src={user.photoURL}
                alt="User avatar"
              />
            )}
            <button
              onClick={handleSignOut}
              className="bg-red-600 px-4 py-[5px] text-[16px] lg:text-[20px] flex items-center justify-center h-fit rounded text-white font-[500]"
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
