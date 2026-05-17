import { Dimension } from "@/constants/dimension";
import React, {
  forwardRef,
  ReactElement,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { Modal, StyleSheet } from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { moderateScale } from "react-native-size-matters";
import { scheduleOnRN } from "react-native-worklets";
import BackDrop from "../backdrop";

interface BottomSheet {
  onClose?: () => void;
  onOpen?: () => void;
  children: ReactElement[] | ReactElement;
  duration?: number;
  backgroundDismissable?: boolean;
  dragEnabled?: boolean;
  closeYThreshold?: number;
  closeVelocityThreshold?: number;
}

export type BottomSheetRef = {
  open: () => void;
  close: () => void;
};

const BottomSheet = forwardRef(
  (
    {
      children,
      duration = 600,
      onClose = () => {},
      onOpen = () => {},
      backgroundDismissable = true,
      dragEnabled = true,
      closeYThreshold = moderateScale(120),
      closeVelocityThreshold = 900,
    }: BottomSheet,
    ref
  ) => {
    const [open, setOpen] = useState(false);
    const translateY = useSharedValue(Dimension.ScreenHeight);
    const dragStartY = useSharedValue(0);

    const closeSheetOnUI = () => {
      "worklet";

      translateY.value = withTiming(
        Dimension.ScreenHeight,
        {
          duration: duration,
          easing: Easing.inOut(Easing.ease),
        },
        () => {
          scheduleOnRN(setOpen, false);
          scheduleOnRN(onClose);
        }
      );
    };

    useEffect(() => {
      if (open) {
        setTimeout(() => {
          translateY.value = withTiming(0, {
            duration: duration,
            easing: Easing.inOut(Easing.ease),
          });
        }, 300);
      }
    }, [open, duration, translateY]);

    const animateOpen = () => {
      onOpen();
      setOpen(true);
    };

    const animateClose = () => {
      translateY.value = withTiming(
        Dimension.ScreenHeight,
        {
          duration: duration,
          easing: Easing.inOut(Easing.ease),
        },
        () => {
          scheduleOnRN(setOpen, false);
          scheduleOnRN(onClose);
        }
      );
    };

    useImperativeHandle(ref, () => {
      return { open: animateOpen, close: animateClose };
    });

    const panGesture = Gesture.Pan()
      .enabled(dragEnabled)
      .activeOffsetY(moderateScale(8))
      .onBegin(() => {
        dragStartY.value = translateY.value;
      })
      .onUpdate((event) => {
        translateY.value = Math.max(0, dragStartY.value + event.translationY);
      })
      .onEnd((event) => {
        const shouldClose =
          translateY.value > closeYThreshold ||
          event.velocityY > closeVelocityThreshold;

        if (shouldClose) {
          closeSheetOnUI();
          return;
        }

        translateY.value = withTiming(0, {
          duration: 220,
          easing: Easing.out(Easing.ease),
        });
      });

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ translateY: translateY.value }],
    }));

    return (
      <Modal
        transparent
        statusBarTranslucent
        animationType="fade"
        visible={open}
      >
        <GestureHandlerRootView style={styles.root}>
          <BackDrop
            cancellable={backgroundDismissable}
            onCancelModal={animateClose}
          >
            <GestureDetector gesture={panGesture}>
              <Animated.View style={[styles.container, animatedStyle]}>
                {open && children}
              </Animated.View>
            </GestureDetector>
          </BackDrop>
        </GestureHandlerRootView>
      </Modal>
    );
  }
);

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    alignSelf: "center",
    maxHeight: Dimension.ScreenHeight,
    borderTopLeftRadius: moderateScale(10),
    borderTopRightRadius: moderateScale(10),
    overflow: "hidden",
  },
});

export default BottomSheet;
