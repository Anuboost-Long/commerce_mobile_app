import { Dimension } from "@/constants/dimension";
import { DrawerResource, SettingMenu } from "@/constants/drawer-resource";
import useHeaderCalc from "@/hooks/useHeaderCalc";
import useThemeStyle, { StyleParam } from "@/hooks/useThemeStyle";
import { NavigationHelper } from "@/utils/navigation-helper";
import { fastStyle } from "@/utils/styles";
import { BlurView } from "expo-blur";
import React, { useEffect } from "react";
import { Modal, Platform, ScrollView, StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { ms } from "react-native-size-matters";
import { scheduleOnRN } from "react-native-worklets";
import AppText from "../common/app-text";
import BackDrop from "./backdrop";
import DrawerItem from "./drawer-item";

interface DrawerProp {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Drawer({ visible, setVisible }: DrawerProp) {
  const { inset } = useHeaderCalc();
  const { themeStyle, theme } = useThemeStyle(styles);

  const drawerWidth = Math.min(Dimension.ScreenWidth * 0.82, ms(320));
  const translateX = useSharedValue(-drawerWidth);

  useEffect(() => {
    if (visible) {
      translateX.value = withTiming(0, {
        duration: 420,
        easing: Easing.out(Easing.cubic),
      });
    }
  }, [translateX, visible]);

  const close = (path_name: string | null = null) => {
    translateX.value = withTiming(
      -drawerWidth,
      {
        duration: 320,
        easing: Easing.in(Easing.cubic),
      },
      () => {
        scheduleOnRN(closeDrawer, path_name);
      }
    );
  };

  const closeDrawer = (path_name: string | null = null) => {
    setVisible(false);
    if (path_name) {
      NavigationHelper.navigate({ pathname: path_name });
    }
  };

  const animatedStyle = useAnimatedStyle(() => {
    const shadowOpacity = interpolate(translateX.value, [-drawerWidth, 0], [0, 0.22]);

    return {
      transform: [{ translateX: translateX.value }],
      shadowOpacity,
    };
  });

  return (
    <Modal
      visible={visible}
      transparent
      statusBarTranslucent
      animationType="fade"
    >
      <BackDrop onCancelModal={() => close(null)}>
        <Animated.View style={[themeStyle.container, animatedStyle]}>
          <BlurView
            style={[fastStyle.flex, { paddingTop: inset.top }]}
            intensity={theme.isDark ? 70 : 30}
          >
            <View style={themeStyle.innerShell}>
              <View style={themeStyle.headerCard}>
                <View style={themeStyle.brandBadge}>
                  <AppText font="Bold" fontSize="SubText" style={themeStyle.badgeText}>
                    MENU
                  </AppText>
                </View>
                <AppText font="Bold" fontSize="Title" style={themeStyle.headerTitle}>
                  E-COMMERCE APP
                </AppText>
                <AppText font="Medium" fontSize="SubTitle" style={themeStyle.headerSubtitle}>
                  Browse policies, support pages, and store information.
                </AppText>
              </View>

              <View style={themeStyle.sectionHeader}>
                <AppText font="SemiBold" fontSize="SubText" style={themeStyle.sectionLabel}>
                  QUICK LINKS
                </AppText>
              </View>

              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={themeStyle.scrollContent}
              >
                {DrawerResource.map((item) => (
                  <DrawerItem
                    key={item.id}
                    item={item}
                    navigate={() => close(item.navigation)}
                  />
                ))}
              </ScrollView>

              <View style={themeStyle.bottomMenu}>
                <DrawerItem
                  item={SettingMenu}
                  navigate={() => close(SettingMenu.navigation)}
                  variant="footer"
                />
              </View>
            </View>
          </BlurView>
        </Animated.View>
      </BackDrop>
    </Modal>
  );
}

const styles = ({ colors }: StyleParam) =>
  StyleSheet.create({
    container: {
      backgroundColor: Platform.select({
        ios: colors.blurBackDrop,
        android: colors.surface,
      }),
      width: Math.min(Dimension.ScreenWidth * 0.82, ms(320)),
      height: "100%",
      alignSelf: "flex-start",
      borderTopRightRadius: ms(28),
      borderBottomRightRadius: ms(28),
      overflow: "hidden",
      shadowColor: "#000000",
      shadowOffset: {
        width: 8,
        height: 0,
      },
      shadowRadius: 24,
      elevation: 16,
    },
    innerShell: {
      flex: 1,
      paddingHorizontal: ms(14),
      paddingBottom: ms(12),
      gap: ms(12),
    },
    headerCard: {
      marginTop: ms(6),
      borderRadius: ms(24),
      padding: ms(16),
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      gap: ms(8),
    },
    brandBadge: {
      alignSelf: "flex-start",
      paddingHorizontal: ms(10),
      paddingVertical: ms(6),
      borderRadius: ms(999),
      backgroundColor: colors.primaryOpacity,
      borderWidth: 1,
      borderColor: colors.primary,
    },
    badgeText: {
      color: colors.primary,
      letterSpacing: 1,
    },
    headerTitle: {
      color: colors.textPrimary,
    },
    headerSubtitle: {
      color: colors.textSecondary,
      lineHeight: ms(18),
    },
    sectionHeader: {
      paddingHorizontal: ms(4),
      paddingTop: ms(2),
    },
    sectionLabel: {
      color: colors.textSecondary,
      letterSpacing: 1.2,
    },
    scrollContent: {
      gap: ms(10),
      paddingBottom: ms(16),
      flexGrow: 1,
    },
    bottomMenu: {
      paddingTop: ms(2),
    },
  });
