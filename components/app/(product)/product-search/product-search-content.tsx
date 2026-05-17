import SizedBox from "@/components/common/sized-box";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useCartPalette } from "../../(tab)/cart/cart-content/palette";
import SearchEmptyState from "./search-empty-state";
import SearchHeader from "./search-header";
import SearchSuggestionList from "./search-suggestion-list";

export default function ProductSearchContent() {
  const palette = useCartPalette();
  const [query, setQuery] = useState("");
  const hasQuery = query.trim().length > 0;

  return (
    <View style={[styles.container, { backgroundColor: palette.screen }]}>
      <SearchHeader query={query} onChangeQuery={setQuery} />
      {hasQuery ? (
        <SearchSuggestionList query={query} />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <SearchEmptyState />
          <SizedBox height={24} />
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
