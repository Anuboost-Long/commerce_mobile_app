import { TabItem } from "@/constants/tab-resource";
import useThemeStyle, { StyleParam } from "@/hooks/useThemeStyle";
import { NavigationHelper } from "@/utils/navigation-helper";
import { fastStyle } from "@/utils/styles";
import React, { memo } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { ms } from "react-native-size-matters";
import AppText from "../app-text";

interface TabButtonProp {
  item: TabItem;
  isActive: boolean;
}

const TabButton = ({ item, isActive }: TabButtonProp) => {
  const { themeStyle, theme, t } = useThemeStyle(styles);
  const Icon = item.icon;
  const progress = useSharedValue(0);

  const textStyle = useAnimatedStyle(() => {
    const Yvalue = interpolate(
      progress.value,
      [0, 0.5],
      [0, 100],
      Extrapolation.CLAMP
    );

    const opacity = interpolate(
      progress.value,
      [0, 0.5],
      [1, 0],
      Extrapolation.CLAMP
    );

    return {
      transform: [{ translateY: Yvalue }],
      position: "absolute",
      opacity,
    };
  });

  const indicatorStyle = useAnimatedStyle(() => {
    const Yvalue = interpolate(
      progress.value,
      [0.5, 1],
      [100, 0],
      Extrapolation.CLAMP
    );

    const opacity = interpolate(
      progress.value,
      [0.5, 1],
      [0, 1],
      Extrapolation.CLAMP
    );

    return {
      transform: [{ translateY: Yvalue }],
      position: "absolute",
      opacity,
    };
  });

  const navigate = () => {
    NavigationHelper.navigate({ pathname: item.id });
  };

  return (
    <TouchableOpacity style={themeStyle.container} onPress={navigate}>
      <View
        style={[themeStyle.iconContainer, isActive && themeStyle.iconActive]}
      >
        <Icon
          width={ms(25)}
          height={ms(25)}
          fill={isActive ? theme.colors.primary : theme.colors.textSecondary}
        />
      </View>

      <View style={themeStyle.bottomContainer}>
        <Animated.View style={textStyle}>
          <AppText
            font="SemiBold"
            fontSize="SubText"
            style={[
              themeStyle.tabLabel,
              isActive && { color: theme.colors.primary },
            ]}
          >
            {t(item.label)}
          </AppText>
        </Animated.View>
        {/* <Animated.View style={[indicatorStyle, themeStyle.indicator]} /> */}
      </View>
    </TouchableOpacity>
  );
};

const styles = ({ colors }: StyleParam) =>
  StyleSheet.create({
    container: {
      flex: 1,
      height: "100%",
      ...fastStyle.colCenter,
      overflow: "hidden",
    },

    tabLabel: {
      color: colors.textSecondary,
    },
    indicator: {
      backgroundColor: colors.primary,
      width: ms(15),
      height: ms(2),
      borderRadius: ms(10),
    },
    bottomContainer: {
      height: ms(15),
      width: "100%",
      ...fastStyle.colCenter,
    },
    iconContainer: {
      paddingHorizontal: ms(10),
      paddingVertical: ms(2),
      borderColor: "transparent",
      borderRadius: ms(10),
      overflow: "hidden",
    },
    iconActive: {
      backgroundColor: "transparent",
    },
  });

export default memo(TabButton);
