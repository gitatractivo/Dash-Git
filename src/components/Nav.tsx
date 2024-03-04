
import { cn } from '@/lib/utils';
import React from 'react'
import { UserButton, auth, useAuth } from '@clerk/nextjs';
import { redirect, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  // children: React.ReactNode;
}

const Nav = async ({ className }: Props) => {
  const { userId } = auth()


  return (




    < nav className="navbar transition-all ease-in-out 0.5s h-[80px] w-[100vw] flex items-center sticky top-0" >
      <div className="w-[70%] p-3 text-[30px] flex select-none">
        <Image width={50} height={50} src="/dash.png" alt="D" />
        <Link href="/" className="my-auto ml-4 font-semibold">
          Dash
        </Link>
      </div>
      {/* <div className="hidden sm:block">
        {
          userId && (
            <UserButton />
          )
        }

        {!userId && (
          <div className='flex gap-4'>
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


      </div> */}
      <div className="w-[30%] p-3 text-[18px] flex justify-between">
        {
          userId && (
            <UserButton />
          )
        }
        {!userId && (
          <>
            <Link href="/about" className='w-[80px] h-8 flex items-center justify-center rounded-[20px]  cursor-pointer select-none  mr-2  under'>About</Link>
            <Link href='sign-in' className='w-[80px] h-8 flex items-center justify-center rounded-[20px]  cursor-pointer select-none mr-2 under ' >Sign In</Link>
            <Link href='sign-up' className='w-[80px] h-8 flex items-center justify-center rounded-[20px] cursor-pointer select-none  bg-orange-500 text-white hover:text-white hover:bg-orange-400' >Sign Up</Link>
          </>
        )}
      </div>
    </ nav>

  )
}

export default Nav