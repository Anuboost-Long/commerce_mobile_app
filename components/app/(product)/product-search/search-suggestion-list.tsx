import AppText from "@/components/common/app-text";
import { Screen } from "@/constants/screens";
import { NavigationHelper } from "@/utils/navigation-helper";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { FlatList, Pressable, StyleSheet } from "react-native";
import { ms } from "react-native-size-matters";
import { useCartPalette } from "../../(tab)/cart/cart-content/palette";

const suffixes = [
  "shox recon",
  "ie",
  "salt original",
  "ing chair plastic",
  " space headphone",
  "ing chair for toddler",
  "et brushless motor",
  "er switch heavy duty",
  "star outfit for men",
  "ing chair for mommy",
  "staroutfitformen",
  " bros cycling sunglasses",
];

export default function SearchSuggestionList({
  query,
}: {
  query: string;
}) {
  const palette = useCartPalette();
  const normalizedQuery = query.trim();
  const suggestions = suffixes.map((suffix) => ({
    id: suffix,
    suggestion: `${normalizedQuery}${suffix}`,
    suffix,
  }));

  return (
    <FlatList
      data={suggestions}
      keyExtractor={(item) => item.id}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
      renderItem={({ item }) => (
        <Pressable
          onPress={() =>
            NavigationHelper.navigate({
              pathname: Screen.Product.product_list,
              params: { query: item.suggestion },
            })
          }
          style={[styles.row, { borderColor: palette.border }]}
        >
          <Feather name="search" size={ms(24)} color={palette.text} />
          <AppText font="Medium" fontSize="Text" style={{ color: palette.subtext }}>
            {normalizedQuery}
            <AppText font="Bold" fontSize="Text" style={{ color: palette.text }}>
              {item.suffix}
            </AppText>
          </AppText>
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: ms(14),
  },
  row: {
    minHeight: ms(58),
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: ms(14),
  },
});
