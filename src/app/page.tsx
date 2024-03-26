"use client";
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

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
    <main className="flex gap-10 py-5 flex-col items-center justify-between px-5 lg:p-24 mt-[80px]">
      <style jsx>
        {`
          .on {
            opacity: 1;
            transform: translateY(10px);
          }
        `}
      </style>
      <h1
        id="effect"
        className="text-center text-md opacity-0 lg:text-[24px] font-semibold  text-black h-[100px]  transition-all 2s ease-in-out"
      >
        {" "}
        {`${title[index]}`}
      </h1>
      <div className="muj h-fit w-[100vw] md:pl-20 md:pr-20 p-3">
      <div className=" flex flex-col gap-5 md:flex-row orangeshadow p-4">
        <Image
          width="0"
          height="0"
          objectFit="cover"
          className="hidden md:block !w-[150px] mx-auto  md:!w-1/2 h-fit object-cover rounded-2xl"
          src="/work.png"
          alt=""
          layout="responsive"
          sizes="(max-width: 768px) 150px, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <div className="border w-full max-w-[500px] h-[400px] rounded-2xl flex justify-center bg-white">
            <div className="grid mt-7 lg:mt-20  h-20 place-items-center ">
              <Image
                width="100"
                height="100"
                className=" h-[100px] !w-[100px]"
                src={`/${img[index]}`}
                alt=""
              />
              <div className="lg:text-[30px] text-[24px] text-center font-bold p-3">{`${head[index]}`}</div>
              <div className=" text-md md:text-[18px] text-black text-center p-3 font-light">{`${text[index]}`}</div>
            </div>
          </div>
        </div>
      </div>
      </div>
      {isSignedIn && (
        <div className="m-10 lg:pl-20 lg:pr-20 grid lg:flex lg:justify-between w-full">
          <Card className="m-2 text-orange-400 border-orange-400 hover:scale-105 transition-all 0.5s ease-in-out cursor-pointer" onClick={() => {
              router.push("/placement");
            }}>
            <CardHeader>
              <CardTitle>Campus Placements</CardTitle>
              <CardDescription>Details of Students who got placed.</CardDescription>
            </CardHeader>
          </Card>
          <Card className="m-2 text-orange-400 border-orange-400 hover:scale-105 transition-all 0.5s ease-in-out cursor-pointer" onClick={() => {
              router.push("/placement");
            }}>
            <CardHeader>
              <CardTitle>Announcements</CardTitle>
              <CardDescription>Announce information here.</CardDescription>
            </CardHeader>
          </Card>
          <Card className="m-2 text-orange-400 border-orange-400 hover:scale-105 transition-all 0.5s ease-in-out cursor-pointer" onClick={() => {
              router.push("/placement");
            }}>
            <CardHeader>
              <CardTitle>Documents</CardTitle>
              <CardDescription>Store important documents here.</CardDescription>
            </CardHeader>
          </Card>

        </div>



      )}
    </main>
  );
}
