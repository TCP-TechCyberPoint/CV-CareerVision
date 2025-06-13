import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth/store";
import type { LoginFormData, RegisterFormData } from "@/utils/validations";
import { validateLoginForm, validateRegisterForm } from "@/utils/validations";

export const useLoginForm = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState<Partial<LoginFormData>>({});
  const { login, isLoading, clearError } = useAuthStore();

  const handleSubmit = async (data: LoginFormData) => {
    clearError();
    const isValid = validateLoginForm(data, setErrors);
    if (!isValid) return;

    try {
      await login(data);
      navigate("/");
    } catch (error: unknown) {
      console.error("Login error:", error);
      alert("Failed to login. Please try again.");
    }
  };

  return { handleSubmit, errors, isLoading };
};

export const useRegisterForm = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState<Partial<RegisterFormData>>({});
  const { register, isLoading, clearError } = useAuthStore();

  const handleSubmit = async (data: RegisterFormData) => {
    clearError();
    const isValid = validateRegisterForm(data, setErrors);
    if (!isValid) return;

    try {
      await register(data);
      navigate("/login");
    } catch (error: unknown) {
      console.error("Register error:", error);
      alert("Failed to register. Please try again.");
    }
  };

  return { handleSubmit, errors, isLoading };
};
