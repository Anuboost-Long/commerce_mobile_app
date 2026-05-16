import useThemeStyle, { StyleParam } from "@/hooks/useThemeStyle";
import { fastStyle } from "@/utils/styles";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ms } from "react-native-size-matters";
import AppText from "../app-text";

export default function CategoryItem({
  item,
}: {
  item: { id: number; name: string };
}) {
  const { themeStyle } = useThemeStyle(styles);
  return (
    <View style={fastStyle.colCenter}>
      <TouchableOpacity style={themeStyle.container}>
        <Image
          style={themeStyle.image}
          source={{ uri: "https://placehold.co/60x60" }}
        />
      </TouchableOpacity>
      <AppText font="Medium" fontSize="SubText">
        {item.name}
      </AppText>
    </View>
  );
}

const styles = ({ colors }: StyleParam) =>
  StyleSheet.create({
    container: {
      borderWidth: 1,
      width: ms(60),
      height: ms(60),
      borderRadius: ms(30),
      borderColor: colors.primary,
      overflow: "hidden",
    },
    image: {
      width: "100%",
      height: "100%",
    },
  });
