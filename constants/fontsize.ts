import { ms } from "react-native-size-matters";

export const FontSizes = {
  HeroText: ms(24),
  Title: ms(20),
  SubTitle: ms(14),
  SubText: ms(10),
  Text: ms(12),
  Indicator: ms(8),
};

export type FontSizeKey = keyof typeof FontSizes;
