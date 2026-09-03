import ListProductItem from "@/components/common/item/list-product-item";
import SizedBox from "@/components/common/sized-box";
import useTheme from "@/core/theme/theme-context";
import { ProductSample } from "@/mock/product.mock";
import ProductListToolbar from "@/components/app/(product)/product-list/product-list-toolbar";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { FlatList, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ms } from "react-native-size-matters";
import CategoryListHeader from "./category-list-header";

export default function CategoryListContent() {
  const params = useLocalSearchParams<{ categoryName?: string }>();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const categoryName = params.categoryName ?? "Category";

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <CategoryListHeader categoryName={categoryName} />
      <SizedBox height={10} />
      <ProductListToolbar />
      <FlatList
        data={ProductSample}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={({ item }) => <ListProductItem item={item} />}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<SizedBox height={Math.max(insets.bottom, ms(24))} />}
      />
    </View>
  );
}
