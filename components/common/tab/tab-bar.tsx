import { Dimension } from "@/constants/dimension";
import { TabItem, TabItems } from "@/constants/tab-resource";
import useThemeStyle, { StyleParam } from "@/hooks/useThemeStyle";
import { fastStyle } from "@/utils/styles";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import React from "react";
import { StyleSheet, View } from "react-native";
import { ms } from "react-native-size-matters";
import TabButton from "./tab-button";

export default function TabBar(props: BottomTabBarProps) {
  const { themeStyle } = useThemeStyle(styles);

  const renderTabItem = (item: TabItem, index: number) => {
    const isActive = index === props.state.index;
    return <TabButton key={item.id} item={item} isActive={isActive} />;
  };

  return (
    <View style={themeStyle.container}>
      {TabItems.map((item, index) => renderTabItem(item, index))}
    </View>
  );
}

const styles = ({ colors }: StyleParam) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.surface,
      width: Dimension.ScreenWidth - ms(40),
      height: ms(55),
      borderRadius: ms(20),
      position: "absolute",
      alignSelf: "center",
      bottom: ms(20),
      ...fastStyle.shadow,
      shadowColor: colors.backDrop,
      ...fastStyle.innerRow,
    },
  });
