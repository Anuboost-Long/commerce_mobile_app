import { Dimension } from "@/constants/dimension";
import { EnglishFont, KhmerFont } from "@/constants/fonts";
import { FontSizes } from "@/constants/fontsize";
import { Languages } from "@/constants/languages";
import useThemeStyle, { StyleParam } from "@/hooks/useThemeStyle";
import { fastStyle } from "@/utils/styles";
import React from "react";
import {
  StyleProp,
  StyleSheet,
  TextInput,
  View,
  ViewStyle,
} from "react-native";
import { ms } from "react-native-size-matters";
import SizedBox from "../sized-box";

interface InputProp {
  label?: string;
  onChangeText: (input: string) => void;
  containerStyle?: StyleProp<ViewStyle>;
  Icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  placeHolder?: string;
}

export default function Input({
  label,
  onChangeText,
  containerStyle,
  Icon,
  placeHolder,
}: InputProp) {
  const { themeStyle, theme } = useThemeStyle(styles);

  return (
    <View style={[themeStyle.container, containerStyle]}>
      <View style={themeStyle.wrapper}>
        {Icon && (
          <Icon
            width={ms(25)}
            height={ms(25)}
            fill={theme.colors.textPrimary}
          />
        )}
        <SizedBox width={10} />
        <TextInput
          cursorColor={theme.colors.textPrimary}
          selectionColor={theme.colors.textPrimary}
          style={themeStyle.textField}
          onChangeText={onChangeText}
          placeholderTextColor={theme.colors.textSecondary}
          placeholder={placeHolder}
        />
      </View>
    </View>
  );
}

const styles = ({ colors, language }: StyleParam) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.surface,
      borderColor: colors.border,
      borderWidth: 1,
      borderRadius: ms(50),
      height: ms(55),
      width: Dimension.ScreenWidth - ms(20),
      alignSelf: "center",
      ...fastStyle.shadow,
      shadowColor: colors.backDrop,
    },
    wrapper: {
      borderRadius: ms(50),
      overflow: "hidden",
      height: "100%",
      paddingLeft: ms(10),
      ...fastStyle.innerRow,
    },
    textField: {
      color: colors.textPrimary,
      flex: 1,
      fontFamily:
        language === Languages.kh ? KhmerFont.Medium : EnglishFont.Medium,
      fontSize: FontSizes.Text,
    },
  });
