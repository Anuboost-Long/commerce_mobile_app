import useCartSelection from "@/hooks/useCartSelection";
import useHeaderCalc from "@/hooks/useHeaderCalc";
import React, { useMemo } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { ms } from "react-native-size-matters";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useCartPalette } from "../../(tab)/cart/cart-content/palette";
import DeliveryAddressCard from "./delivery-address-card";
import {
  getPaymentSellerGroups,
  getPaymentTotals,
} from "./data";
import OrderAssuranceStrip from "./order-assurance-strip";
import PaymentBreakdown from "./payment-breakdown";
import PaymentMethodCard from "./payment-method-card";
import PaymentStickyBar, {
  PAYMENT_STICKY_BAR_HEIGHT,
} from "./payment-sticky-bar";
import SecureCertificationCard from "./secure-certification-card";
import SelectedItemsSummary from "./selected-items-summary";
import ShippingMethodCard from "./shipping-method-card";

export default function PaymentSummaryContent() {
  const insets = useSafeAreaInsets();
  const palette = useCartPalette();
  const { tab_header } = useHeaderCalc();
  const { selectedItems, summary } = useCartSelection();
  const sellerGroups = useMemo(
    () => getPaymentSellerGroups(selectedItems),
    [selectedItems]
  );
  const totals = useMemo(() => getPaymentTotals(summary), [summary]);

  return (
    <View style={[styles.container, { backgroundColor: palette.screen }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.content,
          {
            paddingTop: tab_header + ms(12),
            paddingBottom:
              PAYMENT_STICKY_BAR_HEIGHT + Math.max(insets.bottom, ms(10)),
          },
        ]}
      >
        <OrderAssuranceStrip />
        <DeliveryAddressCard />
        <View style={[styles.divider, { backgroundColor: palette.border }]} />
        <ShippingMethodCard totals={totals} />
        <View style={[styles.divider, { backgroundColor: palette.border }]} />
        <SelectedItemsSummary groups={sellerGroups} />
        <PaymentBreakdown totals={totals} />
        <PaymentMethodCard />
        <SecureCertificationCard />
      </ScrollView>

      <PaymentStickyBar itemCount={summary.itemCount} total={totals.payableTotal} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    gap: ms(10),
  },
  divider: {
    height: ms(8),
  },
});
