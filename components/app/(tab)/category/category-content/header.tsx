import { IconAsset } from "@/assets/icon-asset";
import AppText from "@/components/common/app-text";
import Input from "@/components/common/input/input";
import SizedBox from "@/components/common/sized-box";
import { translation } from "@/constants/translation";
import useHeaderCalc from "@/hooks/useHeaderCalc";
import useThemeStyle, { StyleParam } from "@/hooks/useThemeStyle";
import { metricStyle } from "@/utils/styles";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function Header() {
  const { t, themeStyle } = useThemeStyle(styles);
  const { tab_header } = useHeaderCalc();
  return (
    <View>
      <SizedBox height={tab_header} />
      <SizedBox height={10} />
      <Input
        Icon={IconAsset.Search}
        onChangeText={() => {}}
        placeHolder="Search Category"
      />
      <SizedBox height={20} />
      <View style={metricStyle.paddingHorizontal(10)}>
        <AppText fontSize="SubTitle" font="SemiBold" style={themeStyle.title}>
          {t(translation.SectionHeader.AllCategories)}
        </AppText>
      </View>
      <SizedBox height={20} />
    </View>
  );
}

const styles = ({ colors }: StyleParam) =>
  StyleSheet.create({
    title: {
      color: colors.textSecondary,
    },
  });
