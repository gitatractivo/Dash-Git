import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

interface Params {
  id: string;
}

export const GET = async (request: Request, { params }: { params: Params }) => {
  const { id } = params;

  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(id),
    },
    include: {
      Attendance: true,
      Subject: true,
      Package: true,
    },
  });

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user);
};