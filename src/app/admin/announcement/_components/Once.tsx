"use client"
import React from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useRouter } from "next/navigation";

type Props = {}

const Once = (props: Props) => {
  const router = useRouter();
  return (
    <div><Card className=" m-10 text-orange-400 border-orange-400 hover:scale-105 transition-all 0.5s ease-in-out cursor-pointer" onClick={() => {
      router.push("announcement/create");
    }}>
      <CardHeader>
        <CardTitle>Create Announcement</CardTitle>
        <CardDescription>Create a new announcement</CardDescription>
      </CardHeader>
    </Card>
      <Card className=" m-10 text-orange-400 border-orange-400 hover:scale-105 transition-all 0.5s ease-in-out cursor-pointer">
        <CardHeader onClick={() => {
          const url = "https://docs.google.com/forms";
          const win = window.open(url, "_blank");
        }}>
          <CardTitle>Create Google Form</CardTitle>
          <CardDescription>Create a new announcement</CardDescription>
        </CardHeader>
      </Card>
      <Card className=" m-10 text-orange-400 border-orange-400 hover:scale-105 transition-all 0.5s ease-in-out cursor-pointer">
        <CardHeader>
          <CardTitle>Checkout Prev Announcements</CardTitle>
          <CardDescription>Create a new announcement</CardDescription>
        </CardHeader>
      </Card></div>
  )
}

export default Once