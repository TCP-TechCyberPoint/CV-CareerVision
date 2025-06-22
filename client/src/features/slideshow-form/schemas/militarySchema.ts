import { z } from "zod";

export const militaryServiceSchema = z.object({
  militaryServiceStatus: z.enum([
    'full_military',
    'partial_military',
    'national_service',
    'civil_service',
    'exempted',
    'not_served',
    'other'
  ], {
    required_error: "Please select your military service status",
  }),
  serviceDuration: z.string().optional(),
  serviceDetails: z.string().optional(),
  otherServiceType: z.string().optional(),
  degreeGroup: z.enum(['enlisted', 'senior_ncos', 'officers']).optional(),
  degree: z.string().optional(),
}).refine((data) => {
  // If status is 'other', otherServiceType is required
  if (data.militaryServiceStatus === 'other' && !data.otherServiceType) {
    return false;
  }
  return true;
}, {
  message: "Please specify the type of service",
  path: ["otherServiceType"],
}).refine((data) => {
  // If status is 'full_military', degreeGroup is required
  if (data.militaryServiceStatus === 'full_military' && !data.degreeGroup) {
    return false;
  }
  return true;
}, {
  message: "Please select your military degree group",
  path: ["degreeGroup"],
}).refine((data) => {
  // If degreeGroup is selected, degree is required
  if (data.degreeGroup && !data.degree) {
    return false;
  }
  return true;
}, {
  message: "Please select your military degree",
  path: ["degree"],
}).refine((data) => {
  if (data.militaryServiceStatus === 'exempted' || data.militaryServiceStatus === 'not_served') {
        return true; // Always valid for these statuses
  }
  return true;
});

export type MilitaryServiceFormData = z.infer<typeof militaryServiceSchema>; 