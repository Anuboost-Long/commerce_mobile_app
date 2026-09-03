import AppText from "@/components/common/app-text";
import SizedBox from "@/components/common/sized-box";
import useHeaderCalc from "@/hooks/useHeaderCalc";
import useThemeStyle, { StyleParam } from "@/hooks/useThemeStyle";
import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ms } from "react-native-size-matters";

type OrderStatus = "Processing" | "Shipped" | "Delivered" | "Cancelled";

type Order = {
  id: string;
  date: string;
  status: OrderStatus;
  itemCount: number;
  total: string;
  preview: string;
};

const ORDERS: Order[] = [
  { id: "EC-2048", date: "May 14, 2026", status: "Shipped",     itemCount: 3, total: "$124.90", preview: "Running Shoes × 1 and 2 more" },
  { id: "EC-2031", date: "May 8, 2026",  status: "Processing",  itemCount: 1, total: "$39.00",  preview: "Moisturiser Standard Set × 1" },
  { id: "EC-2015", date: "Apr 29, 2026", status: "Delivered",   itemCount: 2, total: "$88.50",  preview: "Leather Tote Bag × 1 and 1 more" },
  { id: "EC-1998", date: "Apr 18, 2026", status: "Delivered",   itemCount: 4, total: "$210.00", preview: "Wireless Earbuds × 2 and 2 more" },
  { id: "EC-1980", date: "Apr 5, 2026",  status: "Cancelled",   itemCount: 1, total: "$55.00",  preview: "Graphic Tee × 1" },
];

const TABS = ["All", "Active", "Delivered", "Cancelled"];

const STATUS_CONFIG: Record<OrderStatus, { color: string; icon: React.ComponentProps<typeof Feather>["name"]; action: string }> = {
  Processing: { color: "#2C7DA0", icon: "clock",       action: "View details" },
  Shipped:    { color: "#83b735", icon: "truck",        action: "Track order"  },
  Delivered:  { color: "#83b735", icon: "check-circle", action: "Reorder"      },
  Cancelled:  { color: "#D94A4A", icon: "x-circle",     action: "Get support"  },
};

function OrderCard({ order, colors }: { order: Order; colors: any }) {
  const cfg = STATUS_CONFIG[order.status];
  return (
    <View style={[cardStyles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <View style={cardStyles.header}>
        <View>
          <AppText font="Bold" fontSize="SubTitle" style={{ color: colors.textPrimary }}>#{order.id}</AppText>
          <AppText font="Normal" fontSize="SubText" style={{ color: colors.textSecondary }}>{order.date}</AppText>
        </View>
        <View style={[cardStyles.badge, { backgroundColor: cfg.color + "22", borderColor: cfg.color + "55" }]}>
          <Feather name={cfg.icon} size={ms(12)} color={cfg.color} />
          <AppText font="SemiBold" fontSize="SubText" style={{ color: cfg.color }}>{order.status}</AppText>
        </View>
      </View>

      <View style={[cardStyles.divider, { backgroundColor: colors.border }]} />

      <View style={cardStyles.previewRow}>
        <View style={[cardStyles.thumb, { backgroundColor: colors.primaryOpacity }]} />
        <View style={cardStyles.previewText}>
          <AppText font="Medium" fontSize="SubTitle" numLines={1} style={{ color: colors.textPrimary }}>
            {order.preview}
          </AppText>
          <AppText font="Normal" fontSize="SubText" style={{ color: colors.textSecondary }}>
            {order.itemCount} item{order.itemCount > 1 ? "s" : ""} · Total {order.total}
          </AppText>
        </View>
      </View>

      <Pressable style={[cardStyles.actionBtn, { borderColor: cfg.color, backgroundColor: cfg.color + "15" }]}>
        <AppText font="SemiBold" fontSize="SubTitle" style={{ color: cfg.color }}>{cfg.action}</AppText>
        <Feather name="chevron-right" size={ms(14)} color={cfg.color} />
      </Pressable>
    </View>
  );
}

const cardStyles = StyleSheet.create({
  card: { borderRadius: ms(20), borderWidth: 1, padding: ms(14), gap: ms(12) },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: ms(5),
    paddingHorizontal: ms(10),
    paddingVertical: ms(5),
    borderRadius: ms(999),
    borderWidth: 1,
  },
  divider:     { height: 1 },
  previewRow:  { flexDirection: "row", alignItems: "center", gap: ms(12) },
  thumb:       { width: ms(52), height: ms(52), borderRadius: ms(10) },
  previewText: { flex: 1, gap: ms(3) },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: ms(6),
    height: ms(40),
    borderRadius: ms(999),
    borderWidth: 1,
  },
});

export default function Page() {
  const { themeStyle, theme } = useThemeStyle(styles);
  const { tab_header } = useHeaderCalc();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState(0);

  const filtered = ORDERS.filter((o) => {
    if (activeTab === 0) return true;
    if (activeTab === 1) return o.status === "Processing" || o.status === "Shipped";
    if (activeTab === 2) return o.status === "Delivered";
    return o.status === "Cancelled";
  });

  return (
    <View style={themeStyle.screen}>
      <View style={[themeStyle.tabStrip, { paddingTop: tab_header, borderBottomColor: theme.colors.border }]}>
        {TABS.map((tab, i) => (
          <Pressable
            key={tab}
            onPress={() => setActiveTab(i)}
            style={[themeStyle.tab, activeTab === i && { borderBottomColor: theme.colors.primary, borderBottomWidth: 2 }]}
          >
            <AppText
              font={activeTab === i ? "SemiBold" : "Medium"}
              fontSize="SubTitle"
              style={{ color: activeTab === i ? theme.colors.primary : theme.colors.textSecondary }}
            >
              {tab}
            </AppText>
          </Pressable>
        ))}
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[themeStyle.list, { paddingBottom: Math.max(insets.bottom, ms(24)) }]}
        renderItem={({ item }) => <OrderCard order={item} colors={theme.colors} />}
        ListEmptyComponent={
          <View style={themeStyle.empty}>
            <Feather name="package" size={ms(40)} color={theme.colors.border} />
            <SizedBox height={12} />
            <AppText font="SemiBold" fontSize="SubTitle" style={themeStyle.emptyTitle}>No orders here</AppText>
            <AppText font="Normal" fontSize="SubTitle" style={themeStyle.emptySub}>
              Orders in this category will appear here.
            </AppText>
          </View>
        }
      />
    </View>
  );
}

const styles = ({ colors }: StyleParam) =>
  StyleSheet.create({
    screen: { flex: 1, backgroundColor: colors.background },
    tabStrip: {
      flexDirection: "row",
      backgroundColor: colors.surface,
      borderBottomWidth: 1,
    },
    tab: {
      flex: 1,
      paddingVertical: ms(13),
      alignItems: "center",
      borderBottomWidth: 2,
      borderBottomColor: "transparent",
    },
    list:      { paddingHorizontal: ms(16), paddingTop: ms(14), gap: ms(12) },
    empty:     { paddingTop: ms(60), alignItems: "center", paddingHorizontal: ms(40) },
    emptyTitle: { color: colors.textPrimary },
    emptySub:  { color: colors.textSecondary, textAlign: "center", lineHeight: ms(20), marginTop: ms(6) },
  });
