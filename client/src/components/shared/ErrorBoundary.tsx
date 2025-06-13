// ErrorBoundary.tsx
import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";
import {
  Box,
  VStack,
  Text,
  Button,
  Alert,
  Code,
  CollapsibleContent,
  CollapsibleRoot,
  CollapsibleTrigger,
} from "@chakra-ui/react";
import { MdRefresh, MdBugReport } from "react-icons/md";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  showDetails?: boolean;
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
            <Alert.Title>Oops! Something went wrong</Alert.Title>
            <Alert.Description>
              We encountered an unexpected error. Please try refreshing the
              page.
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
                  bg="gray.50"
                  _dark={{ bg: "gray.800" }}
                  p={4}
                  borderRadius="md"
                  maxW="100%"
                  overflow="auto"
                  mt={4}
                >
                  <VStack align="start" gap={3}>
                    {error && (
                      <Box>
                        <Text fontWeight="semibold" mb={2}>
                          Error Message:
                        </Text>
                        <Code
                          colorPalette="red"
                          p={2}
                          borderRadius="md"
                          display="block"
                        >
                          {error.message}
                        </Code>
                      </Box>
                    )}

                    {errorInfo?.componentStack && (
                      <Box>
                        <Text fontWeight="semibold" mb={2}>
                          Component Stack:
                        </Text>
                        <Code
                          fontSize="xs"
                          p={2}
                          borderRadius="md"
                          display="block"
                          whiteSpace="pre-wrap"
                        >
                          {errorInfo.componentStack}
                        </Code>
                      </Box>
                    )}
                  </VStack>
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
