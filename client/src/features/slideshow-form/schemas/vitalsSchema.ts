import { z } from "zod";
import { Gender } from "../types/vitals.types";

export const vitalsSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),
  age: z
    .number()
    .min(0, "Age must be a positive number")
    .max(120, "Age must be less than 120"),
  gender: z.nativeEnum(Gender, {
    required_error: "Please select a gender",
  }),
  email: z
    .string()
    .email("Please enter a valid email address")
    .min(1, "Email is required"),
});

export type VitalsFormData = z.infer<typeof vitalsSchema>; 