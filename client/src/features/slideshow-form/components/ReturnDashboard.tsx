import { useNavigate } from "react-router-dom";
import BaseButton from "@/components/ui/BaseButton";
import { SLIDESHOW_PATHS } from "../routes";

const ReturnDashboard = () => {
  const navigate = useNavigate();

  const handleNavigateToDashboard = () => {
    navigate(SLIDESHOW_PATHS.DASHBOARD);
  };

  return (
    <BaseButton
      onClick={handleNavigateToDashboard}
      variant="outline"
      color="orange.500"
      colorPalette="orange"
      size="lg"
      minW="200px"
      _hover={{
        transform: "translateY(-2px)",
        boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
      }}
      transition="all 0.3s ease"
    >
      🏠 Return to Dashboard
    </BaseButton>
  );
};

export default ReturnDashboard;
