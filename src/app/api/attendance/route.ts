import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
   const { userId, lectureId } = body;


  try {
    const attendance = await prisma.attendance.create({
      data: {
        studentId: userId,
        lectureId: lectureId,
        status: "PRESENT",
      },
    });

    return NextResponse.json(attendance, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Invalid input",
        errors: error,
      },
      { status: 400 }
    );
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const lectureId = searchParams.get("lectureId");
  

  if(lectureId){

    try {
      const attendance = await prisma.attendance.findMany({
        where: {
          lectureId,
          
        },
      });
  
      return NextResponse.json(attendance, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        {
          message: "Invalid input",
          errors: error,
        },
        { status: 400 }
      );
    }
  }
}
