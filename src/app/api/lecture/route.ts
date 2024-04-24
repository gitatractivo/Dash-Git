import { NextResponse } from "next/server";
import prisma from '../../../lib/prisma';

export const POST = async (request: Request) => {
  
  const body = await request.json();
  const {subjectId} = body;
  if(!subjectId){
    return NextResponse.json({ message: "Invalid input", errors: "subjectId is required" }, { status: 400 });
  }

  
 try {
   const lecture = await prisma.lecture.create({
     data: {
       subjectId
     },
     
   });
   return NextResponse.json(lecture, { status: 201 });
 } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error creating lecture", errors: [{ message: (error as Error).message }] }, { status: 500 });
 }

};
