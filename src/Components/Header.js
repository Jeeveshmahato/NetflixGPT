import React from "react";
import Logo from "../Assests/Login/Netflix_Logo_PMS.png";
import { signOut } from "firebase/auth";
import { auth } from "../Utils/Firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const user = useSelector( store => store.user)
  const navigate = useNavigate();
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        navigate("/test");
        // An error happened.
      });
  };
  return (
    <>
      <div className="relative z-10 px-32 bg-gradient-to-b from-black  flex justify-between p-5">
        {/* Netflix Logo */}
        <img className=" w-40" src={Logo} alt="lo  go" />

        {/* Language and Sign In */}
       { user && <div className="flex items-center space-x-5">
          {/* <select
            className="bg-transparent px-4 py-[5px] active:text-white text-white border border-gray-500 rounded"
            name="language"
          >
            <option className="active:text-white text-black">English</option>
            <option className="active:text-white text-black">हिन्दी</option>
          </select> */}
          <img className="w-14 h-14 object-cover" src={user.photoURL}/>

          <button
            onClick={handleSignOut}
            className="bg-red-600 px-4 py-[5px] flex items-center justify-center h-fit  rounded text-white font-[500]"
          >
            Sign Out
          </button>
        </div>}
      </div>
    </>
  );
};

export default Header;
