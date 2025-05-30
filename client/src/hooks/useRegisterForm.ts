import { useAuthForm } from "./useAuthForm";
import { validateRegisterForm, type RegisterFormData } from "@/utils/validations";

export const useRegisterForm = () => {
  const { handleSubmit: baseHandleSubmit, errors: baseErrors, isLoading, clearError, setErrors } = useAuthForm("register");

  const handleSubmit = async (data: RegisterFormData) => {
    if (!validateRegisterForm(data, setErrors)) return;
    await baseHandleSubmit(data);
  };

  // Cast errors to the proper type for register form
  const errors = baseErrors as Partial<RegisterFormData> & { general: string | null };

  return { handleSubmit, errors, isLoading, clearError };
};
