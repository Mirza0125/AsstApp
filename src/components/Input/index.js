import React from 'react';

// components
import {Input as UIKInput} from 'native-base';
import {View, TouchableOpacity} from 'react-native';
import Error from 'src/components/ErrorBox';
import {Icon} from 'native-base';

// styles
import {Layout, Gutters, Colors, Global} from 'src/theme';
import styles from './styles';
import Text from '../Text';

const Input = ({
  value,
  onChangeText,
  placeholder,
  placeholderTextColor,
  password,
  error,
  keyboardType = 'default',
  onSubmitEditing,
  customStyle,
  returnKeyType,
  maxLength,
  style,
  transparent,
  autoFocus,
  multiline,
  onPress,
  icon,
  type = 'FontAwesome5',
  color = 'primary',
  iconColor = 'primary',
  iconStyle,
  bordered,
  sun,
  showHint = false,
}) => {
  const {
    wrapper,
    input,
    text,
    height,
    iconSize,
    transparentInput,
    transparentInputText,
    multilineInput,
    borderStyle,
    brightSun,
    secondaryBg,
  } = styles;
  const {row, alignItemsCenter} = Layout;
  const {regularHPadding} = Gutters;
  const {border} = Global;
  return (
    <View
      style={[
        // border,s
        wrapper,
        bordered && borderStyle,
        secondaryBg,
        sun && brightSun,
      ]}>
      <Text
        style={{marginTop: value ? 7 : 0}}
        color={placeholderTextColor ? placeholderTextColor : 'quinary'}
        text={showHint && value ? placeholder : ''}
      />
      <View
        style={[
          row,
          alignItemsCenter,
          customStyle,
          bordered && borderStyle,
          sun && brightSun,
        ]}>
        <UIKInput
          value={value}
          secureTextEntry={password}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={
            placeholderTextColor ? placeholderTextColor : Colors.silverChalice
          }
          size="small"
          style={[
            input,
            !multiline && height,
            style,
            transparent && transparentInput,
          ]}
          keyboardType={keyboardType}
          textStyle={[
            text,
            !multiline && height,
            transparent && transparentInputText,
            multiline && multilineInput,
            styles[`${color}Bg`],
          ]}
          autoCapitalize="none"
          autoFocus={autoFocus}
          maxLength={maxLength}
          onSubmitEditing={() => onSubmitEditing && onSubmitEditing()}
          returnKeyType={returnKeyType}
          multiline={multiline}
        />
        {icon && (
          <View style={[regularHPadding, iconStyle]}>
            <TouchableOpacity onPress={onPress}>
              <Icon
                type={type}
                name={icon}
                style={[iconSize, styles[`${iconColor}Icon`]]}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
      {error ? <Error errorText={error} /> : null}
    </View>
  );
};

export default Input;
