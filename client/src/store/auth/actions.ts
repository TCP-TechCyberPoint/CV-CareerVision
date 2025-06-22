import axiosInstance from "@/api/axios-instance";
import type {
  LoginCredentials,
  RegisterCredentials,
  AuthResponse,
  AuthState,
} from "./types";
import { AxiosError } from "axios";
import { cookieUtils } from "@/utils/cookie-utils";

type SetState = (state: Partial<AuthState>) => void;

export const loginUser = async (
  credentials: LoginCredentials,
  setState: SetState
): Promise<boolean> => {
  setState({ isLoading: true, error: null });

  try {
    const { data } = await axiosInstance.post<AuthResponse>(
      "/auth/login",
      credentials
    );

    if (data.token) {
      setState({
        user: data.user || null,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
      cookieUtils.setToken(data.token);
      return true;
    }

    setState({
      isLoading: false,
      error: data.message || "Login failed",
    });
    return false;
  } catch (error: unknown) {
    let errorMessage = "An unexpected error occurred";

    if (error instanceof AxiosError) {
      errorMessage = error?.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    setState({
      isLoading: false,
      error: errorMessage,
    });
    return false;
  }
};

export const registerUser = async (
  credentials: RegisterCredentials,
  setState: SetState
): Promise<boolean> => {
  setState({ isLoading: true, error: null });

  try {
    const { data } = await axiosInstance.post<AuthResponse>(
      "/auth/register",
      credentials
    );

    if (data.user) {
      setState({
        isLoading: false,
        error: null,
      });
      return true;
    }

    setState({
      isLoading: false,
      error: data.message || "Registration failed",
    });
    return false;
  } catch (error: unknown) {
    let errorMessage = "An unexpected error occurred";

    if (error instanceof AxiosError) {
      errorMessage = error?.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    setState({
      isLoading: false,
      error: errorMessage,
    });
    return false;
  }
};

export const validateUserToken = async (token: string): Promise<boolean> => {
  try {
    const { status } = await axiosInstance.get("/auth/validate", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return status === 200;
  } catch {
    return false;
  }
};

export const linkedInLogin = async (
  code: string,
  setState: SetState
): Promise<boolean> => {
  setState({ isLoading: true, error: null });

  try {
    const { data } = await axiosInstance.post<AuthResponse>("/auth/linkedin", {
      code,
    });

    if (data.token) {
      setState({
        user: data.user || null,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
      cookieUtils.setToken(data.token);
      return true;
    }

    setState({
      isLoading: false,
      error: data.message || "LinkedIn login failed",
    });
    return false;
  } catch (error: unknown) {
    let errorMessage = "LinkedIn authentication failed";

    if (error instanceof AxiosError) {
      errorMessage = error?.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    setState({
      isLoading: false,
      error: errorMessage,
    });
    return false;
  }
};
