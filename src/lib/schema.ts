import { z } from "zod";
import { Role } from "@prisma/client";

export const createUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
  regNo: z.string().optional(),
  role: z.nativeEnum(Role),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;

export const searchUsersSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  regNo: z.string().optional(),
});

export type SearchUsersInput = z.infer<typeof searchUsersSchema>;




export const createPlacementSchema = z.object({
  userId: z.string().uuid(),
  companyId: z.string().uuid(),
  salary: z.number().positive(),
});

export type CreatePlacementInput = z.infer<typeof createPlacementSchema>;


export const createAnnouncementSchema = z.object({
  forRole: z.nativeEnum(Role),
  text: z.string(),
  userId: z.string().uuid(),
});

export type CreateAnnouncementInput = z.infer<typeof createAnnouncementSchema>;