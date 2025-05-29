import { useState } from "react";
import { z } from "zod";
// import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

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
  // const navigate = useNavigate();

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

    const result = await register(data.email, data.password, data.name);
    alert(result);

    setIsLoading(false);
  };

  return {
    handleSubmit,
    errors,
    isLoading,
  };
};
