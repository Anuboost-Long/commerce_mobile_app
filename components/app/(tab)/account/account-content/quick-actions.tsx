import { IconAsset } from "@/assets/icon-asset";
import AppText from "@/components/common/app-text";
import useThemeStyle, { StyleParam } from "@/hooks/useThemeStyle";
import { NavigationHelper } from "@/utils/navigation-helper";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { ms } from "react-native-size-matters";
import { QuickActionItem } from "./data";
import SectionTitle from "./section-title";

interface QuickActionsProps {
  actions: QuickActionItem[];
}

export default function QuickActions({ actions }: QuickActionsProps) {
  const { themeStyle, theme } = useThemeStyle(styles);

  return (
    <View style={themeStyle.container}>
      <SectionTitle
        eyebrow="PROFILE"
        title="Quick access"
        caption="Everything a returning customer needs in one account hub."
      />

      <View style={themeStyle.grid}>
        {actions.map((item) => {
          const Icon = item.icon;

          return (
            <Pressable
              key={item.id}
              style={({ pressed }) => [
                themeStyle.card,
                pressed && themeStyle.pressedCard,
              ]}
              onPress={() => NavigationHelper.navigate({ pathname: item.route })}
            >
              <View style={themeStyle.iconWrap}>
                <Icon width={ms(20)} height={ms(20)} fill={theme.colors.primary} />
              </View>
              <View style={themeStyle.textWrap}>
                <AppText font="SemiBold" fontSize="SubTitle" style={themeStyle.title}>
                  {item.title}
                </AppText>
                <AppText font="Medium" fontSize="Text" style={themeStyle.subtitle}>
                  {item.subtitle}
                </AppText>
              </View>
              <View style={themeStyle.trailingPill}>
                <IconAsset.CaretRight
                  width={ms(14)}
                  height={ms(14)}
                  fill={theme.colors.primary}
                />
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = ({ colors }: StyleParam) =>
  StyleSheet.create({
    container: {
      gap: ms(10),
    },
    grid: {
      gap: ms(10),
    },
    card: {
      borderRadius: ms(22),
      padding: ms(14),
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      flexDirection: "row",
      alignItems: "center",
      gap: ms(12),
    },
    pressedCard: {
      opacity: 0.9,
      transform: [{ scale: 0.985 }],
    },
    iconWrap: {
      width: ms(42),
      height: ms(42),
      borderRadius: ms(16),
      backgroundColor: colors.primaryOpacity,
      alignItems: "center",
      justifyContent: "center",
    },
    textWrap: {
      flex: 1,
      gap: ms(2),
    },
    title: {
      color: colors.textPrimary,
    },
    subtitle: {
      color: colors.textSecondary,
      lineHeight: ms(17),
    },
    trailingPill: {
      width: ms(30),
      height: ms(30),
      borderRadius: ms(999),
      backgroundColor: colors.background,
      alignItems: "center",
      justifyContent: "center",
    },
  });
