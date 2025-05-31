import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import type { LoginFormData, RegisterFormData } from "@/utils/validations";

type AuthFormData = LoginFormData | RegisterFormData;
type AuthType = "login" | "register";

export const useAuthForm = (type: AuthType) => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState<Partial<AuthFormData>>({});
  const { login, register, isLoading, error, clearError } = useAuth();

  const handleSubmit = async (data: AuthFormData) => {
    clearError();

    try {
      const result = type === "login" 
        ? await login(data as LoginFormData)
        : await register(data as RegisterFormData);

      if ((type === "login" && result.status === 200) || (type === "register" && result.status === 201)) {
        if (type === "login") {
          navigate("/");
        } else {
          alert(result.data.message);
          navigate("/login");
        }
      } else {
        alert(result.data.message);
      }
    } catch (error: unknown) {
      console.log("error", error);
      alert(`Failed to ${type}. Please try again.`);
    }
  };

  return {
    handleSubmit,
    errors: { ...errors, general: error },
    isLoading,
    clearError,
    setErrors,
  };
}; 