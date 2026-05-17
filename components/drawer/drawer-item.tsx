import { IconAsset } from "@/assets/icon-asset";
import { DrawerItemType } from "@/constants/drawer-resource";
import useThemeStyle, { StyleParam } from "@/hooks/useThemeStyle";
import { fastStyle } from "@/utils/styles";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { ms } from "react-native-size-matters";
import AppText from "../common/app-text";

interface DrawerItemProp {
  item: DrawerItemType;
  navigate: () => void;
  variant?: "default" | "footer";
}

export default function DrawerItem({
  item,
  navigate,
  variant = "default",
}: DrawerItemProp) {
  const { themeStyle, t, theme } = useThemeStyle(styles);
  const isFooter = variant === "footer";

  return (
    <Pressable
      style={({ pressed }) => [
        themeStyle.container,
        isFooter && themeStyle.footerContainer,
        pressed && themeStyle.containerPressed,
      ]}
      onPress={navigate}
    >
      <View style={[fastStyle.innerRow, themeStyle.content]}>
        <View style={[themeStyle.iconHolder, isFooter && themeStyle.footerIcon]}>
          <item.icon width={22} height={22} fill={theme.colors.primary} />
        </View>
        <View style={themeStyle.labelWrap}>
          <AppText font="SemiBold" fontSize="SubTitle" style={themeStyle.label}>
            {t(item.label)}
          </AppText>
          <View style={themeStyle.metaRow}>
            <View style={themeStyle.metaDot} />
            <AppText font="Medium" fontSize="SubText" style={themeStyle.metaText}>
              {item.isEnabled ? "Available" : "Coming soon"}
            </AppText>
          </View>
        </View>
      </View>
      <View style={[themeStyle.trailingIcon, isFooter && themeStyle.trailingIconActive]}>
        <IconAsset.CaretRight width={18} height={18} fill={isFooter ? theme.colors.white : theme.colors.textSecondary} />
      </View>
    </Pressable>
  );
}

const styles = ({ colors }: StyleParam) =>
  StyleSheet.create({
    container: {
      ...fastStyle.rowView,
      backgroundColor: colors.lightBlurBackDrop,
      borderRadius: ms(18),
      borderWidth: 1,
      borderColor: colors.border,
      paddingHorizontal: ms(12),
      paddingVertical: ms(12),
    },
    footerContainer: {
      backgroundColor: colors.primaryOpacity,
      borderColor: colors.primary,
    },
    containerPressed: {
      opacity: 0.88,
      transform: [{ scale: 0.985 }],
    },
    content: {
      flex: 1,
      gap: ms(10),
    },
    iconHolder: {
      borderRadius: ms(16),
      padding: ms(10),
      borderColor: colors.primaryOpacity,
      borderWidth: 1,
      backgroundColor: colors.background,
      alignItems: "center",
      justifyContent: "center",
    },
    footerIcon: {
      backgroundColor: colors.surface,
    },
    labelWrap: {
      flex: 1,
      gap: ms(2),
    },
    label: {
      color: colors.textPrimary,
    },
    metaRow: {
      ...fastStyle.innerRow,
      gap: ms(5),
    },
    metaDot: {
      width: ms(5),
      height: ms(5),
      borderRadius: ms(20),
      backgroundColor: colors.primary,
    },
    metaText: {
      color: colors.textSecondary,
    },
    trailingIcon: {
      width: ms(30),
      height: ms(30),
      borderRadius: ms(30),
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.border,
    },
    trailingIconActive: {
      backgroundColor: colors.primary,
    },
  });
