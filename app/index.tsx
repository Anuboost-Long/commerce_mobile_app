import AppText from "@/components/common/app-text";
import SizedBox from "@/components/common/sized-box";
import { Dimension } from "@/constants/dimension";
import { Screen } from "@/constants/screens";
import useHeaderCalc from "@/hooks/useHeaderCalc";
import useThemeStyle, { StyleParam } from "@/hooks/useThemeStyle";
import { NavigationHelper } from "@/utils/navigation-helper";
import { Image } from "expo-image";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { ms } from "react-native-size-matters";

export default function Page() {
  const { themeStyle } = useThemeStyle(styles);
  const { handleGetHeight } = useHeaderCalc();

  useEffect(() => {
    handleGetHeight();
    setTimeout(() => {
      NavigationHelper.reset({ pathname: Screen.Tab.home });
    }, 1000);
  });

  return (
    <View style={themeStyle.container}>
      <View style={themeStyle.companyLogo}>
        <Image
          style={themeStyle.image}
          source={{ uri: "https://placehold.co/600x400" }}
        />
      </View>
      <SizedBox height={20} />
      <AppText font="SemiBold" fontSize="Title">
        E - COMMERCE APPLICATION
      </AppText>
      <SizedBox height={5} />
      <AppText font="Medium" fontSize="Text">
        This is the company sample slogan
      </AppText>
    </View>
  );
}

const styles = ({ colors }: StyleParam) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.background,
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },

    companyLogo: {
      width: Dimension.ScreenWidth / 1.5,
      aspectRatio: 1 / 1,
      borderWidth: 1,
      borderColor: colors.primary,
      borderRadius: ms(10),
      borderStyle: "dashed",
    },
    image: {
      height: "100%",
      width: "100%",
    },
  });
