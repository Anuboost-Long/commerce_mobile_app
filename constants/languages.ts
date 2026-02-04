export const Languages = {
  en: "en",
  kh: "kh",
} as const;

export type Language = (typeof Languages)[keyof typeof Languages];
