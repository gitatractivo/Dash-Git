
import { cn } from '@/lib/utils';
import React from 'react'
import { UserButton, auth, useAuth } from '@clerk/nextjs';
import { redirect, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  // children: React.ReactNode;
}

const Nav = async ({  className }: Props) => {
  const { userId }  = auth()
 
  
  return (
  

    

      < nav className= "navbar  transition-all ease-in-out 0.5s h-[80px]  flex items-center sticky top-0   sm:justify-between justify-end px-5 md:px-20 py-1 sm:py-3 w-full  sm:items-center  z-50 shadow-md shadow-gray-200 dark:shadow-gray-950 border-b backdrop-blur-xl dark:backdrop-blur-xl  bg-background/55 dark:bg-background/85 backnavdrop " >
        <div className="w-[70%] p-3 text-[30px] flex select-none">
          <Image width={50} height={50} src="/dash.png" alt="D" />
          <Link href="/" className="my-auto font-semibold">
            Dash
          </Link>
        </div>
      <div className="hidden sm:block">
        {
          userId &&(
            <UserButton/>
          )
        }

        {!userId && (
          <div  className='flex gap-4'>
            <Link
              href='sign-in'
              className=' bg-orange-600 p-2 rounded-full font-bold text-white hover:bg-orange-700 transition-colors duration-300 cursor-pointer '
            >
              Sign In
            </Link>
            <Link
              href='sign-up'
              className=' bg-orange-600 p-2 rounded-full font-bold text-white hover:bg-orange-700 transition-colors duration-300 cursor-pointer '
            >
              Sign Up
            </Link>
          </div>
        )}

       
      </div>
    </ nav>
   
  )
}

export default Nav