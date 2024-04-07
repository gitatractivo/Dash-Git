import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Role } from "@prisma/client";




export const POST = async (request: Request) => {

  const body = await request.json();
  try {
    // Disable foreign key checks
    const resp = await prisma.user.update({
      where:{
        id:body.userId,
      },
      data:{
        role:Role.STUDENT,
      }
    })

    // Delete records in the correct order
    
  } catch (error) {
    return NextResponse.json({ error });
  }

  return NextResponse.json({ hello: "world" });
};
