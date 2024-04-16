import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { searchUsersSchema, SearchUsersInput } from "@/lib/schema";
import { Prisma } from "@prisma/client";

export const POST = async (request: Request) => {
   const body = await request.json();
   const result = searchUsersSchema.safeParse(body)
   console.log(result);

   if (!result.success) {
     return NextResponse.json(
       { message: "Invalid input", errors: result.error.flatten().fieldErrors },
       { status: 400 }
     );
   }

   const { name, email, regNo, }: SearchUsersInput = result.data;

  
  let where:Prisma.UserWhereInput = {};
  if (name) {
    where.name = { contains: name };
  }
  if (email) {
    where.email = email;
  }
  if (regNo) {
    where.regNo = regNo;
  }

  const users = await prisma.user.findFirst({
    where,
    include: {
      attendance: true,
      subject: true,
      package: true,
    },
  });

  return NextResponse.json(users);
};
