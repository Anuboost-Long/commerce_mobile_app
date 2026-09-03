import AppText from "@/components/common/app-text";
import useTheme from "@/core/theme/theme-context";
import { NavigationHelper } from "@/utils/navigation-helper";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ms } from "react-native-size-matters";

export default function CategoryListHeader({ categoryName }: { categoryName: string }) {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.surface,
          borderBottomColor: colors.border,
          paddingTop: insets.top + ms(10),
        },
      ]}
    >
      <Pressable
        onPress={NavigationHelper.back}
        style={styles.iconButton}
        accessibilityLabel="Go back"
      >
        <Feather name="arrow-left" size={ms(26)} color={colors.textPrimary} />
      </Pressable>
      <AppText
        font="Bold"
        fontSize="SubTitle"
        numLines={1}
        style={{ flex: 1, color: colors.textPrimary }}
      >
        {categoryName}
      </AppText>
      <Pressable style={styles.iconButton} accessibilityLabel="Search">
        <Feather name="search" size={ms(22)} color={colors.textPrimary} />
      </Pressable>
      <Pressable style={styles.iconButton} accessibilityLabel="Filter">
        <Feather name="sliders" size={ms(20)} color={colors.textPrimary} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: ms(10),
    paddingHorizontal: ms(14),
    paddingBottom: ms(12),
    borderBottomWidth: 1,
  },
  iconButton: {
    width: ms(36),
    height: ms(44),
    alignItems: "center",
    justifyContent: "center",
  },
});
