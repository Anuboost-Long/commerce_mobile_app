import AppText from "@/components/common/app-text";
import CategoryItem from "@/components/common/item/category-item";
import SizedBox from "@/components/common/sized-box";
import useThemeStyle, { StyleParam } from "@/hooks/useThemeStyle";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { ms } from "react-native-size-matters";

export default function Categories() {
  const { themeStyle } = useThemeStyle(styles);
  const categories = [
    { id: 1, name: "All" },
    { id: 2, name: "Women" },
    { id: 3, name: "Men" },
    { id: 4, name: "Kids" },
    { id: 5, name: "Accessories" },
    { id: 6, name: "Skin Cares" },
  ];

  const renderItem = ({ item }: { item: (typeof categories)[0] }) => {
    return <CategoryItem item={item} />;
  };

  return (
    <View>
      <AppText font="SemiBold" fontSize="SubTitle" style={themeStyle.title}>
        Our popular categories
      </AppText>
      <SizedBox height={20} />
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={categories}
        renderItem={renderItem}
        contentContainerStyle={{ paddingHorizontal: ms(10) }}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => <SizedBox width={10} />}
      />
    </View>
  );
}

const styles = ({ colors }: StyleParam) =>
  StyleSheet.create({
    title: {
      color: colors.textSecondary,
      paddingHorizontal: ms(10),
    },
  });
