import { NavigationHelper } from "@/utils/navigation-helper";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ms } from "react-native-size-matters";
import { useCartPalette } from "../../(tab)/cart/cart-content/palette";

export default function SearchHeader({
  query,
  onChangeQuery,
}: {
  query: string;
  onChangeQuery: (value: string) => void;
}) {
  const insets = useSafeAreaInsets();
  const palette = useCartPalette();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: palette.card,
          borderColor: palette.border,
          paddingTop: insets.top + ms(10),
        },
      ]}
    >
      <View style={styles.topRow}>
        <Pressable
          onPress={NavigationHelper.back}
          style={styles.backButton}
          accessibilityLabel="Go back"
        >
          <Feather name="arrow-left" size={ms(28)} color={palette.text} />
        </Pressable>
        <View
          style={[
            styles.searchBox,
            { backgroundColor: palette.card, borderColor: palette.accentStrong },
          ]}
        >
          <TextInput
            autoFocus
            value={query}
            onChangeText={onChangeQuery}
            placeholder="Search products"
            placeholderTextColor={palette.subtext}
            selectionColor={palette.accentStrong}
            cursorColor={palette.accentStrong}
            style={[styles.input, { color: palette.text }]}
          />
          {!!query && (
            <Pressable
              onPress={() => onChangeQuery("")}
              style={[styles.clearButton, { backgroundColor: palette.subtext }]}
              accessibilityLabel="Clear search"
            >
              <Feather name="x" size={ms(13)} color={palette.white} />
            </Pressable>
          )}
          <Pressable
            style={[
              styles.searchButton,
              { backgroundColor: palette.accentStrong },
            ]}
            accessibilityLabel="Search"
          >
            <Feather name="search" size={ms(25)} color={palette.white} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    paddingHorizontal: ms(14),
    paddingBottom: ms(14),
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: ms(10),
  },
  backButton: {
    width: ms(38),
    height: ms(48),
    alignItems: "center",
    justifyContent: "center",
  },
  searchBox: {
    flex: 1,
    height: ms(50),
    borderRadius: ms(999),
    borderWidth: 2,
    paddingLeft: ms(16),
    paddingRight: ms(4),
    flexDirection: "row",
    alignItems: "center",
    gap: ms(8),
  },
  input: {
    flex: 1,
    paddingVertical: 0,
  },
  clearButton: {
    width: ms(22),
    height: ms(22),
    borderRadius: ms(999),
    alignItems: "center",
    justifyContent: "center",
  },
  searchButton: {
    width: ms(64),
    height: ms(42),
    borderRadius: ms(999),
    alignItems: "center",
    justifyContent: "center",
  },
});
