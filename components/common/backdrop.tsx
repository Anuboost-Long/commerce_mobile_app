import useThemeStyle, { StyleParam } from "@/hooks/useThemeStyle";
import { fastStyle } from "@/utils/styles";
import React from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";

export default function BackDrop({
  onCancelModal = () => {},
  cancellable = true,
  childCenter = true,
  children,
  viewStyle = {},
}: Readonly<{
  onCancelModal?: () => void;
  childCenter?: boolean;
  cancellable?: boolean;
  children: React.ReactNode;
  viewStyle?: StyleProp<ViewStyle>;
}>) {
  const { themeStyle } = useThemeStyle(styles);
  return (
    <View style={[fastStyle.container, childCenter && fastStyle.colCenter]}>
      <Pressable
        style={[themeStyle.backDrop, viewStyle]}
        onPress={onCancelModal}
        disabled={!cancellable}
      />
      {children}
    </View>
  );
}

const styles = ({ colors }: StyleParam) =>
  StyleSheet.create({
    backDrop: {
      position: "absolute",
      left: 0,
      top: 0,
      height: "100%",
      width: "100%",
      backgroundColor: colors.backDrop,
    },
  });
