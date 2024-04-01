import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

interface Params {
  companyId: string;
}

export const GET = async (request: Request, { params }: { params: Params }) => {
  const { companyId } = params;

  const placements = await prisma.package.findMany({
    where: {
      companyId,
    },
    include: {
      user: true,
      company: true,
    },
  });

  return NextResponse.json(placements);
};
