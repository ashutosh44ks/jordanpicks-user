import React from "react";
import Button from "../../../components/common/Button";
import { FcGoogle } from "react-icons/fc";
import { MdFacebook } from "react-icons/md";
import { AiFillApple } from "react-icons/ai";

const SocialLoginBtnGroup = () => {
  return (
    <div>
      <Button
        className="w-full mt-2 font-semibold flex justify-center items-center gap-x-4"
        theme="google-white"
        rounded="md"
        onClick={() => {
          window.open(
            process.env.REACT_APP_BASE_API_URL + "user/auth/google",
            "_self"
          );
        }}
      >
        <FcGoogle size={20} className="hide-on-sm-devices" /> Continue with
        Google
      </Button>
      {/* <Button
        className="w-full mt-2 font-semibold flex justify-center items-center gap-x-4"
        theme="facebook-blue"
        rounded="md"
        onClick={() => {
          window.open(
            process.env.REACT_APP_BASE_API_URL + "auth/facenook",
            "_self"
          );
        }}
      >
        <MdFacebook size={20} className="hide-on-sm-devices" /> Continue with
        Facebook
      </Button>
      <Button
        className="w-full mt-2 font-semibold flex justify-center items-center gap-x-4"
        theme="apple-black"
        rounded="md"
        onClick={() => {
          window.open(
            process.env.REACT_APP_BASE_API_URL + "auth/apple",
            "_self"
          );
        }}
      >
        <AiFillApple size={20} className="hide-on-sm-devices" /> Continue with Apple
      </Button> */}
    </div>
  );
};

export default SocialLoginBtnGroup;
