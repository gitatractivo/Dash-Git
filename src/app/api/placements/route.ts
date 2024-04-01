import prisma from "@/lib/prisma";
import { CreatePlacementInput, createPlacementSchema } from "@/lib/schema";
import { NextResponse } from "next/server";

export const GET = async () => {
  const placements = await prisma.package.findMany({
    include: {
      user: true,
      company: true,
    },
  });

  return NextResponse.json(placements);
};


export const POST = async (request: Request) => {
  const body = await request.json();
  const result = createPlacementSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { message: "Invalid input", errors: result.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { userId, companyId, salary }: CreatePlacementInput = result.data;

  const placement = await prisma.package.create({
    data: {
      userId,
      companyId,
      salary,
    },
    include: {
      user: true,
      company: true,
    },
  });

  return NextResponse.json(placement, { status: 201 });
};