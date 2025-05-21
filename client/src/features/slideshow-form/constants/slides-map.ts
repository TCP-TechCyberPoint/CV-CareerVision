export const slideMap = {
  intro: 0,
  vitals: 1,
  hardSkills: 2,
  softSkills: 3,
  end: 3,
} as const;

export const slideKeys = Object.keys(slideMap) as Array<keyof typeof slideMap>;
export const slideNames = Object.entries(slideMap).reduce(
  (acc, [key, val]) => ({ ...acc, [val]: key }),
  {} as Record<number, string>
);
