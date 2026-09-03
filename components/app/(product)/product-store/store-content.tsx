import AppText from "@/components/common/app-text";
import ListProductItem from "@/components/common/item/list-product-item";
import SizedBox from "@/components/common/sized-box";
import useTheme from "@/core/theme/theme-context";
import { ProductSample } from "@/mock/product.mock";
import { NavigationHelper } from "@/utils/navigation-helper";
import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { ms } from "react-native-size-matters";
import StoreHeroHeader from "../product-list/store-hero-header";

const STORE_TABS = ["All Products", "Top Sales", "New Arrivals"];
const EXPANDED_INFO_HEIGHT = ms(74);
const NAV_ROW_HEIGHT = ms(50);

export default function StoreContent() {
  const params = useLocalSearchParams<{ storeName?: string }>();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const storeName = params.storeName ?? "You Si Dun Shu Ma Flagship Store";
  const [activeTab, setActiveTab] = React.useState(0);

  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  // Expanded info collapses to 0 height
  const expandedInfoStyle = useAnimatedStyle(() => ({
    height: interpolate(
      scrollY.value,
      [0, EXPANDED_INFO_HEIGHT],
      [EXPANDED_INFO_HEIGHT, 0],
      Extrapolation.CLAMP
    ),
    opacity: interpolate(
      scrollY.value,
      [0, EXPANDED_INFO_HEIGHT * 0.5],
      [1, 0],
      Extrapolation.CLAMP
    ),
    overflow: "hidden",
  }));

  // Compact nav title fades in as info fades out
  const compactTitleStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      scrollY.value,
      [EXPANDED_INFO_HEIGHT * 0.4, EXPANDED_INFO_HEIGHT],
      [0, 1],
      Extrapolation.CLAMP
    ),
  }));

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Screen header — in-flow, not absolute */}
      <View style={[styles.header, { backgroundColor: colors.surface, paddingTop: insets.top }]}>
        {/* Compact nav row: always visible */}
        <View style={styles.navRow}>
          <Pressable
            onPress={NavigationHelper.back}
            style={styles.navBtn}
            accessibilityLabel="Go back"
          >
            <Feather name="arrow-left" size={ms(22)} color={colors.textPrimary} />
          </Pressable>

          <Animated.View style={[styles.navTitle, compactTitleStyle]}>
            <AppText font="SemiBold" fontSize="SubTitle" style={{ color: colors.textPrimary }} numLines={1}>
              {storeName}
            </AppText>
          </Animated.View>

          <Pressable
            style={styles.navBtn}
            accessibilityLabel="Share store"
          >
            <Feather name="share-2" size={ms(20)} color={colors.textPrimary} />
          </Pressable>
        </View>

        {/* Expandable store info — collapses on scroll */}
        <Animated.View style={expandedInfoStyle}>
          <StoreHeroHeader />
        </Animated.View>
      </View>

      {/* Sticky tab strip */}
      <View
        style={[
          styles.tabStrip,
          { backgroundColor: colors.surface, borderColor: colors.border },
        ]}
      >
        {STORE_TABS.map((tab, index) => (
          <Pressable
            key={tab}
            onPress={() => setActiveTab(index)}
            style={[
              styles.tab,
              activeTab === index && {
                borderBottomColor: colors.primary,
                borderBottomWidth: 2,
              },
            ]}
          >
            <AppText
              font={activeTab === index ? "SemiBold" : "Medium"}
              fontSize="SubTitle"
              style={{
                color: activeTab === index ? colors.primary : colors.textSecondary,
              }}
            >
              {tab}
            </AppText>
          </Pressable>
        ))}
      </View>

      {/* Product grid */}
      <Animated.FlatList
        data={ProductSample}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={({ item }) => <ListProductItem item={item} />}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        ListHeaderComponent={<SizedBox height={ms(8)} />}
        ListFooterComponent={<SizedBox height={insets.bottom + ms(80)} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  navRow: {
    height: NAV_ROW_HEIGHT,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: ms(8),
  },
  navBtn: {
    width: ms(40),
    height: ms(40),
    alignItems: "center",
    justifyContent: "center",
  },
  navTitle: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: ms(4),
  },
  tabStrip: {
    flexDirection: "row",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  tab: {
    flex: 1,
    paddingVertical: ms(12),
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
});
