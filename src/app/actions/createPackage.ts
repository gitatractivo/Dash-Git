"use server";
import { revalidateTag } from "next/cache";
import { prisma } from "@/lib/prisma";
import { PackageFormValues } from "@/app/placement/page"; // Import the FormValues type from your component

export const createPackageAction = async (values: PackageFormValues) => {
  // This line is important to mark this as a server action

 
    // Create a new company
   try {
    // Check if a company with the same name already exists
   
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
          gender: values.gender,
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


    // revalidateTag("packages"); // Revalidate the 'packages' cache tag if needed

    return { success: true, package: newPackage };
  } catch (error) {
    console.error("Error creating package:", error);
    return { success: false, error: error };
  }
};
