import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/auth/store";
import { cookieUtils } from "@/utils/cookie-utils";

export const useTokenValidation = () => {
  const { isAuthenticated, isLoading } = useAuthStore();
  const [isTokenValid, setIsTokenValid] = useState<boolean | null>(null);
  const [hasChecked, setHasChecked] = useState(false);

  useEffect(() => {
    // If auth store is still loading, wait
    if (isLoading) {
      setIsTokenValid(null);
      return;
    }

    // If we already checked, don't check again unless auth state changed
    if (hasChecked && isTokenValid !== null) {
      return;
    }

    const token = cookieUtils.getToken();
    if (!token) {
      setIsTokenValid(false);
      setHasChecked(true);
      return;
    }

    // If auth store says we're authenticated and we have a token, assume it's valid
    if (isAuthenticated && token) {
      setIsTokenValid(true);
      setHasChecked(true);
      return;
    }

    // If not authenticated but we have a token, it might be invalid
    if (!isAuthenticated && token) {
      setIsTokenValid(false);
      setHasChecked(true);
      return;
    }

    setIsTokenValid(false);
    setHasChecked(true);
  }, [isAuthenticated, isLoading, hasChecked, isTokenValid]);

  return { isTokenValid, isAuthenticated };
};
