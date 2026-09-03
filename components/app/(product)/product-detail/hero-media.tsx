import useTheme from "@/core/theme/theme-context";
import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, View } from "react-native";
import { ms } from "react-native-size-matters";
import { ProductDetail } from "./data";

export default function HeroMedia({ product }: { product: ProductDetail }) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: product.image }}
        contentFit="cover"
        transition={220}
        style={styles.image}
      />
      <View style={[styles.mediaTabs, { backgroundColor: colors.backDrop }]}>
        <Feather name="volume-x" size={ms(17)} color={colors.white} />
        <View style={styles.tabPill}>
          <Feather name="play" size={ms(13)} color={colors.white} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: ms(430),
  },
  image: {
    width: "100%",
    height: "100%",
  },
  mediaTabs: {
    position: "absolute",
    right: ms(16),
    bottom: ms(12),
    borderRadius: ms(12),
    paddingHorizontal: ms(10),
    paddingVertical: ms(8),
    flexDirection: "row",
    alignItems: "center",
    gap: ms(10),
  },
  tabPill: {
    width: ms(26),
    height: ms(20),
    alignItems: "center",
    justifyContent: "center",
  },
});
