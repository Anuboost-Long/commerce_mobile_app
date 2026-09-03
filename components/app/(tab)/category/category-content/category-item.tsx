import AppText from "@/components/common/app-text";
import { Dimension } from "@/constants/dimension";
import { Screen } from "@/constants/screens";
import useThemeStyle, { StyleParam } from "@/hooks/useThemeStyle";
import { CategoryItemType } from "@/mock/category.mock";
import { NavigationHelper } from "@/utils/navigation-helper";
import { fastStyle } from "@/utils/styles";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { ms } from "react-native-size-matters";

interface CategoryItemProp {
  item: CategoryItemType;
}
export default function CategoryItem({ item }: CategoryItemProp) {
  const { themeStyle } = useThemeStyle(styles);
  return (
    <Pressable
      style={themeStyle.container}
      onPress={() =>
        NavigationHelper.navigate({
          pathname: Screen.Product.product_category_list,
          params: { categoryId: item.id, categoryName: item.name },
        })
      }
    >
      <View style={themeStyle.wrapper}>
        <Image
          style={fastStyle.image}
          source={{ uri: item.image }}
          contentFit="cover"
        />
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.6)"]}
          locations={[0.4, 1]}
          style={themeStyle.overLay}
        >
          <AppText style={themeStyle.text} font="SemiBold" fontSize="SubTitle">
            {item.name}
          </AppText>
          <AppText style={themeStyle.text} font="Medium" fontSize="SubText">
            Items: {item.item_num}
          </AppText>
        </LinearGradient>
      </View>
    </Pressable>
  );
}

const styles = ({ colors }: StyleParam) =>
  StyleSheet.create({
    container: {
      width: (Dimension.ScreenWidth - ms(30)) / 2,
      aspectRatio: 1 / 1.2,
      borderRadius: ms(8),
      backgroundColor: colors.surface,
      ...fastStyle.shadow,
      shadowColor: colors.backDrop,
      marginLeft: ms(10),
      marginBottom: ms(10),
    },
    wrapper: {
      height: "100%",
      width: "100%",
      borderRadius: ms(8),
      overflow: "hidden",
    },
    overLay: {
      position: "absolute",
      width: "100%",
      height: "100%",
      bottom: 0,
      padding: ms(10),
      justifyContent: "flex-end",
    },
    text: {
      color: colors.white,
    },
  });
