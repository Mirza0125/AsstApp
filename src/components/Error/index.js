import React from 'react';
import {View} from 'react-native';

import styles from './styles';
import Text from '../Text';

const Error = ({errorText}) => {
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 16,
          lineHeight: 17,
          alignSelf: 'center',
          paddingVertical: 8,
          textAlign: 'center',
        }}
        text={errorText}
        color="quaternary"
      />
    </View>
  );
};
export default Error;
