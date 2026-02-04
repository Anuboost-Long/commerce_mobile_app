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

interface TabHeaderProp {
  showCart: boolean;
  label: string;
}

export default function TabHeader({ showCart, label }: TabHeaderProp) {
  const { top } = useSafeAreaInsets();
  const { themeStyle, t } = useThemeStyle(styles);
  const { tab_header, handleSetHeight } = useHeaderCalc();
  return (
    <View
      style={themeStyle.container}
      onLayout={(e) => {
        if (tab_header === 0) {
          handleSetHeight({
            key: "tab_header",
            value: e.nativeEvent.layout.height,
          });
        }
      }}
    >
      <BlurView intensity={10}>
        <StatusBar style={"auto"} />
        <View style={[fastStyle.rowView, { paddingTop: top }]}>
          <View style={fastStyle.innerRow}>
            <AppText fontSize="Title">{t(label)}</AppText>
          </View>

          <View style={fastStyle.innerRow}>
            {showCart && (
              <TouchableOpacity>
                <IndicatorIcon icon={IconAsset.Cart} number={100} />
              </TouchableOpacity>
            )}
            <SizedBox width={ms(10)} />
            <TouchableOpacity>
              <IndicatorIcon icon={IconAsset.Bell} number={10} />
            </TouchableOpacity>
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
      backgroundColor: colors.blurBackDrop,
      paddingBottom: ms(10),
      paddingHorizontal: ms(10),
    },
  });
