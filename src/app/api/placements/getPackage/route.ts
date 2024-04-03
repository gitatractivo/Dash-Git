import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const GET = async () => {
  try {
    // Disable foreign key checks
    const resp = await prisma.package.findMany({
      select:{
        user:true,
        company:true,
        salary:true,
      }
    })
    return NextResponse.json(resp);
  } catch (error) {
    return NextResponse.json({ error });
  }

};
