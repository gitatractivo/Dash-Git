import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { Gender } from "@prisma/client";
import { NextResponse } from "next/server";

interface FormValues {
  company: string;
  email: string;
  name: string;
  gender: string;
  phone: string;
  regNo: string;
  package: string;
}

export const POST = async (req: Request) => {
 
    try {
      const values: FormValues =await req.json();
      console.log("hello", values);

      // Check if a company with the same name already exists

      // If the company doesn't exist, create a new one

      let company = await prisma.company.create({
        data: {
          name: values.company,
        },
      });

      // Check if a user with the same email already exists
      let user = await prisma.user.findUnique({
        where: {
          email: values.email,
        },
      });

      // If the user doesn't exist, create a new one
      if (!user) {
        user = await prisma.user.create({
          data: {
            email: values.email,
            name: values.name,
            gender: values.gender as Gender,
            phone: values.phone,
            regNo: values.regNo,
          },
        });
      }

      // Create a new package
      const newPackage = await prisma.package.create({
        data: {
          companyId: company.id,
          userId: user.id,
          salary: parseFloat(values.package),
        },
      });

       return NextResponse.json(newPackage, { status: 201 });
    } catch (error) {
      console.error("Error creating package:", error);
      return NextResponse.json({error:"error"+ error}, { status: 404 });
    }
  
};
