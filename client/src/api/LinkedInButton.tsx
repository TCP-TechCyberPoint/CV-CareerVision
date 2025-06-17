import BaseButton from "@/components/ui/BaseButton";
import { FaLinkedin } from "react-icons/fa";
import { useLinkedIn } from "react-linkedin-login-oauth2";
import axios from "axios";

const LinkedInButton = () => {
  const { linkedInLogin } = useLinkedIn({
    clientId: "776iicpmhtuhxt",
    redirectUri: "http://localhost:5173/linkedin", // must match LinkedIn app settings
    scope: "profile email openid",
    onSuccess: (code: string) => {
      console.log("✅ LinkedIn code received:", code);
      axios.post("http://localhost:5000/auth/linkedin", { code });
    },
    onError: ({ error, errorMessage }) => {
      console.error("❌ LinkedIn OAuth error:", error, errorMessage);
    },
  });

  return (
    <BaseButton bg="#0072B1" onClick={linkedInLogin}>
      <FaLinkedin color="white" />
      Login with LinkedIn
    </BaseButton>
  );
};

export default LinkedInButton;
