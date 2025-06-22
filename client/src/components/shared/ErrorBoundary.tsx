// ErrorBoundary.tsx
import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";
import { Box, Button, VStack, Alert, CollapsibleRoot, CollapsibleTrigger, CollapsibleContent } from "@chakra-ui/react";
import { MdRefresh, MdBugReport } from "react-icons/md";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  showDetails?: boolean;
  onRetry?: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  private retryTimeoutId: number | null = null;

  state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorInfo });

    // Custom error handler
    this.props.onError?.(error, errorInfo);

    // Enhanced logging with more context
    console.group("🚨 React Error Boundary");
    console.error("Error:", error);
    console.error("Error Info:", errorInfo);
    console.error("Component Stack:", errorInfo.componentStack);
    console.groupEnd();

    // Report to external service in production
    if (import.meta.env.PROD) {
      this.reportError(error, errorInfo);
    }
  }

  componentWillUnmount() {
    if (this.retryTimeoutId) {
      clearTimeout(this.retryTimeoutId);
    }
  }

  private reportError = (error: Error, errorInfo: ErrorInfo) => {
    console.log("🚨 Reporting error:", { error, errorInfo });
    // TODO: Integrate with error reporting service (Sentry, LogRocket, etc.)
    // Example: Sentry.captureException(error, { extra: errorInfo });
  };

  private handleRetry = () => {
    // Call custom retry handler if provided
    if (this.props.onRetry) {
      this.props.onRetry();
    }
    
    // Reset error state
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  private handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default enhanced error UI
      return (
        <ErrorFallback
          error={this.state.error}
          errorInfo={this.state.errorInfo}
          onRetry={this.handleRetry}
          onReload={this.handleReload}
          showDetails={this.props.showDetails}
        />
      );
    }

    return this.props.children;
  }
}

// Enhanced Error Fallback Component
interface ErrorFallbackProps {
  error: Error | null;
  errorInfo: ErrorInfo | null;
  onRetry: () => void;
  onReload: () => void;
  showDetails?: boolean;
}

const ErrorFallback = ({
  error,
  errorInfo,
  onRetry,
  onReload,
  showDetails = false,
}: ErrorFallbackProps) => {
  const isNetworkError = error?.message?.includes('network') || 
                        error?.message?.includes('fetch') ||
                        error?.message?.includes('timeout');
  
  const isAuthError = error?.message?.includes('auth') || 
                     error?.message?.includes('unauthorized') ||
                     error?.message?.includes('401');

  return (
    <Box
      minH="400px"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={6}
    >
      <VStack gap={6} maxW="600px" textAlign="center">
        <Alert.Root status="error" borderRadius="lg">
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>
              {isNetworkError ? "Connection Error" : 
               isAuthError ? "Authentication Error" : 
               "Something went wrong"}
            </Alert.Title>
            <Alert.Description>
              {isNetworkError ? "Please check your internet connection and try again." :
               isAuthError ? "Please log in again to continue." :
               "We encountered an unexpected error. Please try refreshing the page."}
            </Alert.Description>
          </Alert.Content>
        </Alert.Root>

        <VStack gap={3}>
          <Button colorPalette="blue" onClick={onRetry} size="lg">
            <MdRefresh />
            Try Again
          </Button>

          <Button variant="outline" onClick={onReload} size="sm">
            Reload Page
          </Button>

          {showDetails && (
            <CollapsibleRoot>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MdBugReport />
                  Show Error Details
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <Box
                  mt={4}
                  p={4}
                  bg="gray.50"
                  borderRadius="md"
                  fontSize="sm"
                  fontFamily="mono"
                  textAlign="left"
                  maxH="200px"
                  overflow="auto"
                >
                  <Box mb={2} fontWeight="bold">Error:</Box>
                  <Box mb={4}>{error?.message}</Box>
                  
                  {errorInfo && (
                    <>
                      <Box mb={2} fontWeight="bold">Component Stack:</Box>
                      <Box>{errorInfo.componentStack}</Box>
                    </>
                  )}
                </Box>
              </CollapsibleContent>
            </CollapsibleRoot>
          )}
        </VStack>
      </VStack>
    </Box>
  );
};

export default ErrorBoundary;

// Quick Error Boundary for critical sections
export const CriticalErrorBoundary = ({
  children,
}: {
  children: ReactNode;
}) => (
  <ErrorBoundary
    showDetails={import.meta.env.DEV}
    onError={(error, errorInfo) => {
      // Enhanced logging for critical errors
      console.error("🔥 Critical Error:", { error, errorInfo });
    }}
  >
    {children}
  </ErrorBoundary>
);
