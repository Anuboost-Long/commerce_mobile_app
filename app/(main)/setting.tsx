import AppText from "@/components/common/app-text";
import SizedBox from "@/components/common/sized-box";
import useTheme from "@/core/theme/theme-context";
import useHeaderCalc from "@/hooks/useHeaderCalc";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ms } from "react-native-size-matters";

type SettingRowProps = {
  icon: React.ComponentProps<typeof Feather>["name"];
  label: string;
  value?: string;
  colors: any;
};

function SettingRow({ icon, label, value, colors }: SettingRowProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.row,
        { borderBottomColor: colors.border, opacity: pressed ? 0.75 : 1 },
      ]}
    >
      <View style={[styles.rowIcon, { backgroundColor: colors.primaryOpacity }]}>
        <Feather name={icon} size={ms(18)} color={colors.primary} />
      </View>
      <AppText font="Medium" fontSize="SubTitle" style={[styles.rowLabel, { color: colors.textPrimary }]}>
        {label}
      </AppText>
      <View style={styles.rowTrailing}>
        {!!value && (
          <AppText font="Normal" fontSize="SubTitle" style={{ color: colors.textSecondary }}>
            {value}
          </AppText>
        )}
        <Feather name="chevron-right" size={ms(18)} color={colors.textSecondary} />
      </View>
    </Pressable>
  );
}

type SettingSectionProps = {
  title: string;
  children: React.ReactNode;
  colors: any;
};

function SettingSection({ title, children, colors }: SettingSectionProps) {
  return (
    <View>
      <AppText font="SemiBold" fontSize="SubText" style={{ color: colors.textSecondary, letterSpacing: 0.8, textTransform: "uppercase" }}>
        {title}
      </AppText>
      <SizedBox height={8} />
      <View style={[styles.sectionCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        {children}
      </View>
    </View>
  );
}

export default function Setting() {
  const { colors } = useTheme();
  const { tab_header } = useHeaderCalc();
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[
        styles.content,
        {
          paddingTop: tab_header + ms(12),
          paddingBottom: Math.max(insets.bottom, ms(24)),
        },
      ]}
    >
      <View style={[styles.profileCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <View style={[styles.avatar, { backgroundColor: colors.primaryOpacity }]}>
          <Feather name="user" size={ms(28)} color={colors.primary} />
        </View>
        <View style={styles.profileInfo}>
          <AppText font="Bold" fontSize="SubTitle" style={{ color: colors.textPrimary }}>
            Guest User
          </AppText>
          <AppText font="Normal" fontSize="SubText" style={{ color: colors.textSecondary }}>
            guest@example.com
          </AppText>
        </View>
        <Pressable style={[styles.editBadge, { backgroundColor: colors.primaryOpacity, borderColor: colors.primary }]}>
          <AppText font="SemiBold" fontSize="SubText" style={{ color: colors.primary }}>
            Edit
          </AppText>
        </Pressable>
      </View>

      <SettingSection title="Account" colors={colors}>
        <SettingRow icon="user" label="Profile information" colors={colors} />
        <SettingRow icon="map-pin" label="Saved addresses" colors={colors} />
        <SettingRow icon="credit-card" label="Payment methods" colors={colors} />
        <SettingRow icon="lock" label="Change password" colors={colors} />
      </SettingSection>

      <SettingSection title="Preferences" colors={colors}>
        <SettingRow icon="bell" label="Notifications" colors={colors} />
        <SettingRow icon="globe" label="Language" value="English" colors={colors} />
        <SettingRow icon="dollar-sign" label="Currency" value="USD" colors={colors} />
        <SettingRow icon="sun" label="Appearance" value="System" colors={colors} />
      </SettingSection>

      <SettingSection title="Support" colors={colors}>
        <SettingRow icon="help-circle" label="Help centre" colors={colors} />
        <SettingRow icon="message-circle" label="Contact support" colors={colors} />
        <SettingRow icon="star" label="Rate the app" colors={colors} />
        <SettingRow icon="flag" label="Report a problem" colors={colors} />
      </SettingSection>

      <SettingSection title="Legal" colors={colors}>
        <SettingRow icon="shield" label="Privacy policy" colors={colors} />
        <SettingRow icon="file-text" label="Terms & conditions" colors={colors} />
      </SettingSection>

      <View style={styles.versionBlock}>
        <AppText font="Normal" fontSize="SubText" style={{ color: colors.textSecondary }}>
          Version 1.0.0 · Build 100
        </AppText>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: ms(16),
    gap: ms(20),
  },
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: ms(14),
    borderRadius: ms(16),
    borderWidth: 1,
    padding: ms(14),
  },
  avatar: {
    width: ms(54),
    height: ms(54),
    borderRadius: ms(27),
    alignItems: "center",
    justifyContent: "center",
  },
  profileInfo: {
    flex: 1,
    gap: ms(3),
  },
  editBadge: {
    paddingHorizontal: ms(14),
    paddingVertical: ms(6),
    borderRadius: ms(999),
    borderWidth: 1,
  },
  sectionCard: {
    borderRadius: ms(14),
    borderWidth: 1,
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: ms(12),
    paddingHorizontal: ms(14),
    paddingVertical: ms(13),
    borderBottomWidth: 1,
  },
  rowIcon: {
    width: ms(36),
    height: ms(36),
    borderRadius: ms(10),
    alignItems: "center",
    justifyContent: "center",
  },
  rowLabel: {
    flex: 1,
  },
  rowTrailing: {
    flexDirection: "row",
    alignItems: "center",
    gap: ms(6),
  },
  versionBlock: {
    alignItems: "center",
    paddingVertical: ms(4),
  },
});
