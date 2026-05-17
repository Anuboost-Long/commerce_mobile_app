import { Dimension } from "@/constants/dimension";
import { TabItem, TabItems } from "@/constants/tab-resource";
import useThemeStyle, { StyleParam } from "@/hooks/useThemeStyle";
import { fastStyle } from "@/utils/styles";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { BlurView } from "expo-blur";
import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import { ms } from "react-native-size-matters";
import TabButton from "./tab-button";

export const TAB_BAR_HEIGHT = ms(55);
export const TAB_BAR_BOTTOM_OFFSET = ms(25);

export default function TabBar(props: BottomTabBarProps) {
  const { themeStyle, theme } = useThemeStyle(styles);

  const renderTabItem = (item: TabItem, index: number) => {
    const isActive = index === props.state.index;
    return <TabButton key={item.id} item={item} isActive={isActive} />;
  };

  return (
    <View style={themeStyle.layer}>
      <BlurView
        style={themeStyle.container}
        intensity={theme.isDark ? 55 : 18}
        tint={theme.isDark ? "dark" : "light"}
      >
        {TabItems.map((item, index) => renderTabItem(item, index))}
      </BlurView>
    </View>
  );
}

const styles = ({ colors }: StyleParam) =>
  StyleSheet.create({
    container: {
      width: Dimension.ScreenWidth - ms(40),
      backgroundColor: Platform.select({
        ios: colors.surface,
        android: colors.surface,
      }),
      height: TAB_BAR_HEIGHT,
      paddingHorizontal: ms(2),
      borderRadius: ms(40),
      overflow: "hidden",
      borderWidth: 1,
      borderColor: colors.border,

      ...fastStyle.innerRow,
      ...Platform.select({
        android: { paddingVertical: ms(2) },
        ios: { paddingVertical: ms(2) },
      }),
    },
    layer: {
      bottom: TAB_BAR_BOTTOM_OFFSET,
      alignSelf: "center",
      position: "absolute",
      backgroundColor: "transparent",
      borderRadius: ms(40),
      ...fastStyle.shadow,
      shadowColor: colors.backDrop,
    },
  });
