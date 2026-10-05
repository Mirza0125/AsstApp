import React from 'react';
import {StyleSheet} from 'react-native';
import {Icon} from 'native-base';

const Menu = ({action}) => {
  const {button} = styles;
  return (
    <Icon onPress={action} type="Ionicons" name="ios-menu" style={button} />
  );
};

const styles = StyleSheet.create({
  button: {
    color: '#000000',
    fontSize: 30,
    minWidth: 40,
    paddingLeft: 10,
    textAlign: 'center',
  },
});

export {Menu};
