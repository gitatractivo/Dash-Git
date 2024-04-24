import { NextResponse } from "next/server";
import prisma from '../../../../lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { lectureId: string } }
) {
  const lectureId = params.lectureId;

  try {
    const attendanceRecords = await prisma?.attendance.findMany({
      where: {
        lectureId: lectureId,
      },
      include: {
        student: true,
      },
    });

    return NextResponse.json({ attendanceRecords });
  } catch (error) {
    console.error("Error fetching attendance records:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching attendance records" },
      { status: 500 }
    );
  }
}
