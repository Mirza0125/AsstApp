import React from 'react';
import {StyleSheet} from 'react-native';
import {Icon} from 'native-base';

const Back = ({action}) => {
  const {button} = styles;
  return (
    <Icon
      onPress={action}
      type="Ionicons"
      name="ios-arrow-back"
      style={button}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    color: '#000000',
    fontSize: 30,
    paddingLeft: 10,
    minWidth: 40,
    textAlign: 'center',
  },
});

export {Back};
