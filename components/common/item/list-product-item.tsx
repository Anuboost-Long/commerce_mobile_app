import { Dimension } from "@/constants/dimension";
import { Screen } from "@/constants/screens";
import useThemeStyle, { StyleParam } from "@/hooks/useThemeStyle";
import { ProductItemType } from "@/mock/product.mock";
import { handleDiscount, handleFormatCurrency } from "@/utils/currency-helper";
import { NavigationHelper } from "@/utils/navigation-helper";
import { fastStyle, metricStyle } from "@/utils/styles";
import { Image } from "expo-image";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { ms } from "react-native-size-matters";
import AppText from "../app-text";
import SizedBox from "../sized-box";

export default function ListProductItem({
  item,
  isEven,
  isEvenRow,
}: {
  item: ProductItemType;
  isEven: boolean;
  isEvenRow: boolean;
}) {
  const { themeStyle } = useThemeStyle(styles);

  const offset = isEvenRow
    ? isEven
      ? ms(15)
      : ms(25)
    : isEven
    ? ms(25)
    : ms(15);
  return (
    <View
      style={[
        themeStyle.container,
        {
          marginBottom: offset,
        },
      ]}
    >
      <Pressable
        onPress={() =>
          NavigationHelper.navigate({
            pathname: Screen.Product.product_detail,
            params: { productId: item.id },
          })
        }
      >
        <View style={themeStyle.imageHolder}>
          <Image
            source={{ uri: "https://placehold.co/60x60" }}
            style={fastStyle.image}
          />
        </View>
        <SizedBox height={5} />
        <View style={metricStyle.paddingHorizontal(5)}>
          <AppText numLines={2} font="Medium" fontSize="SubTitle">
            {item.name}
          </AppText>
          <SizedBox height={10} />
          <View style={fastStyle.rowView}>
            <View style={[fastStyle.innerRow, { gap: ms(5) }]}>
              <AppText
                font="SemiBold"
                fontSize="Text"
                numLines={1}
                style={[themeStyle.price, themeStyle.discounted]}
              >
                {handleFormatCurrency(item.price)}
              </AppText>
              <AppText
                font="SemiBold"
                fontSize="Text"
                numLines={1}
                style={themeStyle.price}
              >
                {handleFormatCurrency(
                  handleDiscount({ price: item.price, discount: 10 })
                )}
              </AppText>
            </View>
            <AppText
              font="Bold"
              fontSize="SubText"
              numLines={1}
              style={themeStyle.price}
            >
              100 sold
            </AppText>
          </View>
        </View>
      </Pressable>
    </View>
  );
}

const styles = ({ colors }: StyleParam) =>
  StyleSheet.create({
    container: {
      alignSelf: "center",
      marginLeft: ms(10),
    },
    imageHolder: {
      width: (Dimension.ScreenWidth - ms(30)) / 2,
      aspectRatio: 1 / 1,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 8,
      overflow: "hidden",
    },
    price: {
      color: colors.primary,
    },
    discounted: {
      textDecorationLine: "line-through",
      color: colors.textSecondary,
    },
  });
