import { useEffect } from "react";
import { useAuthStore } from "@/store/auth/store";
import { useSlideshowFormStore } from "@/features/slideshow-form/store/store";

 const useAppInit = () => {
  const { isAuthenticated } = useAuthStore();
  const { fetchInitialFormData } = useSlideshowFormStore();

  useEffect(() => {
    if (!isAuthenticated) return;

    fetchInitialFormData();
  }, [isAuthenticated, fetchInitialFormData]);

};

export default useAppInit;