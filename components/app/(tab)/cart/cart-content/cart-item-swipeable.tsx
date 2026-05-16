import AppText from "@/components/common/app-text";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet } from "react-native";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import { ms } from "react-native-size-matters";
import { getCartPalette } from "./palette";

interface CartItemSwipeableProps {
  children: React.ReactNode;
  onDelete: () => void;
}

export default function CartItemSwipeable({
  children,
  onDelete,
}: CartItemSwipeableProps) {
  const palette = getCartPalette(false);

  return (
    <ReanimatedSwipeable
      containerStyle={styles.swipeContainer}
      overshootRight={false}
      rightThreshold={ms(30)}
      renderRightActions={() => (
        <Pressable
          onPress={onDelete}
          style={[styles.deleteSwipe, { backgroundColor: palette.danger }]}
        >
          <Feather name="trash-2" size={ms(18)} color={palette.white} />
          <AppText
            font="SemiBold"
            fontSize="SubText"
            style={{ color: palette.white }}
          >
            Delete
          </AppText>
        </Pressable>
      )}
    >
      {children}
    </ReanimatedSwipeable>
  );
}

const styles = StyleSheet.create({
  swipeContainer: {
    marginBottom: ms(10),
  },
  deleteSwipe: {
    width: ms(86),
    borderRadius: ms(24),
    alignItems: "center",
    justifyContent: "center",
    gap: ms(6),
    height: "100%",
  },
});
