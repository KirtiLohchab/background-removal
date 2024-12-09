import React, { useContext, useEffect, useState } from "react";
import { assets } from "./../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { useClerk, useUser, UserButton } from "@clerk/clerk-react";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const { openSignIn } = useClerk();
  const { isSignedIn, user } = useUser();
  const { credit, loadCreditsData } = useContext(AppContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn) {
      loadCreditsData();
    }
  }, [isSignedIn]);

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, [isSignedIn, user]);

  if (!isReady) return null;

  return (
    <div className="flex items-center justify-between mx-4 py-3 lg:mx-44">
      <Link to="/">
        <img src={assets.logo} className="w-32 sm:w-44" alt="Logo" />
      </Link>
      {isSignedIn ? (
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => navigate("/buy")}
            className="flex items-center gap-2 bg-blue-100 px-4 py-1.5 sm:py-2.5 rounded-full hover:scale-105 transition-all duration-700"
          >
            <img className="w-5" src={assets.credit_icon} alt="" />
            <p className="text-xs sm:text-sm font-medium text-gray-600">
              Credits:{credit}
            </p>
          </button>
          <p className="text-gray-600 max-sm:hidden">Hi,{user.fullName} </p>
          <UserButton />
        </div>
      ) : (
        <button
          onClick={() => openSignIn({})}
          className="bg-gray-800 text-white flex items-center gap-4 px-4 py-2 sm:px-8 sm:py-3 text-sm rounded-full"
        >
          Get Started{" "}
          <img
            src={assets.arrow_icon}
            className="w-3 sm:w-4"
            alt="Arrow Icon"
          />
        </button>
      )}
    </div>
  );
};

export default Navbar;
