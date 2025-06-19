import axiosInstance from "@/api/axios-instance";
import type { SlideshowFormData } from "@slideshow-form/types";

export type SectionName = keyof SlideshowFormData;
export type SectionData = SlideshowFormData[SectionName];

const cvService = {
  saveSection: async (sectionName: SectionName, sectionData: SectionData) => {
    const response = await axiosInstance.post("/api/cv/save", {
      [sectionName]: sectionData,
    });
    return response.data;
  },

  fetchCvData: async () => {
    const response = await axiosInstance.get("/api/cv/get");
    return response.data.cv;
  },
};

export default cvService;
