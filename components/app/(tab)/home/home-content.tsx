import useThemeStyle, { StyleParam } from "@/hooks/useThemeStyle";
import { fastStyle, metricStyle } from "@/utils/styles";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import Header from "./header";

export default function HomeContent() {
  const { themeStyle } = useThemeStyle(styles);
  return (
    <View style={[metricStyle.paddingHorizontal(10), fastStyle.flex]}>
      <FlatList
        ListHeaderComponent={Header}
        contentContainerStyle={fastStyle.flex}
      />
    </View>
  );
}

const styles = ({ colors }: StyleParam) =>
  StyleSheet.create({
    title: {
      color: colors.primary,
    },
  });
