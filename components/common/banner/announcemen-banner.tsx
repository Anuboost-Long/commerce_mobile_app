import { Dimension } from "@/constants/dimension";
import useThemeStyle, { StyleParam } from "@/hooks/useThemeStyle";
import { PromotionItemtype, PromotionSample } from "@/mock/promotion.mock";
import { fastStyle } from "@/utils/styles";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Carousel from "react-native-reanimated-carousel";
import { ms } from "react-native-size-matters";

export default function AnnouncementBanner() {
  const { themeStyle } = useThemeStyle(styles);

  const renderItem = ({ item }: { item: PromotionItemtype }) => {
    const tap = Gesture.Tap().onStart(() => {
      //   if (item.nav_type === "in-app") {
      //     scheduleOnRN(NavigationHelper.navigate, { pathname: item.navigation });
      //   } else {
      //     scheduleOnRN(Linking.openURL, "https://www.infinity.com.kh");
      //   }
    });
    return (
      <GestureDetector gesture={tap}>
        <Image
          source={{ uri: item.image_url }}
          placeholder="blur"
          contentFit="cover"
          style={themeStyle.image}
        />
      </GestureDetector>
    );
  };
  return (
    <View style={themeStyle.container}>
      <View style={themeStyle.wrapper}>
        <Carousel
          loop={true}
          // autoPlay={true}
          snapEnabled={true}
          pagingEnabled={true}
          autoPlayInterval={4000}
          width={Dimension.ScreenWidth - ms(20)}
          height={(Dimension.ScreenWidth - ms(20)) * 0.5}
          data={PromotionSample}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
}

const styles = ({ colors }: StyleParam) =>
  StyleSheet.create({
    container: {
      width: Dimension.ScreenWidth - ms(20),
      aspectRatio: 1 / 0.5,
      borderRadius: ms(10),
      ...fastStyle.shadow,
      shadowColor: colors.backDrop,
      backgroundColor: colors.surface,
      alignSelf: "center",
      borderWidth: 1,
      borderColor: colors.background,
    },
    image: {
      width: "100%",
      height: "100%",
    },
    wrapper: {
      width: "100%",
      height: "100%",
      borderRadius: ms(10),
      overflow: "hidden",
    },
  });
