
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


    < nav className="fixed navbar bg-white  transition-all ease-in-out 0.5s h-[80px]  flex items-center    justify-between  px-5 md:px-20 py-1 sm:py-3 w-full  z-50 shadow-md" >
      <div className="p-3 text-[30px] flex select-none gap-3">
        <Image width={50} height={50} src="/dash.png" alt="D" className="" />
        <Link href="/" className="my-auto font-semibold">
          Dash
        </Link>
      </div>
      <div className="flex gap-3">
        {
          userId && (
            <UserButton />
          )
        }

        {!userId && (
          <div className='flex gap-4'>
            {/* <Link href="/about" className='w-[80px] h-8 flex items-center justify-center rounded-[20px] p-2 cursor-pointer select-none    under'>About</Link> */}
            <Link
              href='sign-in sm:hidden'
              className=' h-8 flex items-center justify-center rounded-[20px] p-2 cursor-pointer select-none    under '
            >
              Sign In
            </Link>
            <Link
              href='sign-up sm:hidden'
              className=' h-8 flex items-center justify-center rounded-[20px] p-2 cursor-pointer select-none    under '
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