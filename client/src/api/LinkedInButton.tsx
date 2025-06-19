import BaseButton from "@/components/ui/BaseButton";
import { FaLinkedin } from "react-icons/fa";
import { useLinkedIn } from "react-linkedin-login-oauth2";
import { useAuthStore } from "@/store/auth/store";
import { useNavigate } from "react-router-dom";

const LinkedInButton = () => {
  const { linkedInLogin, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const { linkedInLogin: linkedInOAuth } = useLinkedIn({
    clientId: "776iicpmhtuhxt",
    redirectUri: "http://localhost:5173/linkedin", // must match LinkedIn app settings
    scope: "profile email openid",
    onSuccess: async (code: string) => {
      console.log("✅ LinkedIn code received!");
      const success = await linkedInLogin(code);
      if (success) {
        navigate("/");
      }
    },
    onError: ({ error, errorMessage }) => {
      console.error("❌ LinkedIn OAuth error:", error, errorMessage);
    },
    closePopupMessage: "Please close the popup to continue",
  });

  return (
    <BaseButton 
      bg="#0072B1" 
      onClick={linkedInOAuth}
      disabled={isLoading}
    >
      <FaLinkedin color="white" />
      {isLoading ? "Signing in..." : "Login with LinkedIn"}
    </BaseButton>
  );
};

export default LinkedInButton;
