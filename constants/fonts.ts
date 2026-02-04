export const EnglishFont = {
  ExtraLight: "EnglishExLight",
  Light: "EnglishLight",
  Normal: "EnglishNormal",
  Medium: "EnglishMedium",
  SemiBold: "EnglishSemiBold",
  Bold: "EnglishBold",
} as const;

export const KhmerFont = {
  ExtraLight: "KhmerExLight",
  Light: "KhmerLight",
  Normal: "KhmerNormal",
  Medium: "KhmerMedium",
  SemiBold: "KhmerSemiBold",
  Bold: "KhmerBold",
};

export type FontKey = keyof typeof EnglishFont;
