import React from 'react';

import {View, Image, TouchableOpacity} from 'react-native';

// theme
import {Layout} from 'src/theme';

// styles
import styles from './styles';

const ServiceCard = ({source, onPress, style}) => {
  const {center} = Layout;
  const {wrapper, image} = styles;

  return (
    <View style={[wrapper, style]}>
      <TouchableOpacity onPress={onPress} style={[center]}>
        <Image source={source} style={[image]} />
      </TouchableOpacity>
    </View>
  );
};

export default ServiceCard;
