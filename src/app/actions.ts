"use server"

import { createAnnouncementSchema, createCourseSchema, createPackageSchema, createSubjectSchema, createUserSchema } from "@/lib/schema";
import { z } from "zod";


export async function createUserAction(formData: FormData) {
  console.log("hello");

  const form = Object.fromEntries(formData.entries());

  try {
    const zodData = createUserSchema.safeParse(form);
    if (zodData.success) {
      const data = zodData.data;
      const resp = await prisma?.user.create({ data });
      console.log(resp);
      return {
        success: true,
        message: "Successfully created user",
        data: resp,
      };
    }
    return {
      success: false,
      message: "Error creating user",
      errors: zodData.error.errors,
    };
  } catch (error) {
    console.log(error)
    return {
      success: false,
      message: "Error creating user",
      errors: [{ message: (error as Error).message }],
    };
  }
}

export async function createSubjectAction(formData: FormData) {
  console.log("Creating subject");
  const form = Object.fromEntries(formData.entries());
  try {
    const zodData = createSubjectSchema.safeParse(form);
    if (zodData.success) {
      const data = zodData.data;
      const resp = await prisma?.subject.create({ data });
      console.log(resp);
      return {
        success: true,
        message: "Successfully created subject",
        data: resp,
      };
    }
    return {
      success: false,
      message: "Error creating subject",
      errors: zodData.error.errors,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Error creating subject",
      errors: [{ message: (error as Error).message }],
    };
  }
}

export async function createCourseAction(formData: FormData) {
  console.log("Creating course");
  const form = Object.fromEntries(formData.entries());
  try {
    const zodData = createCourseSchema.safeParse(form);
    if (zodData.success) {
      const data = zodData.data;
      const resp = await prisma?.course.create({
        data: {
          ...data,
          students: {
            connect: data.students.map((id) => ({ id })),
          },
        },
      });
      console.log(resp);
      return {
        success: true,
        message: "Successfully created course",
        data: resp,
      };
    }
    return {
      success: false,
      message: "Error creating course",
      errors: zodData.error.errors,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Error creating course",
      errors: [{ message: (error as Error).message }],
    };
  }
}

export async function createPackageAction(formData: FormData) {
  console.log("Creating package");
  const form = Object.fromEntries(formData.entries());
  try {
    const zodData = createPackageSchema.safeParse(form);
    if (zodData.success) {
      const data = zodData.data;
      const resp = await prisma?.package.create({ data });
      console.log(resp);
      return {
        success: true,
        message: "Successfully created package",
        data: resp,
      };
    }
    return {
      success: false,
      message: "Error creating package",
      errors: zodData.error.errors,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Error creating package",
      errors: [{ message: (error as Error).message }],
    };
  }
}


export async function createAnnouncementAction(formData: FormData) {
  console.log("Creating announcement");
  const form = Object.fromEntries(formData.entries());
  try {
    const zodData = createAnnouncementSchema.safeParse(form);
    if (zodData.success) {
      const data = zodData.data;
      const resp = await prisma?.announcement.create({ data });
      console.log(resp);
      return {
        success: true,
        message: "Successfully created announcement",
        data: resp,
      };
    }
    return {
      success: false,
      message: "Error creating announcement",
      errors: zodData.error.errors,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Error creating announcement",
      errors: [{ message: (error as Error).message }],
    };
  }
}