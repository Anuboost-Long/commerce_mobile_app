import { Dimensions } from "react-native";

const screen = Dimensions.get("screen");
const window = Dimensions.get("window");

export const Dimension = {
  ScreenWidth: screen.width,
  ScreenHeight: screen.height,
  WindowWidth: window.width,
  WindowHeight: window.height,
} as const;
