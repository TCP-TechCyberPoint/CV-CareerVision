import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

export const useTokenValidation = () => {
  const { isAuthenticated, validateToken } = useAuth();
  const [isValidating, setIsValidating] = useState(true);
  const [isTokenValid, setIsTokenValid] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      if (isAuthenticated) {
        const valid = await validateToken();
        setIsTokenValid(valid);
      }
      setIsValidating(false);
    };

    checkToken();
  }, [isAuthenticated, validateToken]);

  return { isValidating, isTokenValid, isAuthenticated };
}; 