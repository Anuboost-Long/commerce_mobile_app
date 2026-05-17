import AppText from "@/components/common/app-text";
import AnnouncementBanner from "@/components/common/banner/announcemen-banner";
import SizedBox from "@/components/common/sized-box";
import { IconAsset } from "@/assets/icon-asset";
import { Screen } from "@/constants/screens";
import useHeaderCalc from "@/hooks/useHeaderCalc";
import useThemeStyle, { StyleParam } from "@/hooks/useThemeStyle";
import { NavigationHelper } from "@/utils/navigation-helper";
import { metricStyle } from "@/utils/styles";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { ms } from "react-native-size-matters";
import Categories from "./categories";
import PopularItems from "./popular-items";

export default function Header() {
  const { home_header } = useHeaderCalc();
  const { themeStyle } = useThemeStyle(styles);
  return (
    <View>
      <SizedBox height={ms(home_header)} />
      <View style={metricStyle.paddingHorizontal(10)}>
        <AppText font="SemiBold" fontSize="Title" style={themeStyle.title}>
          UE FASHION
        </AppText>
        <AppText font="Normal" fontSize="Text" style={themeStyle.desc}>
          Your one stop shop for your beauty
        </AppText>
      </View>

      <SizedBox height={14} />
      <Pressable
        accessibilityLabel="Search products"
        onPress={() =>
          NavigationHelper.navigate({ pathname: Screen.Product.product_search })
        }
        style={themeStyle.searchButton}
      >
        <IconAsset.Search
          width={ms(20)}
          height={ms(20)}
          fill={themeStyle.searchText.color}
        />
        <AppText font="Medium" fontSize="Text" style={themeStyle.searchText}>
          Search products, brands, and deals
        </AppText>
      </Pressable>

      <SizedBox height={20} />
      <AnnouncementBanner />
      <SizedBox height={20} />
      <Categories />
      <SizedBox height={20} />
      <PopularItems />
      <SizedBox height={20} />
    </View>
  );
}

const styles = ({ colors }: StyleParam) =>
  StyleSheet.create({
    title: {
      color: colors.primary,
    },
    desc: {
      color: colors.textSecondary,
    },
    searchButton: {
      height: ms(46),
      borderRadius: ms(999),
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.surface,
      marginHorizontal: ms(10),
      paddingHorizontal: ms(14),
      flexDirection: "row",
      alignItems: "center",
      gap: ms(10),
    },
    searchText: {
      color: colors.textSecondary,
    },
  });
