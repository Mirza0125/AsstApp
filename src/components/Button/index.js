import React from 'react';
import {Button as NBButton} from 'native-base';
import {Text, ActivityIndicator} from 'react-native';

// styles
import styles from './styles';

const Button = ({
  color,
  text,
  onPress,
  style,
  textStyle,
  icon,
  full,
  rounded,
  block,
  border,
  redBorder,
  bordered,
  disabled,
  loading,
  transparent,
}) => {
  const {buttonText, button, disabledStyle, borderStyle, redBorderStyle} =
    styles;

  return (
    <NBButton
      style={[
        button,
        border && borderStyle,
        redBorder && redBorderStyle,
        styles[`${color}Bg`],
        (loading || disabled) && disabledStyle,
        style,
      ]}
      full={full}
      rounded={rounded}
      block={block}
      bordered={bordered}
      disabled={disabled || loading}
      onPress={onPress}
      icon={icon}
      transparent={transparent}>
      <>
        {loading ? (
          <ActivityIndicator size="small" color="#FFF" />
        ) : (
          <Text style={[buttonText, styles[color], textStyle && textStyle]}>
            {text}
          </Text>
        )}
      </>
    </NBButton>
  );
};

export default Button;
