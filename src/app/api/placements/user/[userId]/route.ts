import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

interface Params {
  userId: string;
}

export const GET = async (request: Request, { params }: { params: Params }) => {
  const { userId } = params;

  const placements = await prisma.package.findMany({
    where: {
      userId,
    },
    include: {
      user: true,
      company: true,
    },
  });

  return NextResponse.json(placements);
};
