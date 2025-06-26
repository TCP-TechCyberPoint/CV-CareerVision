import { useState, useCallback } from 'react';

interface UseRetryOptions {
  maxAttempts?: number;
  baseDelay?: number;
  maxDelay?: number;
}

export const useRetry = (options: UseRetryOptions = {}) => {
  const { maxAttempts = 2, baseDelay = 500, maxDelay = 2000 } = options;
  const [attempts, setAttempts] = useState(0);
  const [isRetrying, setIsRetrying] = useState(false);

  const retry = useCallback(async <T>(
    operation: () => Promise<T>,
    onError?: (error: Error, attempt: number) => void
  ): Promise<T> => {
    let lastError: Error;
    
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        setAttempts(attempt);
        setIsRetrying(true);
        
        const result = await operation();
        
        // Success - reset state
        setAttempts(0);
        setIsRetrying(false);
        return result;
        
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));
        
        // Call error handler if provided
        if (onError) {
          onError(lastError, attempt);
        }
        
        // If this is the last attempt, don't wait
        if (attempt === maxAttempts) {
          break;
        }
        
        // Calculate delay with exponential backoff
        const delay = Math.min(baseDelay * Math.pow(2, attempt - 1), maxDelay);
        
        // Wait before retrying
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    
    // All attempts failed
    setAttempts(0);
    setIsRetrying(false);
    throw lastError!;
  }, [maxAttempts, baseDelay, maxDelay]);

  const reset = useCallback(() => {
    setAttempts(0);
    setIsRetrying(false);
  }, []);

  return {
    retry,
    reset,
    attempts,
    isRetrying,
    hasAttempted: attempts > 0
  };
}; 