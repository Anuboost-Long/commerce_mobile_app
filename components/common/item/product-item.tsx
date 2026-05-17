import { Dimension } from "@/constants/dimension";
import { Screen } from "@/constants/screens";
import useThemeStyle, { StyleParam } from "@/hooks/useThemeStyle";
import { handleDiscount, handleFormatCurrency } from "@/utils/currency-helper";
import { NavigationHelper } from "@/utils/navigation-helper";
import { fastStyle, metricStyle } from "@/utils/styles";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ms } from "react-native-size-matters";
import AppText from "../app-text";
import SizedBox from "../sized-box";

interface ProductItemProps {
  item: {
    id: number;
    name: string;
    price: number;
  };
}

export default function ProductItem({ item }: ProductItemProps) {
  const { themeStyle } = useThemeStyle(styles);
  return (
    <View style={themeStyle.container}>
      <TouchableOpacity
        onPress={() =>
          NavigationHelper.navigate({
            pathname: Screen.Product.product_detail,
            params: { productId: item.id },
          })
        }
        style={themeStyle.pressable}
      >
        <Image
          style={themeStyle.image}
          contentFit="cover"
          source={{ uri: "https://placehold.co/60x60" }}
        />
        <SizedBox height={5} />
        <View style={metricStyle.paddingLeft(5)}>
          <AppText
            font="Medium"
            fontSize="Text"
            numLines={1}
            style={themeStyle.name}
          >
            {item.name}
          </AppText>
          <View style={[fastStyle.innerRow, { gap: ms(5) }]}>
            <AppText
              font="SemiBold"
              fontSize="SubText"
              numLines={1}
              style={[themeStyle.price, themeStyle.discounted]}
            >
              {handleFormatCurrency(item.price)}
            </AppText>
            <AppText
              font="SemiBold"
              fontSize="SubText"
              numLines={1}
              style={themeStyle.price}
            >
              {handleFormatCurrency(
                handleDiscount({ price: item.price, discount: 10 })
              )}
            </AppText>
          </View>
          <SizedBox height={5} />
          <AppText
            font="Bold"
            fontSize="SubText"
            numLines={1}
            style={themeStyle.price}
          >
            100 sold
          </AppText>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = ({ colors }: StyleParam) =>
  StyleSheet.create({
    container: {
      width: (Dimension.ScreenWidth - ms(20)) / 3,
      aspectRatio: 1 / 1.2,
      borderRadius: ms(8),
      backgroundColor: colors.surface,
      ...fastStyle.shadow,
      shadowColor: colors.backDrop,
    },
    image: {
      width: "100%",
      aspectRatio: 1 / 0.7,
    },
    pressable: {
      borderRadius: ms(8),
      overflow: "hidden",
      height: "100%",
    },
    name: {
      color: colors.textPrimary,
    },
    price: {
      color: colors.primary,
    },
    discounted: {
      textDecorationLine: "line-through",
      color: colors.textSecondary,
    },
  });
