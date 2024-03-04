"use client"
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {


  let [index, setIndex] = useState(0);
  const img = ["student.png", "document.png", "task.png"]
  const head = ["Student Information System", "Document Management", "Communication"]
  const text = ["Enable easy retrieval of student information and progress reports.", "Provide a secure repository for important documents, such as policies, meeting minutes, and reports.", "Include announcement features for important updates and news."]

  const title = ["A Comprehensive Command Center Tailored to Your Workflow, Unifying Efficiency and Insightful Control.", "Orchestrating Your Comprehensive Dashboard for a Streamlined Blend of Organization, Planning, and Information Management Excellence.", "Crafting a Dynamic Hub for Integrated Efficiency and Insightful Management."]

  useEffect(() => {
      const effect=document.getElementById('effect');
      setTimeout(()=>{
          effect?.classList.add('on')
      },200)
      setTimeout(()=>{
          effect?.classList.remove('on')
      },2800)
      const intervalId = setInterval(() => {
          const newIndex = (index + 1) % 3;
          setIndex(newIndex);
      }, 3000);
      return () => clearInterval(intervalId);

  }, [index])

  return (
    <main className="">

      <div className="flex-row">
        <div className="h-[200px] w-[100vw] flex justify-center mb-[-30px]">
          <div className="h-[100%] w-[800px] flex overflow-x-auto mt-20">
            <div className="h-[100%] w-[800px] flex">
              <div className="flex-shrink-0 text-center text-[24px] font-semibold w-[100%]">
                <h1 id="effect" className="text-center text-[24px] font-semibold w-[100%] opacity-0 transition-all 2s ease-in-out">{`${title[index]}`}</h1></div>
            </div>
          </div>
        </div>
        <div className="h-[600px] w-[100vw] flex">
          <div className="w-[50%] flex justify-center items-center"><img className="h-[500px] work" src="/work.png" alt="" /></div>
          <div className="w-[50%] flex justify-center items-center">
            <div className="border-4 border-orange-500 bg-orange-100 w-[500px] h-[400px] rounded-2xl flex justify-center">
              <div className="grid mt-20  h-20 place-items-center">
                <img className=" h-[100px] w-[100px]" src={`${img[index]}`} alt="" />
                <div className=" text-[30px] text-black text-center p-3 ">{`${head[index]}`}</div>
                <div className=" text-[20px] text-black text-center p-3 font-light">{`${text[index]}`}</div>
              </div>
            </div>
          </div>

        </div>
        {/* <div className="grid grid-flow-col justify-items-center h-[300px]">
          <div className='h-[200px] w-[300px] border-4 border-gray-50 bg-orange-100 rounded-2xl flex justify-center'></div>
          <div className='h-[200px] w-[300px] border-4  border-gray-50 bg-orange-100 rounded-2xl flex justify-center'></div>
          <div className='h-[200px] w-[300px] border-4  border-gray-50 bg-orange-100 rounded-2xl flex justify-center'></div>
        </div> */}

      </div>
    </main>
  );
}
