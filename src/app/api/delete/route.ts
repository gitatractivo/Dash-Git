import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

export async function GET(request: NextRequest) {

  try {
    // Delete data from all tables in the correct order based on foreign key constraints
    await prisma.attendance.deleteMany();
    await prisma.lecture.deleteMany();
    await prisma.package.deleteMany();
    await prisma.announcement.deleteMany();
    await prisma.subject.deleteMany();
    await prisma.user.deleteMany();
    await prisma.course.deleteMany();
    await prisma.company.deleteMany();

    return NextResponse.json({ message: "Database cleared successfully" });
  } catch (error) {
    console.error("Error clearing database:", error);
    return NextResponse.json(
      { error: "Failed to clear database" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
