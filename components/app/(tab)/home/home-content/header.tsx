import AppText from "@/components/common/app-text";
import AnnouncementBanner from "@/components/common/banner/announcemen-banner";
import SizedBox from "@/components/common/sized-box";
import useHeaderCalc from "@/hooks/useHeaderCalc";
import useThemeStyle, { StyleParam } from "@/hooks/useThemeStyle";
import { metricStyle } from "@/utils/styles";
import React from "react";
import { StyleSheet, View } from "react-native";
import { ms } from "react-native-size-matters";
import Categories from "./categories";
import PopularItems from "./popular-items";

export default function Header() {
  const { home_header } = useHeaderCalc();
  const { themeStyle } = useThemeStyle(styles);
  return (
    <View>
      <SizedBox height={ms(home_header)} />
      <View style={metricStyle.paddingHorizontal(10)}>
        <AppText font="SemiBold" fontSize="Title" style={themeStyle.title}>
          UE FASHION
        </AppText>
        <AppText font="Normal" fontSize="Text" style={themeStyle.desc}>
          Your one stop shop for your beauty
        </AppText>
      </View>

      <SizedBox height={20} />
      <AnnouncementBanner />
      <SizedBox height={20} />
      <Categories />
      <SizedBox height={20} />
      <PopularItems />
      <SizedBox height={20} />
    </View>
  );
}

const styles = ({ colors }: StyleParam) =>
  StyleSheet.create({
    title: {
      color: colors.primary,
    },
    desc: {
      color: colors.textSecondary,
    },
  });
