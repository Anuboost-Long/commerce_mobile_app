import AppText from "@/components/common/app-text";
import { Screen } from "@/constants/screens";
import { NavigationHelper } from "@/utils/navigation-helper";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { ms } from "react-native-size-matters";
import { useCartPalette } from "../../(tab)/cart/cart-content/palette";

const historyTerms = ["Rock", "Water tank for showering", "Water container", "Water tank"];
const discoveryTerms = [
  "shoes for woman",
  "bags for women",
  "baby happy",
  "lcd hp vivo y12",
  "shades for men",
  "top up dana",
  "birch tree milk",
  "blouses shirts",
  "pants for mens",
];
const recommended = [
  "Smart Tracker",
  "Crossbody Bags",
  "Body Care",
  "Home Organisation",
  "Kid's Traditional Outfits",
  "Doll Houses",
  "Fitness Equipment",
  "Socks & Hosiery",
  "Women's Sandals",
  "Men's Sweat Pants",
  "Women's UV Jackets",
  "Kids' Slippers",
];

export default function SearchEmptyState() {
  const palette = useCartPalette();
  const openProductList = (term: string) => {
    NavigationHelper.navigate({
      pathname: Screen.Product.product_list,
      params: { query: term },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <AppText font="Bold" fontSize="Title" style={{ color: palette.text }}>
          Search history
        </AppText>
        <Feather name="trash-2" size={ms(21)} color={palette.subtext} />
      </View>
      <View style={styles.chipWrap}>
        {historyTerms.map((term) => (
          <SearchChip key={term} label={term} onPress={() => openProductList(term)} />
        ))}
      </View>

      <View style={styles.sectionHeader}>
        <AppText font="Bold" fontSize="Title" style={{ color: palette.text }}>
          Discover more
        </AppText>
        <Feather name="eye" size={ms(20)} color={palette.subtext} />
      </View>
      <View style={styles.chipWrap}>
        {discoveryTerms.map((term) => (
          <SearchChip key={term} label={term} onPress={() => openProductList(term)} />
        ))}
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabRow}
      >
        {["FOR YOU", "Women", "Home", "Men", "Sports"].map((tab, index) => (
          <AppText
            key={tab}
            font={index === 0 ? "Bold" : "Medium"}
            fontSize="Title"
            style={{ color: index === 0 ? palette.text : palette.subtext }}
          >
            {tab}
          </AppText>
        ))}
      </ScrollView>

      <View style={styles.recommendGrid}>
        {recommended.map((label) => (
          <Pressable
            key={label}
            onPress={() => openProductList(label)}
            style={[styles.recommendCard, { backgroundColor: palette.cardSoft }]}
          >
            <View style={[styles.recommendThumb, { backgroundColor: palette.card }]} />
            <AppText
              font="Medium"
              fontSize="Text"
              numLines={2}
              style={{ color: palette.text, flex: 1 }}
            >
              {label}
            </AppText>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

function SearchChip({
  label,
  onPress,
}: {
  label: string;
  onPress: () => void;
}) {
  const palette = useCartPalette();

  return (
    <Pressable
      onPress={onPress}
      style={[styles.chip, { backgroundColor: palette.cardSoft }]}
    >
      <AppText font="Medium" fontSize="Text" style={{ color: palette.subtext }}>
        {label}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: ms(14),
    paddingTop: ms(10),
    gap: ms(18),
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  chipWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: ms(10),
    marginTop: ms(-6),
  },
  chip: {
    borderRadius: ms(999),
    paddingHorizontal: ms(14),
    paddingVertical: ms(10),
  },
  tabRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: ms(16),
  },
  recommendGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: ms(10),
  },
  recommendCard: {
    width: "48.5%",
    borderRadius: ms(8),
    minHeight: ms(58),
    paddingHorizontal: ms(10),
    paddingVertical: ms(10),
    flexDirection: "row",
    alignItems: "center",
    gap: ms(10),
  },
  recommendThumb: {
    width: ms(38),
    height: ms(38),
    borderRadius: ms(6),
  },
});
