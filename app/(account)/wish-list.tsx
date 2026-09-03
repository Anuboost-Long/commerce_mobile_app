import AppText from "@/components/common/app-text";
import SizedBox from "@/components/common/sized-box";
import { Dimension } from "@/constants/dimension";
import { Screen } from "@/constants/screens";
import useHeaderCalc from "@/hooks/useHeaderCalc";
import useThemeStyle, { StyleParam } from "@/hooks/useThemeStyle";
import { ProductItemType, ProductSample } from "@/mock/product.mock";
import { handleDiscount, handleFormatCurrency } from "@/utils/currency-helper";
import { NavigationHelper } from "@/utils/navigation-helper";
import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import React from "react";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ms } from "react-native-size-matters";

const CARD_WIDTH = (Dimension.ScreenWidth - ms(20)) / 2;

function WishlistCard({ item, colors }: { item: ProductItemType; colors: any }) {
  const salePrice = handleDiscount({ price: item.price, discount: 15 });
  return (
    <View style={[cardStyles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <Pressable
        onPress={() => NavigationHelper.navigate({ pathname: Screen.Product.product_detail, params: { productId: item.id } })}
      >
        <Image source={{ uri: "https://placehold.co/60x60" }} contentFit="cover" style={cardStyles.image} />
        <View style={[cardStyles.discountBadge, { backgroundColor: colors.primary }]}>
          <AppText font="Bold" fontSize="SubText" style={{ color: colors.white }}>-15%</AppText>
        </View>
        <Pressable style={[cardStyles.removeBtn, { backgroundColor: colors.backDrop }]} accessibilityLabel="Remove">
          <Feather name="x" size={ms(13)} color={colors.white} />
        </Pressable>
      </Pressable>
      <View style={cardStyles.info}>
        <AppText font="Medium" fontSize="SubTitle" numLines={2} style={{ color: colors.textPrimary, lineHeight: ms(18) }}>
          {item.name}
        </AppText>
        <SizedBox height={6} />
        <View style={cardStyles.priceRow}>
          <AppText font="Bold" fontSize="Text" style={{ color: colors.primary }}>
            {handleFormatCurrency(salePrice)}
          </AppText>
          <AppText font="Normal" fontSize="SubText" style={{ color: colors.textSecondary, textDecorationLine: "line-through" }}>
            {handleFormatCurrency(item.price)}
          </AppText>
        </View>
        <SizedBox height={8} />
        <Pressable style={[cardStyles.cartBtn, { backgroundColor: colors.primary }]}>
          <Feather name="shopping-cart" size={ms(13)} color={colors.white} />
          <AppText font="SemiBold" fontSize="SubText" style={{ color: colors.white }}>Add to cart</AppText>
        </Pressable>
        <SizedBox height={10} />
      </View>
    </View>
  );
}

const cardStyles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    marginLeft: ms(10),
    marginBottom: ms(10),
    borderRadius: ms(14),
    borderWidth: 1,
    overflow: "hidden",
  },
  image: { width: "100%", aspectRatio: 1 / 0.9 },
  discountBadge: {
    position: "absolute",
    top: ms(8),
    left: ms(8),
    paddingHorizontal: ms(7),
    paddingVertical: ms(3),
    borderRadius: ms(6),
  },
  removeBtn: {
    position: "absolute",
    top: ms(8),
    right: ms(8),
    width: ms(26),
    height: ms(26),
    borderRadius: ms(999),
    alignItems: "center",
    justifyContent: "center",
  },
  info:     { paddingHorizontal: ms(10), paddingTop: ms(10) },
  priceRow: { flexDirection: "row", alignItems: "center", gap: ms(6) },
  cartBtn: {
    height: ms(34),
    borderRadius: ms(999),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: ms(5),
  },
});

export default function Page() {
  const { themeStyle, theme } = useThemeStyle(styles);
  const { tab_header } = useHeaderCalc();
  const insets = useSafeAreaInsets();

  return (
    <FlatList
      data={ProductSample}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      ListHeaderComponent={
        <View style={{ paddingHorizontal: ms(10), paddingTop: tab_header + ms(12), paddingBottom: ms(6) }}>
          <View style={[themeStyle.summaryCard, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
            {[
              { value: String(ProductSample.length), label: "Saved items" },
              { value: "3",    label: "Price drops" },
              { value: "$204", label: "Est. savings" },
            ].map((s, i, arr) => (
              <React.Fragment key={s.label}>
                {i > 0 && <View style={[themeStyle.summaryDivider, { backgroundColor: theme.colors.border }]} />}
                <View style={themeStyle.summaryItem}>
                  <AppText font="Bold" fontSize="Title" style={{ color: theme.colors.primary }}>{s.value}</AppText>
                  <AppText font="Normal" fontSize="SubText" style={{ color: theme.colors.textSecondary }}>{s.label}</AppText>
                </View>
              </React.Fragment>
            ))}
          </View>
        </View>
      }
      renderItem={({ item }) => <WishlistCard item={item} colors={theme.colors} />}
      ListFooterComponent={<SizedBox height={Math.max(insets.bottom, ms(24))} />}
    />
  );
}

const styles = ({ colors }: StyleParam) =>
  StyleSheet.create({
    summaryCard: {
      borderRadius: ms(16),
      borderWidth: 1,
      flexDirection: "row",
      paddingVertical: ms(14),
    },
    summaryItem:    { flex: 1, alignItems: "center", gap: ms(2) },
    summaryDivider: { width: 1, marginVertical: ms(4) },
  });
