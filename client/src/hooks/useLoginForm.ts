import { useAuthForm } from "./useAuthForm";
import { validateLoginForm, type LoginFormData } from "@/utils/validations";

export const useLoginForm = () => {
  const { handleSubmit: baseHandleSubmit, errors, isLoading, clearError, setErrors } = useAuthForm("login");

  const handleSubmit = async (data: LoginFormData) => {
    if (!validateLoginForm(data, setErrors)) return;
    await baseHandleSubmit(data);
  };

  return { handleSubmit, errors, isLoading, clearError };
};
