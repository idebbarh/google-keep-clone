import { signInWithPopup } from "firebase/auth";
import React from "react";
import { useAppDispatch } from "../../app/hooks";
import { changeUserInfo } from "../../features/userInfoSlice";
import { auth, provider } from "../../firebase/firebase";

function LoginScreen() {
  const dispatch = useAppDispatch();
  const loginHandler = async (): Promise<void> => {
    try {
      const result = await signInWithPopup(auth, provider);
      const userInfo = result.user;
      if (userInfo) {
        dispatch(
          changeUserInfo({
            displayName: userInfo.displayName,
            email: userInfo.email,
            photoURL: userInfo.photoURL,
            uid: userInfo.uid,
          })
        );
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="w-screen h-screen p-7 bg-main-background-color">
      <div className="w-full h-full flex justify-center items-center">
        <button
          className="bg-[#fbbc04] text-white text-xl font-bold py-2 px-8 rounded"
          onClick={loginHandler}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default LoginScreen;
