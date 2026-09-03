import ListProductItem from "@/components/common/item/list-product-item";
import SizedBox from "@/components/common/sized-box";
import { ProductItemType, ProductSample } from "@/mock/product.mock";
import { fastStyle } from "@/utils/styles";
import React from "react";
import { FlatList, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ms } from "react-native-size-matters";
import Header from "./home-content/header";

export default function HomeContent() {
  const insets = useSafeAreaInsets();
  const renderItem = ({
    item,
    index,
  }: {
    item: ProductItemType;
    index: number;
  }) => {
    const isEven = index % 2 === 0;
    const rowIndex = Math.floor(index / 2);
    const isEvenRow = rowIndex % 2 === 0;

    return (
      <ListProductItem item={item} isEven={isEven} isEvenRow={isEvenRow} />
    );
  };
  return (
    <View style={[fastStyle.flex]}>
      <FlatList
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={Header}
        numColumns={2}
        data={ProductSample}
        keyExtractor={(item) => item.id.toString()}
        ListFooterComponent={<SizedBox height={insets.bottom + ms(80)} />}
        renderItem={renderItem}
      />
    </View>
  );
}
