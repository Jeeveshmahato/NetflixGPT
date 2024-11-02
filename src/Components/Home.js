import React ,{useState} from 'react'
import BackgroundImage from "../Assests/Login/background_image.jpg";
import Header from "./Header";

const Home = () => {
  const [email, setEmail] = useState("sdc");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  return (
    <>
      <div className="relative w-screen h-screen bg-blend-overlay bg-gradient-to-t from-black  text-white">
      {/* Background Image */}
      <div className="absolute inset-0  h-[100vh] bg-black opacity-70 bg-no-repeat bg-cover bg-center">
        <img
          src={BackgroundImage}
          alt="Netflix Background"
          layout="fill"
          objectFit="cover"
          className="z-0 h-[100vh] w-full bg-no-repeat "
        />
      </div>
      <div className="absolute inset-0 bg-black opacity-70 z-0"></div>
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="relative  items-center justify-center z-10 flex flex-col h-[70vh] text-center">
        <h1 className="text-5xl md:text-6xl font-bold">
          Unlimited movies, TV <br></br> shows and more
        </h1>
        <p className="text-xl mt-5">Starts at ₹149. Cancel at any time.</p>
        <p className="text-lg mt-3">
          Ready to watch? Enter your email to create or restart your membership.
        </p>

        {/* Email and Get Started Section */}
        <div className="mt-8 flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Email address"
            className="p-4 w-80 md:w-96 rounded bg-black bg-opacity-50 text-white border border-gray-500 placeholder-gray-400"
          />
          <button className="bg-red-600 p-4 rounded text-white font-semibold">
            Get Started &gt;
          </button>
        </div>
      </div>
    </div>
    </>
  )
}

export default Home