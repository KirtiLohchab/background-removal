import React, { useEffect, useState } from "react";
import { assets } from "./../assets/assets";
import { Link } from "react-router-dom";
import { useClerk, useUser, UserButton } from "@clerk/clerk-react";

const Navbar = () => {
  const { openSignIn } = useClerk();
  const { isSignedIn, user } = useUser();
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
        <div>
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
