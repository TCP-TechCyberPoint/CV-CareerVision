import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const getAccessToken = async (code: string): Promise<string> => {
  const clientSecret = process.env.VITE_LINKEDIN_CLIENT_SECRET;
  if (!clientSecret) {
    throw new Error("LinkedIn client secret is not configured");
  }

  const params = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    redirect_uri: "http://localhost:5173/linkedin", // MUST match LinkedIn app + frontend login step
    client_id: "776iicpmhtuhxt",
    client_secret: clientSecret,
  });

  try {
    const response = await axios.post(
      "https://www.linkedin.com/oauth/v2/accessToken",
      params,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    console.log("response", response);

    return response.data.access_token;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      console.error("Failed to get access token:", {
        message: err.message,
        status: err.response?.status,
        details: err.response?.data,
      });
    }
    console.error("Failed to get access token:", err);
    throw new Error("LinkedIn access token request failed");
  }
};
