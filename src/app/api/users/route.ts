import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { createUserSchema, CreateUserInput } from "@/lib/schema";

export const POST = async (request: Request) => {
  const body = (await request.json()) as unknown;

  const result = createUserSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { message: "Invalid input", errors: result.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { email, name, role }: CreateUserInput = result.data;

  const user = await prisma.user.create({
    data: {
      email,
      name,
      role,
    },
  });

  return NextResponse.json(user, { status: 201 });
};

export const GET = async () => {
  const users = await prisma.user.findMany({
    include: {
      attendance: true,
      subject: true,
      package: true,
    },
  });

  console.log("users",users)

  return NextResponse.json(users);
};


