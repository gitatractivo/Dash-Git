import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { createAnnouncementSchema, CreateAnnouncementInput } from "@/lib/schema";

export const POST = async (request: Request) => {
  const body = await request.json();
  const result = createAnnouncementSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { message: "Invalid input", errors: result.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { forRole, text, userId }: CreateAnnouncementInput = result.data;

  const announcement = await prisma.announcement.create({
    data: {
      for:forRole,
      text,
      userId,
    },
    include: {
      user: true,
    },
  });

  return NextResponse.json(announcement, { status: 201 });
};


export const GET = async () => {
  const announcements = await prisma.announcement.findMany({
    include: {
      user: true,
    },
  });

  return NextResponse.json(announcements);
};
