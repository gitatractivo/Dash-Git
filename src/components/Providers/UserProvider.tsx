"use client";
import { useAuth, useUser } from "@clerk/nextjs";
import React, { useContext, useEffect, useState } from "react";
import { User } from "@prisma/client";
import prisma from '../../lib/prisma';

interface ContextProviderProps {
  children?: React.ReactNode;
}

interface IContext {
  user: User | null;
  isLoaded: boolean; 
  isSignedIn: boolean|undefined; 
}

const Context = React.createContext<IContext | null>(null);

export const useAuthContext = () => {
  const state = useContext(Context);
  if (!state) throw new Error(`state is not defined`);
  return state;
};

export const AuthContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
  const [userdb, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { isSignedIn, isLoaded, user } = useUser();

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      console.log(user)
      const res = await fetch(`/api/users/search`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email:user?.primaryEmailAddress?.emailAddress}),
      });
      const resp  = await res.json()
      console.log(resp)
      setUser(resp)

      // "use server"; // Switch to the server context
      // if (isSignedIn && user) {
      //   user.primaryEmailAddress?.id
      //   try {
      //     const existingUser = await prisma?.user.findUnique({
      //       where: { email: user.primaryEmailAddress?.id },
      //     });
      //     console.log("existinguser",existingUser)

      //     if (existingUser) {
      //       setUser(existingUser);
      //     } else if(user.primaryEmailAddress?.emailAddress) {
      //       const newUser = await prisma?.user.create({
      //         data: {
      //           email: user.primaryEmailAddress?.emailAddress,
      //           name: user.fullName,
                
      //         },
      //       });
      //       //@ts-ignore
      //       setUser(newUser);
      //     }
      //   } catch (error) {
      //     console.error("Error fetching or creating user:", error);
      //   }
      // }

      setIsLoading(false);
    };

    if (isLoaded) {
      fetchUser();
    }
  }, [isSignedIn, isLoaded, user]);

  return (
    <Context.Provider value={{ user:userdb, isLoaded,isSignedIn }}>
      {children}
    </Context.Provider>
  );
};