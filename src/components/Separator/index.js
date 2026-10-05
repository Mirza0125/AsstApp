import React from 'react';
import {View, StyleSheet} from 'react-native';

const Separator = () => {
  return <View style={styles.separator} />;
};

export default Separator;

const styles = StyleSheet.create({
  separator: {
    backgroundColor: '#f5f5f5',
    height: 0.5,
    flex: 1,
  },
});
