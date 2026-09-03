import { locations } from "@/components/app/(tab)/account/account-content/data";
import AppText from "@/components/common/app-text";
import SizedBox from "@/components/common/sized-box";
import useHeaderCalc from "@/hooks/useHeaderCalc";
import useThemeStyle, { StyleParam } from "@/hooks/useThemeStyle";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ms } from "react-native-size-matters";

const TYPE_ICONS: Record<string, React.ComponentProps<typeof Feather>["name"]> = {
  Home:   "home",
  Office: "briefcase",
};

export default function Page() {
  const { themeStyle, theme } = useThemeStyle(styles);
  const { tab_header } = useHeaderCalc();
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={themeStyle.screen}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[
        themeStyle.content,
        { paddingTop: tab_header + ms(12), paddingBottom: Math.max(insets.bottom, ms(24)) },
      ]}
    >
      {/* Add CTA */}
      <Pressable
        style={({ pressed }) => [themeStyle.addBtn, pressed && themeStyle.pressed]}
        accessibilityLabel="Add new address"
      >
        <Feather name="plus" size={ms(18)} color={theme.colors.primary} />
        <AppText font="SemiBold" fontSize="SubTitle" style={themeStyle.addBtnText}>
          Add new address
        </AppText>
      </Pressable>

      {/* Address cards */}
      {locations.map((loc, index) => (
        <View key={loc.label} style={themeStyle.card}>
          <View style={themeStyle.cardHeader}>
            <View style={themeStyle.typeRow}>
              <View style={themeStyle.typeIcon}>
                <Feather
                  name={TYPE_ICONS[loc.label] ?? "map-pin"}
                  size={ms(16)}
                  color={theme.colors.primary}
                />
              </View>
              <AppText font="Bold" fontSize="SubTitle" style={themeStyle.typeLabel}>
                {loc.label}
              </AppText>
              {index === 0 && (
                <View style={themeStyle.defaultBadge}>
                  <AppText font="SemiBold" fontSize="SubText" style={themeStyle.defaultText}>
                    Default
                  </AppText>
                </View>
              )}
            </View>
            <View style={themeStyle.activeDot} />
          </View>

          <SizedBox height={10} />

          <AppText font="Medium" fontSize="SubTitle" style={themeStyle.line1}>{loc.line1}</AppText>
          <AppText font="Normal" fontSize="SubTitle" style={themeStyle.line2}>{loc.line2}</AppText>

          {!!loc.note && (
            <>
              <SizedBox height={8} />
              <View style={themeStyle.noteRow}>
                <Feather name="info" size={ms(12)} color={theme.colors.textSecondary} />
                <AppText font="Normal" fontSize="SubText" style={themeStyle.noteText}>{loc.note}</AppText>
              </View>
            </>
          )}

          <SizedBox height={14} />

          <View style={[themeStyle.actionRow, { borderTopColor: theme.colors.border }]}>
            {index !== 0 && (
              <Pressable style={themeStyle.actionBtn}>
                <Feather name="check-circle" size={ms(14)} color={theme.colors.textSecondary} />
                <AppText font="Medium" fontSize="SubText" style={themeStyle.actionMuted}>Set default</AppText>
              </Pressable>
            )}
            <Pressable style={themeStyle.actionBtn}>
              <Feather name="edit-2" size={ms(14)} color={theme.colors.primary} />
              <AppText font="Medium" fontSize="SubText" style={themeStyle.actionPrimary}>Edit</AppText>
            </Pressable>
            <Pressable style={themeStyle.actionBtn}>
              <Feather name="trash-2" size={ms(14)} color="#D94A4A" />
              <AppText font="Medium" fontSize="SubText" style={themeStyle.actionDanger}>Delete</AppText>
            </Pressable>
          </View>
        </View>
      ))}

      <View style={themeStyle.hint}>
        <Feather name="map-pin" size={ms(13)} color={theme.colors.textSecondary} />
        <AppText font="Normal" fontSize="SubText" style={themeStyle.hintText}>
          You can save up to 5 delivery addresses.
        </AppText>
      </View>
    </ScrollView>
  );
}

const styles = ({ colors }: StyleParam) =>
  StyleSheet.create({
    screen:  { flex: 1, backgroundColor: colors.background },
    content: { paddingHorizontal: ms(16), gap: ms(12) },
    addBtn: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: ms(8),
      borderRadius: ms(16),
      borderWidth: 1.5,
      borderColor: colors.primary,
      borderStyle: "dashed",
      paddingVertical: ms(14),
      backgroundColor: colors.primaryOpacity,
    },
    pressed:    { opacity: 0.75 },
    addBtnText: { color: colors.primary },
    card: {
      borderRadius: ms(20),
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.surface,
      padding: ms(16),
    },
    cardHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    typeRow:  { flexDirection: "row", alignItems: "center", gap: ms(8) },
    typeIcon: {
      width: ms(32),
      height: ms(32),
      borderRadius: ms(10),
      backgroundColor: colors.primaryOpacity,
      alignItems: "center",
      justifyContent: "center",
    },
    typeLabel: { color: colors.textPrimary },
    defaultBadge: {
      paddingHorizontal: ms(10),
      paddingVertical: ms(3),
      borderRadius: ms(999),
      backgroundColor: colors.primary,
    },
    defaultText: { color: colors.white },
    activeDot: {
      width: ms(8),
      height: ms(8),
      borderRadius: ms(999),
      backgroundColor: colors.primary,
    },
    line1:   { color: colors.textPrimary,   lineHeight: ms(20) },
    line2:   { color: colors.textSecondary, lineHeight: ms(20) },
    noteRow: { flexDirection: "row", alignItems: "flex-start", gap: ms(6) },
    noteText: { flex: 1, color: colors.textSecondary, lineHeight: ms(16) },
    actionRow: {
      flexDirection: "row",
      borderTopWidth: 1,
      paddingTop: ms(12),
      gap: ms(4),
    },
    actionBtn: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: ms(5),
      paddingVertical: ms(6),
    },
    actionMuted:   { color: colors.textSecondary },
    actionPrimary: { color: colors.primary },
    actionDanger:  { color: "#D94A4A" },
    hint: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: ms(6),
      paddingVertical: ms(4),
    },
    hintText: { color: colors.textSecondary },
  });
