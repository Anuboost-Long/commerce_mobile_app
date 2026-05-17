import ScreenHeader from "@/components/nav-header/screen-header";
import { Screen } from "@/constants/screens";
import useTheme from "@/core/theme/theme-context";
import { Stack } from "expo-router";
import React from "react";

export default function PaymentNavigation() {
  const { colors } = useTheme();

  const RenderScreenHeader = (prop: any) => {
    const title = prop.options.title ?? "";

    return (
      <ScreenHeader
        headerKey="tab_header"
        subtitle="Review selected items, shipping, and payment."
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
        name={Screen.Payment.payment_summary}
        options={{
          title: "Confirm order",
        }}
      />
      <Stack.Screen
        name={Screen.Payment.payment_option}
        options={{
          title: "Payment option",
        }}
      />
      <Stack.Screen
        name={Screen.Payment.credit_card_payment}
        options={{
          title: "Credit card",
        }}
      />
      <Stack.Screen
        name={Screen.Payment.payment_success}
        options={{
          title: "Payment success",
        }}
      />
    </Stack>
  );
}
