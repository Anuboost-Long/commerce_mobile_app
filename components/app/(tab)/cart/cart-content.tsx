import useHeaderCalc from "@/hooks/useHeaderCalc";
import { NavigationHelper } from "@/utils/navigation-helper";
import React, { useEffect, useRef, useState } from "react";
import { RefreshControl, SectionList, StyleSheet, View } from "react-native";
import { ms } from "react-native-size-matters";
import AfterSalesBanner from "./cart-content/after-sales-banner";
import BulkEditToolbar from "./cart-content/bulk-edit-toolbar";
import CartHeaderHero from "./cart-content/cart-header-hero";
import CartItemCard from "./cart-content/cart-item-card";
import CartLoadingSkeleton from "./cart-content/cart-loading-skeleton";
import CartPromoRewardsStrip from "./cart-content/cart-promo-rewards-strip";
import CartToolbar from "./cart-content/cart-toolbar";
import {
  cartScope,
  createInitialSellerGroups,
  frequentlyBoughtTogether,
  getCartSummary,
  getVisibleSections,
  LOYALTY_POINT_RATE,
  type CartCurrencyMode,
  type CartItem,
  type CartSellerGroup,
} from "./cart-content/data";
import FrequentlyBoughtTogether from "./cart-content/frequently-bought-together";
import ImageZoomModal from "./cart-content/image-zoom-modal";
import { getCartPalette } from "./cart-content/palette";
import SellerSectionHeader from "./cart-content/seller-section-header";
import StickySummaryBar from "./cart-content/sticky-summary-bar";
import UndoSnackbar from "./cart-content/undo-snackbar";

export default function CartContent() {
  const { tab_header } = useHeaderCalc();
  const palette = getCartPalette(false);

  const [sellerGroups, setSellerGroups] = useState<CartSellerGroup[]>(() =>
    createInitialSellerGroups()
  );
  const [visibleSellerCount, setVisibleSellerCount] = useState(3);
  const [bulkMode, setBulkMode] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [currencyMode, setCurrencyMode] =
    useState<CartCurrencyMode>("currency");
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const [undoPayload, setUndoPayload] = useState<{
    item: CartItem;
    groupId: string;
  } | null>(null);
  const syncTimeoutsRef = useRef<Record<string, ReturnType<typeof setTimeout>>>(
    {}
  );
  const snackbarTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const visibleSections = getVisibleSections(sellerGroups, visibleSellerCount);
  const summary = getCartSummary(sellerGroups);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 850);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSellerGroups((prev) =>
        prev.map((group, groupIndex) => {
          if (groupIndex > 1) {
            return group;
          }

          return {
            ...group,
            items: group.items.map((item, itemIndex) => {
              if (itemIndex !== groupIndex) {
                return item;
              }

              const nextStockLeft =
                item.stockLeft > 1 ? item.stockLeft - 1 : item.stockLeft;
              const nextPrice =
                item.liveDealMinutesLeft > 0
                  ? Math.max(item.unitPrice - 1, 12)
                  : item.unitPrice;

              return {
                ...item,
                stockLeft: nextStockLeft,
                unitPrice: nextPrice,
                liveDealMinutesLeft: Math.max(item.liveDealMinutesLeft - 1, 0),
                priceChangeLabel:
                  nextPrice < item.unitPrice ? "Price dropped just now" : "",
              };
            }),
          };
        })
      );
    }, 9000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const syncTimeouts = syncTimeoutsRef.current;
    const snackbarTimeout = snackbarTimeoutRef.current;

    return () => {
      Object.values(syncTimeouts).forEach(clearTimeout);
      if (snackbarTimeout) {
        clearTimeout(snackbarTimeout);
      }
    };
  }, []);

  const scheduleUndoDismiss = () => {
    if (snackbarTimeoutRef.current) {
      clearTimeout(snackbarTimeoutRef.current);
    }

    snackbarTimeoutRef.current = setTimeout(() => {
      setUndoPayload(null);
    }, 5000);
  };

  const markSyncComplete = (itemId: string) => {
    syncTimeoutsRef.current[itemId] = setTimeout(() => {
      setSellerGroups((prev) =>
        prev.map((group) => ({
          ...group,
          items: group.items.map((item) =>
            item.id === itemId ? { ...item, syncState: "confirmed" } : item
          ),
        }))
      );

      syncTimeoutsRef.current[itemId] = setTimeout(() => {
        setSellerGroups((prev) =>
          prev.map((group) => ({
            ...group,
            items: group.items.map((item) =>
              item.id === itemId ? { ...item, syncState: "idle" } : item
            ),
          }))
        );
      }, 900);
    }, 700);
  };

  const updateItemQuantity = (itemId: string, quantity: number) => {
    const safeQuantity = Math.max(quantity, 1);

    setSellerGroups((prev) =>
      prev.map((group) => ({
        ...group,
        items: group.items.map((item) =>
          item.id === itemId
            ? { ...item, quantity: safeQuantity, syncState: "pending" }
            : item
        ),
      }))
    );

    if (syncTimeoutsRef.current[itemId]) {
      clearTimeout(syncTimeoutsRef.current[itemId]);
    }

    markSyncComplete(itemId);
  };

  const toggleSaved = (itemId: string) => {
    setSellerGroups((prev) =>
      prev.map((group) => ({
        ...group,
        items: group.items.map((item) =>
          item.id === itemId
            ? { ...item, isSavedForLater: !item.isSavedForLater }
            : item
        ),
      }))
    );
  };

  const deleteItem = (groupId: string, item: CartItem) => {
    setSellerGroups((prev) =>
      prev.map((group) =>
        group.id === groupId
          ? {
              ...group,
              items: group.items.filter(
                (currentItem) => currentItem.id !== item.id
              ),
            }
          : group
      )
    );
    setSelectedItems((prev) => prev.filter((id) => id !== item.id));
    setUndoPayload({ item, groupId });
    scheduleUndoDismiss();
  };

  const undoDelete = () => {
    if (!undoPayload) {
      return;
    }

    setSellerGroups((prev) =>
      prev.map((group) =>
        group.id === undoPayload.groupId
          ? { ...group, items: [undoPayload.item, ...group.items] }
          : group
      )
    );
    setUndoPayload(null);
  };

  const toggleBulkMode = () => {
    setBulkMode((prev) => !prev);
    setSelectedItems([]);
  };

  const toggleItemSelection = (itemId: string) => {
    setSelectedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const toggleGroupCollapse = (groupId: string) => {
    setSellerGroups((prev) =>
      prev.map((group) =>
        group.id === groupId ? { ...group, collapsed: !group.collapsed } : group
      )
    );
  };

  const toggleGroupSelection = (group: CartSellerGroup) => {
    const itemIds = group.items.map((item) => item.id);
    const areAllSelected = itemIds.every((id) => selectedItems.includes(id));

    setSelectedItems((prev) =>
      areAllSelected
        ? prev.filter((id) => !itemIds.includes(id))
        : Array.from(new Set([...prev, ...itemIds]))
    );
  };

  const bulkDelete = () => {
    if (selectedItems.length === 0) {
      return;
    }

    const payloadGroup = sellerGroups.find((group) =>
      group.items.some((item) => item.id === selectedItems[0])
    );
    const payloadItem = payloadGroup?.items.find(
      (item) => item.id === selectedItems[0]
    );

    setSellerGroups((prev) =>
      prev.map((group) => ({
        ...group,
        items: group.items.filter((item) => !selectedItems.includes(item.id)),
      }))
    );

    if (payloadGroup && payloadItem) {
      setUndoPayload({ groupId: payloadGroup.id, item: payloadItem });
      scheduleUndoDismiss();
    }

    setSelectedItems([]);
    setBulkMode(false);
  };

  const bulkMoveToWishlist = () => {
    setSellerGroups((prev) =>
      prev.map((group) => ({
        ...group,
        items: group.items.map((item) =>
          selectedItems.includes(item.id)
            ? { ...item, isSavedForLater: true }
            : item
        ),
      }))
    );
    setSelectedItems([]);
    setBulkMode(false);
  };

  const refreshCart = () => {
    setIsRefreshing(true);

    setTimeout(() => {
      setSellerGroups((prev) =>
        prev.map((group, groupIndex) =>
          groupIndex === 0
            ? {
                ...group,
                couponHint: "New clinic gift set coupon unlocked",
              }
            : group
        )
      );
      setIsRefreshing(false);
    }, 900);
  };

  if (isLoading) {
    return <CartLoadingSkeleton topOffset={tab_header + ms(12)} />;
  }

  return (
    <View style={[styles.container, { backgroundColor: palette.screen }]}>
      <SectionList
        sections={visibleSections}
        keyExtractor={(item) => item.id}
        renderItem={({ item, section }) => (
          <CartItemCard
            bulkMode={bulkMode}
            currencyMode={currencyMode}
            item={item}
            onDelete={() => deleteItem(section.id, item)}
            onOpenImage={() => setZoomedImage(item.image)}
            onQuantityChange={updateItemQuantity}
            onToggleSaved={toggleSaved}
            onToggleSelect={toggleItemSelection}
            selected={selectedItems.includes(item.id)}
          />
        )}
        renderSectionHeader={({ section }) => (
          <SellerSectionHeader
            bulkMode={bulkMode}
            group={section}
            onToggleCollapse={toggleGroupCollapse}
            onToggleSelectAll={toggleGroupSelection}
            selectedCount={
              section.items.filter((item) => selectedItems.includes(item.id))
                .length
            }
          />
        )}
        ListHeaderComponent={
          <View style={styles.headerWrap}>
            {cartScope.hero && <CartHeaderHero itemCount={summary.itemCount} />}
            <CartToolbar
              bulkMode={bulkMode}
              currencyMode={currencyMode}
              loyaltyPoints={Math.round(summary.total * LOYALTY_POINT_RATE)}
              onToggleBulkMode={toggleBulkMode}
              onToggleCurrencyMode={setCurrencyMode}
            />
            <CartPromoRewardsStrip
              currencyMode={currencyMode}
              freeGiftRemaining={Math.max(120 - summary.subtotal, 0)}
              savings={summary.savings}
            />
            {bulkMode && (
              <BulkEditToolbar
                selectedCount={selectedItems.length}
                onDelete={bulkDelete}
                onMoveToWishlist={bulkMoveToWishlist}
              />
            )}
          </View>
        }
        ListFooterComponent={
          <View style={styles.footerWrap}>
            {cartScope.recommendations && (
              <FrequentlyBoughtTogether items={frequentlyBoughtTogether} />
            )}
            <AfterSalesBanner />
            <View style={{ height: ms(130) }} />
          </View>
        }
        contentContainerStyle={[
          styles.contentContainer,
          { paddingTop: tab_header + ms(12) },
        ]}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={refreshCart}
            tintColor={palette.accent}
          />
        }
        initialNumToRender={8}
        maxToRenderPerBatch={10}
        windowSize={9}
        stickySectionHeadersEnabled={false}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.4}
        onEndReached={() => {
          setVisibleSellerCount((prev) =>
            Math.min(prev + 1, sellerGroups.length)
          );
        }}
      />

      {cartScope.summary && (
        <StickySummaryBar
          currencyMode={currencyMode}
          itemCount={summary.itemCount}
          onCheckout={() =>
            NavigationHelper.navigate({ pathname: summary.checkoutRoute })
          }
          savings={summary.savings}
          total={summary.total}
        />
      )}

      <UndoSnackbar
        label={undoPayload ? `${undoPayload.item.sellerName} removed` : ""}
        onUndo={undoDelete}
        visible={!!undoPayload}
      />

      <ImageZoomModal
        image={zoomedImage}
        onClose={() => setZoomedImage(null)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: ms(14),
    paddingBottom: ms(26),
    gap: ms(12),
  },
  headerWrap: {
    gap: ms(12),
    marginBottom: ms(10),
  },
  footerWrap: {
    gap: ms(12),
  },
});
