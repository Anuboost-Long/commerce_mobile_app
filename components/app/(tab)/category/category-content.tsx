import SizedBox from "@/components/common/sized-box";
import { CategoryItemSample, CategoryItemType } from "@/mock/category.mock";
import { fastStyle } from "@/utils/styles";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import CategoryItem from "./category-content/category-item";
import Header from "./category-content/header";

export default function CategoryContent() {
  const renderItem = ({ item }: { item: CategoryItemType }) => {
    return <CategoryItem item={item} />;
  };
  return (
    <View style={fastStyle.flex}>
      <FlatList
        showsVerticalScrollIndicator={false}
        numColumns={2}
        ListHeaderComponent={<Header />}
        ListFooterComponent={<SizedBox height={90} />}
        data={CategoryItemSample}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
