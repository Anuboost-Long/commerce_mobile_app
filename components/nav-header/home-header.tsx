import { IconAsset } from "@/assets/icon-asset";
import useHeaderCalc from "@/hooks/useHeaderCalc";
import useThemeStyle, { StyleParam } from "@/hooks/useThemeStyle";
import { fastStyle } from "@/utils/styles";
import { BlurView } from "expo-blur";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ms } from "react-native-size-matters";
import AppText from "../common/app-text";
import IndicatorIcon from "../common/indicator-icon";
import SizedBox from "../common/sized-box";

export default function HomeHeader() {
  const { home_header, handleSetHeight } = useHeaderCalc();
  const { top } = useSafeAreaInsets();
  const { themeStyle, theme } = useThemeStyle(styles);
  return (
    <BlurView
      intensity={100}
      style={themeStyle.container}
      onLayout={(e) => {
        if (home_header === 0) {
          handleSetHeight({
            key: "home_header",
            value: e.nativeEvent.layout.height,
          });
        }
      }}
    >
      <StatusBar style={"auto"} />
      <View style={[fastStyle.rowView, { paddingTop: top }]}>
        <View style={fastStyle.innerRow}>
          <TouchableOpacity>
            <IconAsset.Bar
              width={ms(22)}
              height={ms(22)}
              fill={theme.colors.primary}
            />
          </TouchableOpacity>
          <SizedBox width={ms(10)} />
          <AppText fontSize="Title">E-COMMERCE APP</AppText>
        </View>

        <View style={fastStyle.innerRow}>
          <TouchableOpacity>
            <IndicatorIcon icon={IconAsset.Cart} number={100} />
          </TouchableOpacity>
          <SizedBox width={ms(10)} />
          <TouchableOpacity>
            <IndicatorIcon icon={IconAsset.Bell} number={10} />
          </TouchableOpacity>
        </View>
      </View>
    </BlurView>
  );
}

const styles = ({ colors }: StyleParam) =>
  StyleSheet.create({
    container: {
      width: "100%",
      backgroundColor: colors.blurBackDrop,
      paddingBottom: ms(10),
      paddingHorizontal: ms(10),
    },
  });
