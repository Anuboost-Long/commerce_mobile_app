import ListProductItem from "@/components/common/item/list-product-item";
import SizedBox from "@/components/common/sized-box";
import { ProductSample } from "@/mock/product.mock";
import { fastStyle } from "@/utils/styles";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { FlatList, View } from "react-native";
import useTheme from "@/core/theme/theme-context";
import ProductListHeader from "./product-list-header";
import ProductListToolbar from "./product-list-toolbar";

export default function ProductListContent() {
  const params = useLocalSearchParams<{ query?: string }>();
  const { colors } = useTheme();
  const query = params.query ?? "Products";

  return (
    <View style={[fastStyle.flex, { backgroundColor: colors.background }]}>
      <ProductListHeader query={query} />
      <ProductListToolbar />
      <FlatList
        data={ProductSample}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={({ item, index }) => (
          <ListProductItem
            item={item}
            isEven={index % 2 === 0}
            isEvenRow={Math.floor(index / 2) % 2 === 0}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<SizedBox height={24} />}
      />
    </View>
  );
}
