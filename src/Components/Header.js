import React, { useEffect } from "react";
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
        dispatch(
          addUser({
            email: email,
            uid: uid,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/");
      } else {
        navigate("/login");

        dispatch(removeUser());
      }
    });
    return () => unSubscribe();
  }, []);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {});
  };
  const handleGptSearch = () => {
    dispatch(addSearch());
  };
  const handleLang = (e) => {
    dispatch(changeLanguage(e.target.value));
    console.log(e.target.value);
  };
  return (
    <>
      <div className="  relative  bg-gradient-to-b from-black  ">
        <div className=" absolute z-10 px-32 flex justify-between w-full">
          {" "}
          {/* Netflix Logo */}
          <img className=" w-40" src={Logo} alt="lo  go" />
          {/* Language and Sign In */}
          {user && (
            <div className="flex items-center space-x-5">
              {GptSearch && (
                <select
                  className="bg-transparent px-4 py-[5px] active:text-white text-white border border-gray-500 rounded"
                  name="language"
                  onChange={handleLang}
                >
                  {SelectLanguage.map((lang) => (
                    <option
                      className="active:text-white  text-black"
                      value={lang.identifer}
                    >
                      {lang.name}
                    </option>
                  ))}
                </select>
              )}
              <button onClick={handleGptSearch} className=" bg-purple-700 px-4 py-[5px] flex items-center justify-center h-fit  rounded text-white font-[500]">
                {GptSearch ? "HomePage" : "GptSearch"}
              </button>
              <img className="w-14 h-14 object-cover" src={user.photoURL} />

              <button
                onClick={handleSignOut}
                className="bg-red-600 px-4 py-[5px] flex items-center justify-center h-fit  rounded text-white font-[500]"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
