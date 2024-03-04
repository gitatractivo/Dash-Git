"use client";
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  let [index, setIndex] = useState(0);
  const { isSignedIn } = useAuth();
  const router = useRouter();
  const img = ["student.png", "document.png", "task.png"];
  const head = [
    "Student Information System",
    "Document Management",
    "Communication",
  ];
  const text = [
    "Enable easy retrieval of student information and progress reports.",
    "Provide a secure repository for important documents, such as policies, meeting minutes, and reports.",
    "Include announcement features for important updates and news.",
  ];

  const title = [
    "A Comprehensive Command Center Tailored to Your Workflow, Unifying Efficiency and Insightful Control.",
    "Orchestrating Your Comprehensive Dashboard for a Streamlined Blend of Organization, Planning, and Information Management Excellence.",
    "Crafting a Dynamic Hub for Integrated Efficiency and Insightful Management.",
  ];

  useEffect(() => {
    const effect = document.getElementById("effect");
    setTimeout(() => {
      effect?.classList.add("on");
    }, 200);
    setTimeout(() => {
      effect?.classList.remove("on");
    }, 2800);
    const intervalId = setInterval(() => {
      const newIndex = (index + 1) % 3;
      setIndex(newIndex);
    }, 3000);
    return () => clearInterval(intervalId);
  }, [index]);

  return (
    <main className="flex gap-10 py-5 flex-col items-center justify-between px-5 lg:p-24">
      <h1
        id="effect"
        className="text-center text-base   lg:text-[24px] font-semibold  text-black h-24 md:h-fit  transition-all 2s ease-in-out"
      >
        {" "}
        {`${title[index]}`}
      </h1>

      <div className=" flex  flex-col gap-5 md:flex-row">
        <Image
          width="0"
          height="0"
          objectFit="cover"
          className="!w-[150px] mx-auto  md:!w-1/2 h-fit object-cover rounded-2xl"
          src="/work.png"
          alt=""
          layout="responsive"
          sizes="(max-width: 768px) 150px, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <div className="border-4 border-orange-500 bg-orange-100 w-full max-w-[500px] h-[400px] rounded-2xl flex justify-center">
            <div className="grid mt-20  h-20 place-items-center">
              <Image
                width="0"
                height="0"
                className=" h-[50px] !w-[50px]"
                src={`/${img[index]}`}
                alt=""
              />
              <div className=" text-[30px] text-black text-center p-3 ">{`${head[index]}`}</div>
              <div className=" text-[20px] text-black text-center p-3 font-light">{`${text[index]}`}</div>
            </div>
          </div>
        </div>
      </div>
      {isSignedIn && (
        <div className="flex flex-col gap-5 md:flex-row w-full max-w-[1100px] justify-between items-center ">
          <div
            className=" h-24 items-center max-w-[300px] w-full border-4 border-orange-500 cursor-pointer bg-orange-100 rounded-2xl flex justify-center"
            onClick={() => {
              router.push("/placement");
            }}
          >
            Get Placement Data{" "}
          </div>
          <div className="h-24 items-center max-w-[300px] w-full border-4  border-orange-500 cursor-pointer bg-orange-100 rounded-2xl flex justify-center"></div>
          <div className="h-24 items-center max-w-[300px] w-full border-4  border-orange-500 cursor-pointer bg-orange-100 rounded-2xl flex justify-center"></div>
        </div>
      )}
    </main>
  );
}
