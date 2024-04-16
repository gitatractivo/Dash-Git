import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  
  try {
    const subject = await prisma.subject.findMany({
     
    });

    return NextResponse.json(subject, { status: 200 });
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
