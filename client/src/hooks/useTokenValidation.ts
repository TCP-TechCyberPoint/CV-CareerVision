import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { cookieUtils } from "@/utils/cookie-utils";

export const useTokenValidation = () => {
  const { isAuthenticated, validateToken } = useAuth();
  const [isTokenValid, setIsTokenValid] = useState<boolean | null>(null);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = cookieUtils.getToken();
        if (!token) {
          setIsTokenValid(false);
          return;
        }

        const valid = await validateToken();
        setIsTokenValid(valid);
      } catch (error) {
        console.error("Token validation error:", error);
        setIsTokenValid(false);
      }
    };

    checkToken();
  }, [validateToken]);

  return { isTokenValid, isAuthenticated };
};
