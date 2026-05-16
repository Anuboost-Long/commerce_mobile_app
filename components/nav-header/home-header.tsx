import { IconAsset } from "@/assets/icon-asset";
import useTheme from "@/core/theme/theme-context";
import React, { useState } from "react";
import { Pressable } from "react-native";
import { ms } from "react-native-size-matters";
import CommerceHeader from "./commerce-header";
import Drawer from "../drawer/drawer";

export default function HomeHeader() {
  const { colors } = useTheme();
  const [visible, setVisible] = useState(false);

  const openDrawer = () => {
    setVisible(true);
  };
  return (
    <>
      <Drawer visible={visible} setVisible={setVisible} />
      <CommerceHeader
        badgeLabel="SHOP"
        headerKey="home_header"
        leading={
          <Pressable onPress={openDrawer}>
            <IconAsset.Bar
              width={ms(22)}
              height={ms(22)}
              fill={colors.primary}
            />
          </Pressable>
        }
        showCart
        subtitle="Curated picks, fast delivery, and easy checkout."
        title="E-COMMERCE APP"
      />
    </>
  );
}
