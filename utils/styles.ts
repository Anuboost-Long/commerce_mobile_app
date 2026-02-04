import { Dimension } from "@/constants/dimension";
import { DimensionValue, Platform, StatusBar, StyleSheet } from "react-native";
import { moderateScale, ms } from "react-native-size-matters";

export const metricStyle = {
  paddingHorizontal: (value: number) => {
    return { paddingHorizontal: moderateScale(value) };
  },
  paddingVertical: (value: number) => {
    return { paddingVertical: moderateScale(value) };
  },
  padding: (value: number) => {
    return { padding: moderateScale(value) };
  },
  paddingTop: (value: number) => {
    return { paddingTop: moderateScale(value) };
  },
  paddingLeft: (value: number) => {
    return { paddingLeft: moderateScale(value) };
  },
  marginBottom: (value: number) => {
    return { marginBottom: moderateScale(value) };
  },
  width: (value: DimensionValue) => {
    return { width: value };
  },
};

export const fastStyle = StyleSheet.create({
  rowView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rowViewEnd: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  innerRowEnd: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  justifyEnd: {
    justifyContent: "flex-end",
  },
  innerRowStart: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  innerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowStart: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "flex-start",
  },
  rowCenter: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  colCenter: {
    justifyContent: "center",
    alignItems: "center",
  },
  colStart: { justifyContent: "center", alignItems: "flex-start" },
  colEnd: { justifyContent: "center", alignItems: "flex-end" },
  wrapRow: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  container: {
    flex: 1,
  },
  shadow: {
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  heavyShadow: {
    shadowOffset: {
      width: -4,
      height: -1,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,
    elevation: 20,
  },
  flex: {
    flex: 1,
  },
  safeArea: {
    paddingTop: Platform.select({
      android: (StatusBar?.currentHeight ?? 0) + moderateScale(15),
      ios: 0,
    }),
  },
  backDrop: {
    position: "absolute",
    height: "100%",
    width: "100%",
    top: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  image: {
    height: "100%",
    width: "100%",
  },
  self_end: {
    alignSelf: "flex-end",
  },
  card: {
    width: Dimension.ScreenWidth - ms(30),
    borderRadius: ms(10),
    alignSelf: "center",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
});
