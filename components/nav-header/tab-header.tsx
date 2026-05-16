import React from "react";
import useThemeStyle from "@/hooks/useThemeStyle";
import CommerceHeader from "./commerce-header";

interface TabHeaderProp {
  showCart: boolean;
  label: string;
}

export default function TabHeader({ showCart, label }: TabHeaderProp) {
  const { t } = useThemeStyle(() => ({}));
  const title = t(label);
  return (
    <CommerceHeader
      badgeLabel="SHOP"
      headerKey="tab_header"
      reserveLeadingSpace={false}
      showCart={showCart}
      subtitle="Curated picks, fast delivery, and easy checkout."
      title={title}
    />
  );
}
