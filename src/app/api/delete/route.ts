import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const GET = async () => {
  try {
    // Disable foreign key checks
    await prisma.$executeRawUnsafe("PRAGMA foreign_keys=OFF;");

    // Delete records in the correct order
    await prisma.package.deleteMany();
    await prisma.user.deleteMany();
    
    await prisma.company.deleteMany();

    // Re-enable foreign key checks
    await prisma.$executeRawUnsafe("PRAGMA foreign_keys=ON;");
  } catch (error) {
    return NextResponse.json({ error });
  }

  return NextResponse.json({ hello: "world" });
};
