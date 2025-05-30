import { z } from "zod";

// Login form validation schema
export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

// Register form validation schema
export const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;

// Validation function for login form
export const validateLoginForm = (
  data: LoginFormData,
  setErrors: (errors: Partial<LoginFormData>) => void
): boolean => {
  try {
    loginSchema.parse(data);
    setErrors({});
    return true;
  } catch (error) {
    if (error instanceof z.ZodError) {
      const formattedErrors: Partial<LoginFormData> = {};
      error.errors.forEach((err: z.ZodIssue) => {
        if (err.path[0]) {
          formattedErrors[err.path[0] as keyof LoginFormData] = err.message;
        }
      });
      setErrors(formattedErrors);
    }
    return false;
  }
};

// Validation function for register form
export const validateRegisterForm = (
  data: RegisterFormData,
  setErrors: (errors: Partial<RegisterFormData>) => void
): boolean => {
  try {
    registerSchema.parse(data);
    setErrors({});
    return true;
  } catch (error) {
    if (error instanceof z.ZodError) {
      const formattedErrors: Partial<RegisterFormData> = {};
      error.errors.forEach((err: z.ZodIssue) => {
        if (err.path[0]) {
          formattedErrors[err.path[0] as keyof RegisterFormData] = err.message;
        }
      });
      setErrors(formattedErrors);
    }
    return false;
  }
}; 