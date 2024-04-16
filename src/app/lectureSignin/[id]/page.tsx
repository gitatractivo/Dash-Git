"use client"
import { markAttendanceAction } from '@/app/actions'
import { useAuthContext } from '@/components/Providers/UserProvider'
import { useAuth } from '@clerk/nextjs'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
type Props = {}

const LectureSignIn = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const {isLoaded,isSignedIn,user} =useAuthContext()
  const [isLoading, setIsLoading] = useState(true)
  useEffect(()=>{
    if(isLoaded && !isSignedIn){
      const redirectUrl = `/lectures/${params.id}/sign-in`;
      const signInUrl = `/sign-in?redirectUrl=${encodeURIComponent(redirectUrl)}`;
      router.push(signInUrl);
    }
    if(isLoaded&&isSignedIn&&user&&user.id){
      console.log("attended")
      const markAttendance = async () => {
        
        const response = await fetch("/api/attendance", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: user.id, lectureId: params.id }),
        });

        const result = await response.json();
        if(response.ok){
          toast.success("Attendance marked successfully")
        }
        setIsLoading(false)
        console.log(result);
          // Handle the result as needed (e.g., show a success message)
        
      };

      markAttendance();
    }
  }, [isLoaded, isSignedIn, params.id,user,])

  return (
    <div className='w-full min-h-[400px] flex justify-center items-center'> {isLoading&&(
      <Loader2 className="animate-spin"/>
    )}</div>
  )
}

export default LectureSignIn