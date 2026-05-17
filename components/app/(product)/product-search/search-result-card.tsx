import AppText from "@/components/common/app-text";
import { Dimension } from "@/constants/dimension";
import { Screen } from "@/constants/screens";
import { ProductItemType } from "@/mock/product.mock";
import { handleDiscount, handleFormatCurrency } from "@/utils/currency-helper";
import { NavigationHelper } from "@/utils/navigation-helper";
import { Image } from "expo-image";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { ms } from "react-native-size-matters";
import { useCartPalette } from "../../(tab)/cart/cart-content/palette";

const productImages = [
  "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=800&q=80",
];

export default function SearchResultCard({
  item,
}: {
  item: ProductItemType;
}) {
  const palette = useCartPalette();
  const salePrice = handleDiscount({ price: item.price, discount: 15 });

  return (
    <Pressable
      onPress={() =>
        NavigationHelper.navigate({
          pathname: Screen.Product.product_detail,
          params: { productId: item.id },
        })
      }
      style={[styles.container, { backgroundColor: palette.card }]}
    >
      <Image
        source={{ uri: productImages[(item.id - 1) % productImages.length] }}
        contentFit="cover"
        transition={180}
        style={styles.image}
      />
      <View style={styles.copyWrap}>
        <AppText
          font="SemiBold"
          fontSize="Text"
          numLines={2}
          style={{ color: palette.text }}
        >
          {item.name}
        </AppText>
        <View style={styles.priceRow}>
          <AppText
            font="Bold"
            fontSize="Title"
            style={{ color: palette.accentStrong }}
          >
            {handleFormatCurrency(salePrice)}
          </AppText>
          <AppText
            font="Medium"
            fontSize="SubText"
            style={{
              color: palette.subtext,
              textDecorationLine: "line-through",
            }}
          >
            {handleFormatCurrency(item.price)}
          </AppText>
        </View>
        <AppText font="Medium" fontSize="SubText" style={{ color: palette.subtext }}>
          Free shipping · 100 sold
        </AppText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: (Dimension.ScreenWidth - ms(42)) / 2,
    borderRadius: ms(12),
    overflow: "hidden",
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  copyWrap: {
    padding: ms(10),
    gap: ms(6),
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: ms(5),
  },
});
