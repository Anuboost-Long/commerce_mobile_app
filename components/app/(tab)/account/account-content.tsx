import useHeaderCalc from "@/hooks/useHeaderCalc";
import useThemeStyle, { StyleParam } from "@/hooks/useThemeStyle";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { ms } from "react-native-size-matters";
import {
  accountProfile,
  accountSections,
  contactDetails,
  locations,
  membership,
  paymentAndPreferences,
  quickActions,
  recentActivity,
  summaryMetrics,
} from "./account-content/data";
import MembershipHighlight from "./account-content/membership-highlight";
import PersonalDetails from "./account-content/personal-details";
import PreferencesPanel from "./account-content/preferences-panel";
import ProfileHero from "./account-content/profile-hero";
import QuickActions from "./account-content/quick-actions";
import RecentActivity from "./account-content/recent-activity";
import SavedLocations from "./account-content/saved-locations";

export default function AccountContent() {
  const { themeStyle } = useThemeStyle(styles);
  const { tab_header } = useHeaderCalc();

  return (
    <ScrollView
      style={themeStyle.screen}
      contentContainerStyle={[
        themeStyle.contentContainer,
        { paddingTop: tab_header },
      ]}
      showsVerticalScrollIndicator={false}
    >
      {accountSections.hero && (
        <ProfileHero profile={accountProfile} metrics={summaryMetrics} />
      )}

      {accountSections.quickActions && <QuickActions actions={quickActions} />}

      <View style={themeStyle.sectionStack}>
        <View style={themeStyle.mainColumn}>
          {accountSections.personalDetails && (
            <PersonalDetails details={contactDetails} />
          )}
          {accountSections.savedLocations && (
            <SavedLocations locations={locations} />
          )}
        </View>

        <View style={themeStyle.sideColumn}>
          {accountSections.membership && (
            <MembershipHighlight membership={membership} />
          )}
          {accountSections.preferences && (
            <PreferencesPanel preferences={paymentAndPreferences} />
          )}
          {accountSections.recentActivity && (
            <RecentActivity activity={recentActivity} />
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = ({ colors }: StyleParam) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: colors.background,
    },
    contentContainer: {
      paddingHorizontal: ms(14),
      paddingBottom: ms(110),
      gap: ms(16),
    },
    sectionStack: {
      gap: ms(12),
    },
    mainColumn: {
      gap: ms(12),
    },
    sideColumn: {
      gap: ms(12),
    },
  });
