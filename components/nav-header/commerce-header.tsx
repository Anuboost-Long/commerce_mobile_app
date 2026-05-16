import { IconAsset } from "@/assets/icon-asset";
import useHeaderCalc, { HeaderProp } from "@/hooks/useHeaderCalc";
import useThemeStyle, { StyleParam } from "@/hooks/useThemeStyle";
import { fastStyle } from "@/utils/styles";
import { BlurView } from "expo-blur";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Platform, Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ms } from "react-native-size-matters";
import AppText from "../common/app-text";
import IndicatorIcon from "../common/indicator-icon";

interface CommerceHeaderProps {
  badgeLabel?: string;
  headerKey: keyof HeaderProp;
  leading?: React.ReactNode;
  reserveLeadingSpace?: boolean;
  showCart: boolean;
  subtitle: string;
  title: string;
}

export default function CommerceHeader({
  badgeLabel = "SHOP",
  headerKey,
  leading,
  reserveLeadingSpace = true,
  showCart,
  subtitle,
  title,
}: CommerceHeaderProps) {
  const { top } = useSafeAreaInsets();
  const { themeStyle } = useThemeStyle(styles);
  const { home_header, tab_header, handleSetHeight } = useHeaderCalc();
  const currentHeight = headerKey === "home_header" ? home_header : tab_header;

  return (
    <View
      style={themeStyle.container}
      onLayout={(e) => {
        const nextHeight = e.nativeEvent.layout.height;
        if (currentHeight === 0 || currentHeight !== nextHeight) {
          handleSetHeight({
            key: headerKey,
            value: nextHeight,
          });
        }
      }}
    >
      <BlurView intensity={85} style={themeStyle.blurWrap}>
        <StatusBar style={"auto"} />
        <View style={[themeStyle.innerShell, { paddingTop: top }]}>
          <View style={themeStyle.topRow}>
            {reserveLeadingSpace && (
              <View style={themeStyle.leadingSlot}>
                {leading ?? <View style={themeStyle.leadingPlaceholder} />}
              </View>
            )}

            <View style={themeStyle.centerBlock}>
              <View style={themeStyle.brandBadge}>
                <AppText
                  font="Bold"
                  fontSize="SubText"
                  style={themeStyle.brandBadgeText}
                >
                  {badgeLabel}
                </AppText>
              </View>

              <View style={themeStyle.titleWrap}>
                <AppText font="Bold" fontSize="Title" style={themeStyle.title}>
                  {title}
                </AppText>
                <AppText
                  font="Medium"
                  fontSize="SubText"
                  style={themeStyle.subtitle}
                >
                  {subtitle}
                </AppText>
              </View>
            </View>

            <View style={themeStyle.actionRow}>
              {showCart && (
                <Pressable style={themeStyle.actionButton}>
                  <IndicatorIcon icon={IconAsset.Cart} number={100} />
                </Pressable>
              )}
              <Pressable style={themeStyle.actionButton}>
                <IndicatorIcon icon={IconAsset.Bell} number={10} />
              </Pressable>
            </View>
          </View>
        </View>
      </BlurView>
    </View>
  );
}

const styles = ({ colors }: StyleParam) =>
  StyleSheet.create({
    container: {
      width: "100%",
      backgroundColor: Platform.select({
        ios: colors.blurBackDrop,
        android: colors.surface,
      }),
    },
    blurWrap: {
      paddingHorizontal: ms(12),
      paddingBottom: ms(14),
      backgroundColor: Platform.select({
        ios: colors.blurBackDrop,
        android: colors.surface,
      }),
    },
    innerShell: {
      minHeight: ms(92),
      justifyContent: "center",
    },
    topRow: {
      ...fastStyle.rowView,
      alignItems: "center",
      gap: ms(10),
    },
    leadingSlot: {
      width: ms(40),
      alignItems: "flex-start",
      justifyContent: "center",
    },
    leadingPlaceholder: {
      width: ms(40),
      height: ms(40),
    },
    centerBlock: {
      flex: 1,
      gap: ms(8),
      minHeight: ms(60),
      justifyContent: "center",
    },
    brandBadge: {
      alignSelf: "flex-start",
      paddingHorizontal: ms(10),
      paddingVertical: ms(5),
      borderRadius: ms(999),
      backgroundColor: colors.primaryOpacity,
      borderWidth: 1,
      borderColor: colors.primary,
    },
    brandBadgeText: {
      color: colors.primary,
      letterSpacing: 1,
    },
    titleWrap: {
      gap: ms(3),
    },
    title: {
      color: colors.textPrimary,
    },
    subtitle: {
      color: colors.textSecondary,
      lineHeight: ms(16),
    },
    actionRow: {
      ...fastStyle.innerRow,
      gap: ms(8),
      minWidth: ms(88),
      justifyContent: "flex-end",
    },
    actionButton: {
      width: ms(40),
      height: ms(40),
      borderRadius: ms(16),
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
    },
  });
