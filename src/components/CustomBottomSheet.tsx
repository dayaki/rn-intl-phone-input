import React, { useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Dimensions,
  PanResponder,
} from "react-native";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const BOTTOM_SHEET_HEIGHT = SCREEN_HEIGHT * 0.7;

interface CustomBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const CustomBottomSheet: React.FC<CustomBottomSheetProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  const animatedValue = useRef(new Animated.Value(BOTTOM_SHEET_HEIGHT)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          animatedValue.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > BOTTOM_SHEET_HEIGHT / 3) {
          closeBottomSheet();
        } else {
          openBottomSheet();
        }
      },
    })
  ).current;

  const bottomSheetAnimation = {
    transform: [
      {
        translateY: animatedValue.interpolate({
          inputRange: [0, BOTTOM_SHEET_HEIGHT],
          outputRange: [0, BOTTOM_SHEET_HEIGHT],
          extrapolate: "clamp",
        }),
      },
    ],
  };

  const openBottomSheet = () => {
    Animated.spring(animatedValue, {
      toValue: 0,
      useNativeDriver: true,
      bounciness: 4,
    }).start();
  };

  const closeBottomSheet = () => {
    Animated.spring(animatedValue, {
      toValue: BOTTOM_SHEET_HEIGHT,
      useNativeDriver: true,
      bounciness: 4,
    }).start(onClose);
  };

  useEffect(() => {
    if (isOpen) {
      openBottomSheet();
    } else {
      closeBottomSheet();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <View style={styles.overlay}>
      <TouchableOpacity style={styles.background} onPress={closeBottomSheet} />
      <Animated.View
        style={[styles.bottomSheetContainer, bottomSheetAnimation]}
        {...panResponder.panHandlers}
      >
        <View style={styles.handle} />
        {children}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  background: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  bottomSheetContainer: {
    height: BOTTOM_SHEET_HEIGHT,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  handle: {
    width: 40,
    height: 5,
    backgroundColor: "#ccc",
    borderRadius: 3,
    alignSelf: "center",
    marginTop: 10,
  },
});
