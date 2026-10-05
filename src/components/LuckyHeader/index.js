import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
// theme
import {Layout, Gutters, Colors} from 'src/theme';

const LuckyHeader = ({
  left,
  title,
  right,
  action,
  onPress,
  leftStyle,
  titleStyle,
  rightStyle,
  headerStyle,
}) => {
  const {row, center} = Layout;
  const {smallVPadding, smallHPadding} = Gutters;

  return (
    <View
      style={[
        row,
        center,
        headerStyle,
        {
          paddingVertical: 10,
          backgroundColor: '#FFFFFF',
          shadowColor: '#000000',
          shadowOffset: {width: 0, height: 7},
          shadowOpacity: 0.1,
          shadowRadius: 10,
          shadowOpacity: 0.1,
          shadowRadius: 3.84,
          // elevation: 5,
        },
      ]}>
      <TouchableOpacity
        style={[
          leftStyle,
          {
            // flex: 1,
            flex: 0.7,
            alignItems: 'flex-start',
            justifyContent: 'center',
            alignItems: 'center',
            height: 40,
          },
        ]}
        onPress={onPress}>
        {left}
      </TouchableOpacity>
      <View
        style={[titleStyle, {flex: 2, alignItems: 'flex-start'}, titleStyle]}>
        <Text style={titleStyle}>{title}</Text>
      </View>
      <TouchableOpacity
        style={[
          rightStyle,
          {
            flex: 1,
            alignItems: 'flex-start',
            justifyContent: 'center',
            alignItems: 'center',
            height: 40,
          },
        ]}
        onPress={action}>
        {right}
      </TouchableOpacity>
    </View>
  );
};

export default LuckyHeader;
