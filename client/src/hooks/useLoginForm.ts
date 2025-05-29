import { useState } from "react";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { toaster } from "@/components/ui/toaster";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const useLoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<LoginFormData>>({});
  const { login } = useAuth();
  const navigate = useNavigate();

  const validateForm = (data: LoginFormData) => {
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

  const handleSubmit = async (data: LoginFormData) => {
    if (!validateForm(data)) return;

    setIsLoading(true);
    try {
      await Promise.all([
        login(data.email, data.password),
        new Promise((resolve) => setTimeout(resolve, 3000)),
      ]);
      navigate("/");
    } catch (error: Error | unknown) {
      if (error instanceof Error) {
        toaster.create({
          title: "Error",
          description: `Failed to login. Please try again. ${error.message}`,
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
