import React, {useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import DatePicker from 'react-native-date-picker';
import styles from './styles';
import Text from '../Text';
import {Layout, Gutters, Colors, Global} from 'src/theme';

const DateTimePickerComponent = ({
  mode,
  value,
  onChange,
  placeholderTextColor,
  showHint = false,
  placeholder,
}) => {
  const [visible, setVisible] = useState(false);

  const onDateTimeChange = (selectedDate) => {
    setVisible(false);
    onChange(selectedDate);
  };

  const openDateTimePicker = () => {
    setVisible(true);
  };

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

  return (
    <TouchableOpacity
      onPress={openDateTimePicker}
      style={[
        // border,s
        wrapper,
        borderStyle,
        secondaryBg,
        brightSun,
      ]}>
      <Text
        style={{marginTop: value ? 7 : 0, color: Colors.silverChalice}}
        text={showHint && value ? placeholder : ''}
      />

      <DatePicker
        title={placeholder}
        textColor={'#000'}
        modal
        open={visible}
        date={value}
        mode={mode}
        onConfirm={onDateTimeChange}
        onCancel={() => {
          setVisible(false);
        }}
      />

      <Text
        style={[, {marginTop: 0, color: 'quinary', fontSize: 15}]}
        text={
          mode === 'time' ? value.toLocaleTimeString() : value.toDateString()
        }
      />
    </TouchableOpacity>
  );
};

export default DateTimePickerComponent;
