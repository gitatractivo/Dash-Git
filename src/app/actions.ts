"use server"

import { createUserSchema } from "@/lib/schema";
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