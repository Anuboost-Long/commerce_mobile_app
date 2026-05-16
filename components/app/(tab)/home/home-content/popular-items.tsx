import AppText from "@/components/common/app-text";
import ProductItem from "@/components/common/item/product-item";
import SizedBox from "@/components/common/sized-box";
import useThemeStyle, { StyleParam } from "@/hooks/useThemeStyle";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { ms } from "react-native-size-matters";

export default function PopularItems() {
  const { themeStyle } = useThemeStyle(styles);

  const products = [
    {
      id: 1,
      name: "Product 1",
      price: 100,
    },
    {
      id: 2,
      name: "Product 2",
      price: 200,
    },
    {
      id: 3,
      name: "Product 3",
      price: 300,
    },
  ];

  const renderItem = ({ item }: { item: (typeof products)[0] }) => {
    return <ProductItem item={item} />;
  };
  return (
    <View>
      <AppText font="SemiBold" fontSize="SubTitle" style={themeStyle.title}>
        Popular Products
      </AppText>
      <SizedBox height={20} />
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={products}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingHorizontal: ms(10),
          paddingBottom: ms(10),
        }}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => <SizedBox width={10} />}
      />
      <SizedBox height={20} />
      <AppText font="SemiBold" fontSize="SubTitle" style={themeStyle.title}>
        You may also like
      </AppText>
    </View>
  );
}

const styles = ({ colors }: StyleParam) =>
  StyleSheet.create({
    title: {
      paddingHorizontal: ms(10),
      color: colors.textSecondary,
    },
  });
