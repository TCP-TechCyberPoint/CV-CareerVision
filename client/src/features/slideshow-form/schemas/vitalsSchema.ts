import { z } from "zod";
import { Gender } from "../types/vitals.types";

export const vitalsSchema = z.object({
  name: z
    .string()
    .min(2, "I bet you have more than 2 characters in your name, right? 🤔")
    .max(20, "Love your name, but it's too long for me to remember it"),
  dateOfBirth: z
    .date({
      required_error: "Cool, you're a time traveler! 🤖",
      invalid_type_error: "i don't know what you're doing, but it's not a date",
    })
    .refine((date) => {
      const today = new Date();
      const minDate = new Date(today.getFullYear() - 120, today.getMonth(), today.getDate());
      const maxDate = new Date(today.getFullYear() - 13, today.getMonth(), today.getDate());
      return date >= minDate && date <= maxDate;
    }, "Are you not too young to find a job? 🤔"),
  gender: z.nativeEnum(Gender, {
    required_error: "Please select a gender",
  }),
  email: z
    .string()
    .email("Are you fuckin with me? write a valid email")
    .min(1, "Email is required"),
  country: z
    .string()
    .min(2, "Come on, which planet are you from? 🌍")
    .max(50, "That's not a country, that's a whole continent!"),
  city: z
    .string()
    .min(2, "Even tiny villages have names longer than that! 🏘️")
    .max(50, "Is this a city or the entire state? 🏙️"),
  street: z
    .string()
    .min(3, "Need more than just '123' for a street address! 🏠")
    .max(100, "Are you listing your entire neighborhood? 📍"),
});

export type VitalsFormData = z.infer<typeof vitalsSchema>; 