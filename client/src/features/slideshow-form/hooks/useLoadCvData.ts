import {  useEffect } from "react";
import { useSlideshowFormStore } from "../store";
import { useAuthStore } from "@/store/auth/store";

export const useLoadCvData = () => {
  const updateFormData = useSlideshowFormStore((state) => state.updateFormData);
  const user = useAuthStore().user;

  useEffect(() => {
    if (user) {
      console.log("user", user);
      // updateFormData(...user.cv);
    }
  }, [user, updateFormData]);
};
