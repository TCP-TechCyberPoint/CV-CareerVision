import { useState, useEffect } from "react";
import { AUTH_CONSTANTS } from "../constants";

// Hook for managing Auth0 loading timeouts
export const useAuth0Timeout = (isLoading: boolean) => {
  const [hasTimedOut, setHasTimedOut] = useState(false);

  useEffect(() => {
    if (isLoading && !hasTimedOut) {
      const timer = window.setTimeout(() => {
        setHasTimedOut(true);
      }, AUTH_CONSTANTS.AUTH0_LOADING_TIMEOUT);

      return () => window.clearTimeout(timer);
    } else if (!isLoading) {
      setHasTimedOut(false);
    }
  }, [isLoading, hasTimedOut]);

  return hasTimedOut;
};

// Utility function to create a timeout promise
export const createTimeoutPromise = <T>(
  promise: Promise<T>,
  timeoutMs: number,
  errorMessage: string
): Promise<T> => {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) =>
      window.setTimeout(() => reject(new Error(errorMessage)), timeoutMs)
    )
  ]);
}; 