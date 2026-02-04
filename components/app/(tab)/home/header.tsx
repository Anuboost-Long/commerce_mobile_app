import AppText from "@/components/common/app-text";
import AnnouncementBanner from "@/components/common/banner/announcemen-banner";
import SizedBox from "@/components/common/sized-box";
import useHeaderCalc from "@/hooks/useHeaderCalc";
import useThemeStyle, { StyleParam } from "@/hooks/useThemeStyle";
import React from "react";
import { StyleSheet, View } from "react-native";
import { ms } from "react-native-size-matters";

export default function Header() {
  const { home_header } = useHeaderCalc();
  const { themeStyle } = useThemeStyle(styles);
  return (
    <View>
      <SizedBox height={ms(home_header)} />
      <AppText font="SemiBold" fontSize="Title" style={themeStyle.title}>
        UE FASHION
      </AppText>
      <AppText font="Normal" fontSize="Text" style={themeStyle.title}>
        Your one stop shop for your beauty
      </AppText>
      <SizedBox height={10} />
      <AnnouncementBanner />
    </View>
  );
}

const styles = ({ colors }: StyleParam) =>
  StyleSheet.create({
    title: {
      color: colors.primary,
    },
  });
