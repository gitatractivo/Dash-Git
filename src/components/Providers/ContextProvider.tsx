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
  useEffect(() => {
    // eslint-disable-next-line
    // alert("hello")
    blob = document.getElementById("blob");
    const pointerMoveFunction = (e: any) => {
      const { clientX, clientY } = e;
      blob.animate(
        [
          { left: `${blob.style.left}`, top: `${blob.style.top}` },
          { left: `${clientX}px`, top: `${clientY}px` },
        ],
        { duration: 1000, fill: "forwards" }
      );
    };

    const scrollMove = () => {
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

    const navbar = document.getElementsByClassName("navbar");
    var iniposition = 0;
    window.addEventListener("scroll", scrollMove);
    return () => {
      document.body.removeEventListener("pointermove", pointerMoveFunction);
      window.removeEventListener("scroll", scrollMove);
    };
  }, [blob]);
  return (
    <Context.Provider value={{}}>
      
      {children}
    </Context.Provider>
  );
};
