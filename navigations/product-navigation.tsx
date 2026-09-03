import ScreenHeader from "@/components/nav-header/screen-header";
import { Screen } from "@/constants/screens";
import useTheme from "@/core/theme/theme-context";
import { Stack } from "expo-router";
import React from "react";

export default function ProductNavigation() {
  const { colors } = useTheme();

  const RenderScreenHeader = (prop: any) => {
    const title = prop.options.title ?? "";

    return (
      <ScreenHeader
        headerKey="tab_header"
        title={title}
      />
    );
  };

  return (
    <Stack
      screenOptions={{
        contentStyle: {
          backgroundColor: colors.background,
        },
        header: RenderScreenHeader,
        headerTransparent: true,
      }}
    >
      <Stack.Screen
        name={Screen.Product.product_detail}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={Screen.Product.product_list}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={Screen.Product.product_search}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={Screen.Product.product_category_list}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={Screen.Product.product_store}
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
