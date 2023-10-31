import React from "react";
import Loading from "../Loading";

export default function LoadingText({ text }) {
  return (
    <div className="fixed top-0 w-full h-screen flex justify-center items-center bg-[#000000c2] z-20 ">
      <div className=" w-full  h-full bg-white flex flex-col items-center justify-center px-4">
        <h2 className="text-center text-2xl mb-8 font-semibold">{text}</h2>
        <div className="max-h-[100px] max-w-[100px] w-full">
          <Loading />
        </div>
      </div>
    </div>
  );
}
