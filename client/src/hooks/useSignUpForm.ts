import { useState } from "react";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";
import { toaster } from "@/components/ui/toaster";

const signUpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type SignUpFormData = z.infer<typeof signUpSchema>;

export const useSignUpForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<SignUpFormData>>({});
  const { signup } = useAuth();
  const navigate = useNavigate();

  const validateForm = (data: SignUpFormData) => {
    try {
      signUpSchema.parse(data);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors: Partial<SignUpFormData> = {};
        error.errors.forEach((err: z.ZodIssue) => {
          if (err.path[0]) {
            formattedErrors[err.path[0] as keyof SignUpFormData] = err.message;
          }
        });
        setErrors(formattedErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (data: SignUpFormData) => {
    if (!validateForm(data)) return;

    setIsLoading(true);
    try {
      await Promise.all([
        signup(data.email, data.password, data.name),
        new Promise(resolve => setTimeout(resolve, 3000))
      ]);
      navigate("/");
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