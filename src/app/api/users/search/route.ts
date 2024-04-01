import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { searchUsersSchema, SearchUsersInput } from "@/lib/schema";
import { Prisma } from "@prisma/client";

export const GET = async (request: Request) => {
   const body = await request.json();
   const result = searchUsersSchema.safeParse(body);

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

  const users = await prisma.user.findMany({
    where,
    include: {
      Attendance: true,
      Subject: true,
      Package: true,
    },
  });

  return NextResponse.json(users);
};
