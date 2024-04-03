"use client";

import React, { useContext, useEffect } from "react";

interface ContextProviderProps {
  children?: React.ReactNode;
}

interface IContext {}

const Context = React.createContext<IContext | null>(null);

export const Usecontext = () => {
  const state = useContext(Context);
  if (!state) throw new Error(`state is not defined`);
  return state;
};

export const ContextProvider: React.FC<ContextProviderProps> = ({
  children,
}) => {
 

  let blob: any;
  let blob2: any;
  let hoverEffect: any;
  let mainWindow: any;
  let isHover = false;
  useEffect(() => {
    // eslint-disable-next-line
    // alert("hello")
    blob = document.getElementById("blob");
    blob2 = document.getElementById("blob2");
    mainWindow = document.getElementById("mainwindow");

    // hoverEffect=document.getElementById("effect");
    hoverEffect=document.querySelectorAll(".effect");
    
    Array.from(hoverEffect).forEach((he:any) => {
      he.addEventListener('mouseover', () => {
        blob2.classList.remove('hidden');
        blob.classList.add('hidden');
        mainWindow.classList.add("bg-orange-200");
      });
    
      he.addEventListener('mouseout', () => {
        blob2.classList.add('hidden');
        blob.classList.remove('hidden');
        mainWindow.classList.remove("bg-orange-200");
      });
    });
    
   

    const pointerMoveFunction = (e: any) => {
      const { clientX, clientY } = e;
      const ClientX=clientX+window.scrollX;
      const ClientY=clientY+window.scrollY;
      blob.animate(
        [
          { left: `${blob.style.left}`, top: `${blob.style.top}` },
          { left: `${ClientX}px`, top: `${ClientY}px` },
        ],
        { duration: 1000, fill: "forwards" }
      );
      blob2&&blob2.animate(
        [
          { left: `${blob.style.left}`, top: `${blob.style.top}` },
          { left: `${ClientX}px`, top: `${ClientY}px` },
        ],
        { duration: 1000, fill: "forwards" }
      );
    };
      const navbar = document.getElementsByClassName("navbar");

    const scrollMove = () => {
      console.log("first,",navbar)
      var scrollPosition = window.scrollY;
      // console.log(iniposition+"%")
      console.log(scrollPosition + "*");
      if (scrollPosition < 10) {
        navbar[0].classList.remove("trans");
      } else {
        if (iniposition > scrollPosition) {
          navbar[0].classList.remove("trans");
        }
        if (iniposition < scrollPosition) {
          navbar[0].classList.add("trans");
        } else {
          navbar[0].classList.remove("trans");
        }
      }

      iniposition = scrollPosition;
      // console.log(iniposition)
    };

    document.body.addEventListener("pointermove", pointerMoveFunction);

  
    var iniposition = 0;
    window.addEventListener("scroll", scrollMove);
    return () => {
      document.body.removeEventListener("pointermove", pointerMoveFunction);
      window.removeEventListener("scroll", scrollMove);
      hoverEffect=document.querySelectorAll(".effect");
    
      Array.from(hoverEffect).forEach((he:any) => {
        he.removeEventListener('mouseover', () => {
          blob2.classList.remove('hidden');
          blob.classList.add('hidden');
          mainWindow.classList.add("bg-orange-200");
        });
      
        he.removeEventListener('mouseout', () => {
          blob2.classList.add('hidden');
          blob.classList.remove('hidden');
          mainWindow.classList.remove("bg-orange-200");
        });
      });
    };
  }, [blob,blob2,hoverEffect]);

  
  return (
    <Context.Provider value={{}}>
      
      {children}
    </Context.Provider>
  );
};
