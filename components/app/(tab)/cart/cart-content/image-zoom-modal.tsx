import { BlurView } from "expo-blur";
import { Image } from "expo-image";
import React from "react";
import { Modal, Pressable, StyleSheet, View } from "react-native";
import { ms } from "react-native-size-matters";

export default function ImageZoomModal({
  image,
  onClose,
}: {
  image: string | null;
  onClose: () => void;
}) {
  return (
    <Modal visible={!!image} transparent animationType="fade">
      <BlurView intensity={50} style={styles.backdrop}>
        <Pressable style={styles.backdrop} onPress={onClose} />
        <View style={styles.content}>
          {image && (
            <Image source={{ uri: image }} contentFit="contain" style={styles.image} />
          )}
        </View>
      </BlurView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    width: "86%",
    height: "58%",
    borderRadius: ms(28),
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
