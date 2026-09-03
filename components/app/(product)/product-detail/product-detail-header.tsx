import AppText from "@/components/common/app-text";
import { Screen } from "@/constants/screens";
import { NavigationHelper } from "@/utils/navigation-helper";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
} from "react-native-reanimated";
import { ms } from "react-native-size-matters";
import { useCartPalette } from "../../(tab)/cart/cart-content/palette";

const TABS = ["Overview", "Reviews", "Details", "Recommend"];
const TRANSITION = ms(80);

export const DETAIL_HEADER_SOLID_TAB_HEIGHT = ms(44);

export default function ProductDetailHeader({
  scrollY,
  threshold,
}: {
  scrollY: SharedValue<number>;
  threshold: SharedValue<number>;
}) {
  const palette = useCartPalette();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = React.useState(0);

  // 0 = glass/transparent over hero, 1 = solid with search + tabs
  const progress = useDerivedValue(() => {
    const t = threshold.value;
    if (t === 0) return 0;
    return interpolate(scrollY.value, [t - TRANSITION, t], [0, 1], Extrapolation.CLAMP);
  });

  const glassStyle = useAnimatedStyle(() => ({ opacity: 1 - progress.value }));
  const solidStyle = useAnimatedStyle(() => ({ opacity: progress.value }));

  const bgStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    backgroundColor: palette.card,
  }));

  const tabContainerStyle = useAnimatedStyle(() => ({
    height: interpolate(progress.value, [0, 1], [0, DETAIL_HEADER_SOLID_TAB_HEIGHT], Extrapolation.CLAMP),
    opacity: progress.value,
    overflow: "hidden",
  }));

  const borderStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
  }));

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Animated solid background */}
      <Animated.View style={[StyleSheet.absoluteFill, bgStyle]} pointerEvents="none" />

      {/* Nav row — always in-flow, layout constant across both phases */}
      <View style={styles.navRow}>
        {/* Back */}
        <Pressable onPress={NavigationHelper.back} style={styles.iconWrapper} accessibilityLabel="Go back">
          <Animated.View style={[StyleSheet.absoluteFill, styles.glassBtn, { backgroundColor: palette.shadow }, glassStyle]}>
            <Feather name="chevron-left" size={ms(26)} color={palette.white} />
          </Animated.View>
          <Animated.View style={[StyleSheet.absoluteFill, styles.center, solidStyle]}>
            <Feather name="chevron-left" size={ms(26)} color={palette.text} />
          </Animated.View>
        </Pressable>

        {/* Search bar — flex:1 always occupies space, opacity 0→1 */}
        <Animated.View style={[styles.searchBar, { backgroundColor: palette.accentSoft, borderColor: palette.border }, solidStyle]}>
          <Feather name="search" size={ms(16)} color={palette.subtext} />
          <AppText font="Normal" fontSize="Text" style={{ color: palette.subtext }}>
            Search in store
          </AppText>
        </Animated.View>

        {/* Share */}
        <Pressable style={styles.iconWrapper} accessibilityLabel="Share product">
          <Animated.View style={[StyleSheet.absoluteFill, styles.glassBtn, { backgroundColor: palette.shadow }, glassStyle]}>
            <Feather name="share-2" size={ms(22)} color={palette.white} />
          </Animated.View>
          <Animated.View style={[StyleSheet.absoluteFill, styles.center, solidStyle]}>
            <Feather name="share-2" size={ms(22)} color={palette.text} />
          </Animated.View>
        </Pressable>

        {/* Cart */}
        <Pressable
          onPress={() => NavigationHelper.navigate({ pathname: Screen.Tab.cart })}
          style={styles.iconWrapper}
          accessibilityLabel="Open cart"
        >
          <Animated.View style={[StyleSheet.absoluteFill, styles.glassBtn, { backgroundColor: palette.shadow }, glassStyle]}>
            <Feather name="shopping-cart" size={ms(22)} color={palette.white} />
          </Animated.View>
          <Animated.View style={[StyleSheet.absoluteFill, styles.center, solidStyle]}>
            <Feather name="shopping-cart" size={ms(22)} color={palette.text} />
          </Animated.View>
        </Pressable>

        {/* More */}
        <Pressable style={styles.iconWrapper} accessibilityLabel="More options">
          <Animated.View style={[StyleSheet.absoluteFill, styles.glassBtn, { backgroundColor: palette.shadow }, glassStyle]}>
            <Feather name="more-horizontal" size={ms(22)} color={palette.white} />
          </Animated.View>
          <Animated.View style={[StyleSheet.absoluteFill, styles.center, solidStyle]}>
            <Feather name="more-horizontal" size={ms(22)} color={palette.text} />
          </Animated.View>
        </Pressable>
      </View>

      {/* Tab row — slides in by animating height 0 → 44 */}
      <Animated.View style={[styles.tabRow, tabContainerStyle, { borderColor: palette.border }]}>
        {TABS.map((tab, i) => (
          <Pressable
            key={tab}
            onPress={() => setActiveTab(i)}
            style={[
              styles.tab,
              i === activeTab && { borderBottomColor: palette.accentStrong, borderBottomWidth: 2 },
            ]}
          >
            <AppText
              font={i === activeTab ? "SemiBold" : "Medium"}
              fontSize="SubText"
              style={{ color: i === activeTab ? palette.accentStrong : palette.subtext }}
            >
              {tab}
            </AppText>
          </Pressable>
        ))}
      </Animated.View>

      {/* Bottom border appears with solid phase */}
      <Animated.View style={[styles.bottomBorder, borderStyle, { backgroundColor: palette.border }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  navRow: {
    height: ms(50),
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: ms(8),
    gap: ms(4),
  },
  iconWrapper: {
    width: ms(42),
    height: ms(42),
  },
  glassBtn: {
    borderRadius: ms(10),
    alignItems: "center",
    justifyContent: "center",
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
  searchBar: {
    flex: 1,
    height: ms(38),
    borderRadius: ms(999),
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: ms(12),
    gap: ms(8),
  },
  tabRow: {
    flexDirection: "row",
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: DETAIL_HEADER_SOLID_TAB_HEIGHT,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  bottomBorder: {
    height: StyleSheet.hairlineWidth,
  },
});
