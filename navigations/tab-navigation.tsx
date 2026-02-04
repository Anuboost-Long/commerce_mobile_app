import TabBar from "@/components/common/tab/tab-bar";
import HomeHeader from "@/components/nav-header/home-header";
import TabHeader from "@/components/nav-header/tab-header";
import { Screen } from "@/constants/screens";
import { translation } from "@/constants/translation";
import useTheme from "@/core/theme/theme-context";
import {
  BottomTabBarProps,
  BottomTabHeaderProps,
} from "@react-navigation/bottom-tabs";
import { Tabs } from "expo-router";
import React from "react";
import { ScreenName } from "./_route";

export default function TabNavigation() {
  const { colors } = useTheme();
  const RenderHomeHeader = () => {
    return <HomeHeader />;
  };
  const RenderTabHeader = (prop: BottomTabHeaderProps) => {
    const name = prop.options.title ?? "";
    const showCart = prop.route.name !== Screen.Tab.cart;
    return <TabHeader showCart={showCart} label={name} />;
  };

  const RenderTabBar = (props: BottomTabBarProps) => {
    return <TabBar {...props} />;
  };
  return (
    <Tabs
      screenOptions={{
        sceneStyle: {
          backgroundColor: colors.background,
        },
        header: RenderTabHeader,
        headerTransparent: true,
      }}
      tabBar={RenderTabBar}
    >
      <Tabs.Screen
        name={ScreenName.Tab.home}
        options={{ header: RenderHomeHeader }}
      />
      <Tabs.Screen
        name={ScreenName.Tab.categories}
        options={{
          title: translation.Tab.Category,
        }}
      />
      <Tabs.Screen
        name={ScreenName.Tab.cart}
        options={{
          title: translation.Tab.Cart,
        }}
      />
      <Tabs.Screen
        name={ScreenName.Tab.account}
        options={{
          title: translation.Tab.Account,
        }}
      />
    </Tabs>
  );
}
