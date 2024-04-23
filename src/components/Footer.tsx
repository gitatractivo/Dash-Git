"use client"
import Image from "next/image";
import React from "react";
import { useAuthContext } from "./Providers/UserProvider";
import Link from "next/link";

interface FootProps {}
export const Foot: React.FC<FootProps> = () => {
  const {isSignedIn, isLoaded, user} = useAuthContext();
  return (
    <div className="px-5 md:px-10 py-5 flex flex-col md:flex-row justify-around items-center bg-gray-100">
      <div className=" p-3 text-[30px] flex">
        <Image
          width="100"
          height="100"
          className="h-[50px] w-[50px]"
          src="/dash.png"
          alt="D"
        />
        <div className="ml-4 font-semibold">Dash</div>
      </div>
      <div className=" p-3 text-[14px] flex justify-between">
        {isLoaded && isSignedIn && user?.role === "TEACHER" && <Link className="w-[80px] h-8 font flex items-center justify-center cursor-pointer select-none mr-2 hover:underline" href="/admin">Admin</Link>}
        <div className="w-[120px] h-8 font flex items-center justify-center cursor-pointer select-none mr-2 hover:underline">
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
