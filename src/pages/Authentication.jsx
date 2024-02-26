import React, { useCallback } from "react";
import { LoginBg } from "../assets";
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { auth } from "../config/firebase.config";

function Authentication() {
  const googleProvider = new GoogleAuthProvider();
  
  const handleLoginAction = useCallback(async () => {
    try {
      const userCred = await signInWithRedirect(auth, googleProvider);
      if (userCred) {
        console.log(userCred);
      } else {
        console.log("no creds");
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div
      style={{
        background: `url(${LoginBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className="w-screen h-screen flex items-center justify-center"
    >
      <div className="w-full lg:w-96 px-4 py-4 rounded-md backdrop-blur-md flex items-center justify-center flex-col gap-6 bg-[rgba(255,255,255,0.1)]">
        <div className="flex flex-col items-center justify-center gap-2">
          <p className="text-2xl text-white">welcome</p>
          <p className="text-lg text-gray-300">Sign in to access your store</p>
        </div>

        <button
          onClick={handleLoginAction}
          className="w-full px-4 py-3 rounded-md flex items-center justify-center border border-gray-200 cursor-pointer active:scale-95 transition-all duration-150 ease-in-out gap-4 bg-[rgba(0,0,0,0.6)]"
        >
          <FcGoogle className="text-3xl " />
          <p className="text-lg font-semibold text-white">
            Sign in with Google
          </p>
        </button>
      </div>
    </div>
  );
}

export default Authentication;
