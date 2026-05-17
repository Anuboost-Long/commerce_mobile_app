import AppText from "@/components/common/app-text";
import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import React from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { ms } from "react-native-size-matters";
import { handleFormatCurrency } from "@/utils/currency-helper";
import { TogetherItem } from "./data";
import { useCartPalette } from "./palette";

export default function FrequentlyBoughtTogether({
  items,
}: {
  items: TogetherItem[];
}) {
  const palette = useCartPalette();

  return (
    <View style={[styles.container, { backgroundColor: palette.card, borderColor: palette.border }]}>
      <View style={styles.header}>
        <View style={styles.headerCopy}>
          <AppText font="Bold" fontSize="Title" style={{ color: palette.text }}>
            Frequently bought together
          </AppText>
          <AppText font="Medium" fontSize="Text" style={{ color: palette.subtext }}>
            Taobao-style smart bundles with one-tap add all.
          </AppText>
        </View>
        <Pressable style={[styles.addAllButton, { backgroundColor: palette.accentStrong }]}>
          <AppText font="SemiBold" fontSize="SubText" style={{ color: palette.white }}>
            Add all
          </AppText>
        </Pressable>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.carousel}>
        {items.map((item) => (
          <View
            key={item.id}
            style={[styles.card, { backgroundColor: palette.cardStrong, borderColor: palette.border }]}
          >
            <Image source={{ uri: item.image }} contentFit="cover" style={styles.image} />
            <AppText font="SemiBold" fontSize="Text" style={{ color: palette.text }}>
              {item.title}
            </AppText>
            <AppText font="Medium" fontSize="SubText" style={{ color: palette.subtext }}>
              {item.subtitle}
            </AppText>
            <View style={styles.bottomRow}>
              <AppText font="Bold" fontSize="SubTitle" style={{ color: palette.accentStrong }}>
                {handleFormatCurrency(item.price)}
              </AppText>
              <Feather name="plus-circle" size={ms(18)} color={palette.accentStrong} />
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: ms(26),
    borderWidth: 1,
    padding: ms(16),
    gap: ms(12),
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: ms(12),
  },
  headerCopy: {
    flex: 1,
    gap: ms(4),
  },
  addAllButton: {
    alignSelf: "flex-start",
    borderRadius: ms(18),
    paddingHorizontal: ms(12),
    paddingVertical: ms(10),
  },
  carousel: {
    gap: ms(10),
  },
  card: {
    width: ms(160),
    borderRadius: ms(22),
    borderWidth: 1,
    padding: ms(10),
    gap: ms(8),
  },
  image: {
    width: "100%",
    height: ms(124),
    borderRadius: ms(18),
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
