import AppText from "@/components/common/app-text";
import { useLocalSearchParams } from "expo-router";
import React, { useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { ms } from "react-native-size-matters";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { useCartPalette } from "../../(tab)/cart/cart-content/palette";
import { getProductDetail } from "./data";
import HeroMedia from "./hero-media";
import ProductDetailHeader from "./product-detail-header";
import ProductInfoPanel from "./product-info-panel";
import PurchaseOptionsSheet from "./purchase-options-sheet";
import SaleBanner from "./sale-banner";
import StickyActionBar, {
  ProductActionMode,
  PRODUCT_ACTION_BAR_HEIGHT,
} from "./sticky-action-bar";
import StoreSummaryCard from "./store-summary-card";
import VariantSelector from "./variant-selector";

export default function ProductDetailContent() {
  const params = useLocalSearchParams<{ productId?: string }>();
  const palette = useCartPalette();
  const [purchaseMode, setPurchaseMode] = useState<ProductActionMode | null>(null);
  const product = useMemo(() => getProductDetail(params.productId), [params.productId]);

  const scrollY = useSharedValue(0);
  const threshold = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  return (
    <View style={[styles.container, { backgroundColor: palette.screen }]}>
      {/* Fixed animated header — glass over hero, solid after variant selector */}
      <ProductDetailHeader scrollY={scrollY} threshold={threshold} />

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingBottom: PRODUCT_ACTION_BAR_HEIGHT + ms(24) }}
      >
        <HeroMedia product={product} />
        <SaleBanner />
        <View style={[styles.section, { backgroundColor: palette.card }]}>
          <VariantSelector product={product} />
        </View>

        {/* Zero-height marker: its layout.y = scroll offset when it hits the top of screen */}
        <View
          onLayout={(e) => {
            if (threshold.value === 0) {
              threshold.value = e.nativeEvent.layout.y;
            }
          }}
        />

        <ProductInfoPanel product={product} />
        <View style={[styles.divider, { backgroundColor: palette.border }]} />
        <StoreSummaryCard product={product} />
        <View style={[styles.detailsCard, { backgroundColor: palette.card }]}>
          <AppText font="Bold" fontSize="Title" style={{ color: palette.text }}>
            Product details
          </AppText>
          <AppText
            font="Medium"
            fontSize="Text"
            style={[styles.detailsCopy, { color: palette.subtext }]}
          >
            Compact design, reliable build, and sale pricing are ready for
            checkout. Select a variation above, then add the item to cart or buy
            now.
          </AppText>
        </View>
      </Animated.ScrollView>

      <StickyActionBar onActionPress={setPurchaseMode} />
      <PurchaseOptionsSheet
        mode={purchaseMode}
        onClose={() => setPurchaseMode(null)}
        product={product}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    borderBottomWidth: 0,
  },
  divider: {
    height: ms(8),
  },
  detailsCard: {
    paddingHorizontal: ms(18),
    paddingVertical: ms(16),
    gap: ms(8),
  },
  detailsCopy: {
    lineHeight: ms(21),
  },
});
