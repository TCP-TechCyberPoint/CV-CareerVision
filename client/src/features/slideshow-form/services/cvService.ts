import axiosInstance from "@/api/axios-instance";
import type { SlideshowFormData } from "@slideshow-form/types";

export type SectionName = keyof SlideshowFormData;
export type SectionData = SlideshowFormData[SectionName];

const cvService = {
  saveSection: async (sectionName: SectionName, sectionData: SectionData) => {
    console.log("sectionName", sectionName);
    console.log("sectionData", sectionData);
    const response = await axiosInstance.post("/api/cv/save", {
      [sectionName]: sectionData,
    });
    console.log("response", response.data);
    return response.data;
  },

  fetchCvData: async () => {
    const response = await axiosInstance.get("/api/cv/get");
    console.log("response", response);
    return response.data.cv;
  },
};

export default cvService;
