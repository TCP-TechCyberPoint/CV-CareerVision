import { useState } from "react";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { toaster } from "@/components/ui/toaster";

const registerSchema = z
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

export const useRegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<RegisterFormData>>({});
  const { register } = useAuth();
  const navigate = useNavigate();

  const validateForm = (data: RegisterFormData) => {
    try {
      registerSchema.parse(data);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors: Partial<RegisterFormData> = {};
        error.errors.forEach((err: z.ZodIssue) => {
          if (err.path[0]) {
            formattedErrors[err.path[0] as keyof RegisterFormData] =
              err.message;
          }
        });
        setErrors(formattedErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (data: RegisterFormData) => {
    if (!validateForm(data)) return;

    setIsLoading(true);
    try {
      const status = await register(data.email, data.password, data.name);
      console.log("status", status);

      if (status >= 200 && status < 300) {
        toaster.create({
          title: "Success",
          description: "Registration successful! Please login to continue.",
          type: "success",
          duration: 3000,
          closable: true,
        });
        navigate("/login");
      } else {
        toaster.create({
          title: "Error",
          description: "Registration failed. Please try again.",
          type: "error",
          duration: 3000,
          closable: true,
        });
        alert("Registration failed. Please try again.");
      }
    } catch (error: Error | unknown) {
      if (error instanceof Error) {
        toaster.create({
          title: "Error",
          description: `Failed to sign up. Please try again. ${error.message}`,
          type: "error",
          duration: 3000,
          closable: true,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleSubmit,
    errors,
    isLoading,
  };
};
