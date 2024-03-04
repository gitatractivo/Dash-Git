import Image from "next/image";
import React from "react";

interface FootProps {}
export const Foot: React.FC<FootProps> = () => {
  return (
    <div className="px-5 md:px-10 py-5 flex flex-col md:flex-row justify-around items-center bg-gray-100">
      <div className=" p-3 text-[30px] flex">
        <Image
          width="0"
          height="0"
          className="h-[50px] w-[50px]"
          src="/dash.png"
          alt="D"
        />
        <div className="ml-4 font-semibold">Dash</div>
      </div>
      <div className=" p-3 text-[14px] flex justify-between">
        <div className="w-[100px] h-8 font flex items-center justify-center cursor-pointer select-none mr-2 hover:underline">
          Privacy Policy
        </div>
        <div className="w-[80px] h-8 font flex items-center justify-center cursor-pointer select-none mr-2 hover:underline">
          Licensing
        </div>
        <div className="w-[80px] h-8 font flex items-center justify-center cursor-pointer select-none mr-2 hover:underline">
          Contact
        </div>
      </div>
    </div>
  );
};
