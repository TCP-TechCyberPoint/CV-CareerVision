import { Request, Response, NextFunction } from "express";
import { expressjwt } from "express-jwt";
import jwksRsa from "jwks-rsa";
import dotenv from "dotenv";
import { findByEmail, createUser } from "../repositories/userRepository";
import bcrypt from "bcryptjs";

dotenv.config();

// Extend Request interface to include auth property
declare global {
  namespace Express {
    interface Request {
      auth?: {
        sub: string;
        email?: string;
        name?: string;
        [key: string]: any;
      };
    }
  }
}

// Environment validation
const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN;
const AUTH0_AUDIENCE = process.env.AUTH0_AUDIENCE;

if (!AUTH0_DOMAIN || !AUTH0_AUDIENCE) {
  throw new Error(
    "Missing Auth0 configuration. Please set AUTH0_DOMAIN and AUTH0_AUDIENCE environment variables."
  );
}

// Simple in-memory cache for user info (consider Redis for production)
const userInfoCache = new Map<
  string,
  { email: string; name: string; timestamp: number }
>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

// JWT validation middleware
export const checkJwt = expressjwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${AUTH0_DOMAIN}/.well-known/jwks.json`,
  }),
  audience: AUTH0_AUDIENCE,
  issuer: `https://${AUTH0_DOMAIN}/`,
  algorithms: ["RS256"],
});

// Fetch user info from Auth0 with caching
const fetchUserInfo = async (
  accessToken: string
): Promise<{ email: string; name: string }> => {
  const cacheKey = accessToken.substring(0, 20);
  const cached = userInfoCache.get(cacheKey);

  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return { email: cached.email, name: cached.name };
  }

  try {
    const userInfoResponse = await fetch(`https://${AUTH0_DOMAIN}/userinfo`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      // Add timeout to prevent hanging requests
      signal: AbortSignal.timeout(10000),
    });

    if (!userInfoResponse.ok) {
      throw new Error(
        `Auth0 API error: ${userInfoResponse.status} ${userInfoResponse.statusText}`
      );
    }

    const userInfo = await userInfoResponse.json();

    if (!userInfo.email) {
      throw new Error("Email not found in user info");
    }

    const result = {
      email: userInfo.email,
      name: userInfo.given_name || userInfo.email,
    };

    // Cache the result
    userInfoCache.set(cacheKey, {
      ...result,
      timestamp: Date.now(),
    });

    return result;
  } catch (error) {
    console.error("Error fetching user info from Auth0:", error);
    throw error;
  }
};

// User management middleware with improved error handling
export const manageUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.auth?.sub) {
      return res.status(400).json({
        error: "INVALID_TOKEN",
        message: "User ID not found in token",
      });
    }

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        error: "MISSING_TOKEN",
        message: "Authorization header with Bearer token is required",
      });
    }

    const accessToken = authHeader.replace("Bearer ", "");
    const { email, name } = await fetchUserInfo(accessToken);

    let userExists = await findByEmail(email);

    if (!userExists) {
      // Create new user with secure password
      const hashedPassword = await bcrypt.hash(
        `auth0_${req.auth.sub}_${Date.now()}`,
        12
      );

      try {
        await createUser({
          name,
          email,
          password: hashedPassword,
        });
      } catch (createError) {
        console.error("Error creating user:", createError);
      }
    }

    // Add user info to request for downstream middleware
    req.body.email = email;
    req.body.userName = name;
    req.body.userId = req.auth.sub;

    next();
  } catch (error) {
    console.error("Error in manageUser middleware:", error);

    // Provide more specific error responses
    if (error instanceof Error) {
      if (error.message.includes("timeout")) {
        return res.status(504).json({
          error: "TIMEOUT",
          message: "Request to Auth0 timed out",
        });
      }
      if (error.message.includes("Auth0 API error")) {
        return res.status(401).json({
          error: "AUTH0_ERROR",
          message: "Failed to validate user with Auth0",
        });
      }
    }

    res.status(500).json({
      error: "INTERNAL_ERROR",
      message: "Internal server error during user management",
    });
  }
};

// Combined middleware for protected routes with fallback support
export const requireAuth = [checkJwt, manageUser];

// Utility function to clear cache (useful for testing or manual cache management)
export const clearUserInfoCache = () => {
  userInfoCache.clear();
};

// Utility function to get cache stats
export const getCacheStats = () => {
  return {
    size: userInfoCache.size,
    entries: Array.from(userInfoCache.keys()),
  };
};
