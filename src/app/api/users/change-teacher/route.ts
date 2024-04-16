import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
    const { userId } = body;

    try {
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { role: "TEACHER" },
      });

      return NextResponse.json(
       updatedUser,
        { status: 200 }
      );
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
