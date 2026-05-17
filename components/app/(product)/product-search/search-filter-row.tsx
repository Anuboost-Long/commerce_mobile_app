import AppText from "@/components/common/app-text";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { ms } from "react-native-size-matters";
import { useCartPalette } from "../../(tab)/cart/cart-content/palette";

const filters = ["Recommended", "Top sales", "On sale", "Free shipping"];

export default function SearchFilterRow() {
  const palette = useCartPalette();

  return (
    <View style={styles.wrapper}>
      <AppText
        font="SemiBold"
        fontSize="SubTitle"
        style={[styles.label, { color: palette.text }]}
      >
        Filter by
      </AppText>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {filters.map((filter, index) => {
          const isActive = index === 0;

          return (
            <Pressable
              key={filter}
              style={[
                styles.filterPill,
                {
                  backgroundColor: isActive ? palette.accentSoft : palette.card,
                  borderColor: isActive ? palette.accentStrong : palette.border,
                },
              ]}
            >
              {filter === "Recommended" && (
                <Feather
                  name="sliders"
                  size={ms(14)}
                  color={palette.accentStrong}
                />
              )}
              <AppText
                font="SemiBold"
                fontSize="SubText"
                style={{
                  color: isActive ? palette.accentStrong : palette.text,
                }}
              >
                {filter}
              </AppText>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: ms(8),
    paddingTop: ms(12),
  },
  label: {
    paddingHorizontal: ms(14),
  },
  container: {
    paddingHorizontal: ms(14),
    paddingBottom: ms(12),
    gap: ms(8),
  },
  filterPill: {
    borderWidth: 1,
    borderRadius: ms(999),
    paddingHorizontal: ms(12),
    paddingVertical: ms(8),
    flexDirection: "row",
    alignItems: "center",
    gap: ms(6),
  },
});
