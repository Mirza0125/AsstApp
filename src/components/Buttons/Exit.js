import React from 'react';
import {StyleSheet} from 'react-native';
import {Icon, Text} from 'native-base';
import Button from '../Button';

const Exit = ({action}) => {
  const {button, x} = styles;
  return (
    <Button transparent large onPress={action} style={button}>
      <Text style={x}>x</Text>
    </Button>
  );
};

const styles = StyleSheet.create({
  x: {
    color: '#8B8B8B',
    fontSize: 20,
  },
  button: {
    minWidth: 80,
    minHeight: 80,
  },
});

export {Exit};
