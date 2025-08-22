import { useEffect, useMemo, useState } from "react";
import { storageUtils } from "../utils";

// Manual JWT-based auth state
export const useAuth0Integration = () => {
  const [authState, setAuthState] = useState({
    token: storageUtils.getToken(),
    user: storageUtils.getUser(),
  });

  useEffect(() => {
    const handler = () => {
      setAuthState({ token: storageUtils.getToken(), user: storageUtils.getUser() });
    };
    window.addEventListener('auth-changed', handler);
    return () => window.removeEventListener('auth-changed', handler);
  }, []);

  const isAuthenticated = useMemo(() => !!authState.token, [authState.token]);
  const isLoading = false;

  const getAccessToken = async (): Promise<string | null> => storageUtils.getToken();
  const logout = async () => storageUtils.clearAllStorage();

  return {
    isAuthenticated,
    user: authState.user,
    isLoading,
    loginWithAuth0: async () => {},
    logout,
    getAccessToken,
  };
};