import AppText from "@/components/common/app-text";
import { handleFormatCurrency } from "@/utils/currency-helper";
import { Image } from "expo-image";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { ms } from "react-native-size-matters";
import { useCartPalette } from "../../(tab)/cart/cart-content/palette";
import { ProductDetail } from "./data";

export default function VariantSelector({
  product,
}: {
  product: ProductDetail;
}) {
  const palette = useCartPalette();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {product.variants.map((variant, index) => (
        <View
          key={variant.id}
          style={[
            styles.card,
            {
              backgroundColor: palette.card,
              borderColor: index === 0 ? palette.accentStrong : palette.border,
              opacity: index === 0 ? 1 : 0.55,
            },
          ]}
        >
          <AppText
            font="Medium"
            fontSize="SubText"
            numLines={1}
            style={{ color: palette.text }}
          >
            {variant.label}
          </AppText>
          <View style={styles.variantMeta}>
            <Image
              source={{ uri: product.image }}
              contentFit="cover"
              style={styles.thumb}
            />
            <View>
              <AppText
                font="Bold"
                fontSize="HeroText"
                style={{ color: palette.accentStrong }}
              >
                {handleFormatCurrency(variant.price)}
              </AppText>
              <View
                style={[
                  styles.discountPill,
                  { backgroundColor: palette.accentSoft },
                ]}
              >
                <AppText
                  font="SemiBold"
                  fontSize="SubText"
                  style={{ color: palette.accentStrong }}
                >
                  {variant.discountLabel}
                </AppText>
              </View>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: ms(16),
    paddingVertical: ms(14),
    gap: ms(10),
  },
  card: {
    width: ms(235),
    borderRadius: ms(12),
    borderWidth: 1.5,
    padding: ms(10),
    gap: ms(8),
  },
  variantMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: ms(10),
  },
  thumb: {
    width: ms(64),
    height: ms(54),
    borderRadius: ms(8),
  },
  discountPill: {
    alignSelf: "flex-start",
    borderRadius: ms(4),
    paddingHorizontal: ms(6),
    paddingVertical: ms(2),
  },
});
