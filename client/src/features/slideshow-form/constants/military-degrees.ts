export const MILITARY_DEGREES = {
  enlisted: {
    private: { hebrew: "טוראי", english: "Private" },
    corporal: { hebrew: "רב-טוראי", english: "Corporal" },
    sergeant: { hebrew: "סמל", english: "Sergeant" },
    staff_sergeant: { hebrew: "סמל ראשון", english: "Staff Sergeant" }
  },
  senior_ncos: {
    sergeant_first_class: { hebrew: "רב-סמל (רס\"ל)", english: "Sergeant First Class" },
    master_sergeant: { hebrew: "רב-סמל ראשון (רס\"ר)", english: "Master Sergeant" },
    sergeant_major: { hebrew: "רב-סמל מתקדם (רס\"מ)", english: "Sergeant Major" },
    senior_sergeant_major: { hebrew: "רב-סמל בכיר (רס\"ב)", english: "Senior Sergeant Major" },
    command_chief_warrant_officer: { hebrew: "רב-נגד (רנ\"ג)", english: "Command Chief Warrant Officer" }
  },
  officers: {
    second_lieutenant: { hebrew: "סגן משנה (סג\"מ)", english: "Second Lieutenant" },
    lieutenant: { hebrew: "סגן (סגן)", english: "Lieutenant" },
    captain: { hebrew: "סרן (סרן)", english: "Captain" },
    major: { hebrew: "רב-סרן (רס\"ן)", english: "Major" }
  }
} as const;

export const MILITARY_GROUP_LABELS = {
  enlisted: "חיילים (Enlisted)",
  senior_ncos: "נגדים (Senior NCOs)",
  officers: "קצינים (Officers)"
} as const; 