import React from 'react';

import {View, Image, TouchableOpacity} from 'react-native';

// components
import Text from '../Text';

// theme
import {Layout, Fonts} from 'src/theme';

// styles
import styles from './styles';

const IconCard = ({source, text, onPress, style, textStyle}) => {
  const {center} = Layout;
  const {textMedium, textRegular} = Fonts;
  const {wrapper, image, mainWrapper} = styles;

  return (
    <View style={text && mainWrapper}>
      <View style={[wrapper, style]}>
        <TouchableOpacity onPress={onPress} style={[center]}>
          <Image source={source} style={[image]} />
        </TouchableOpacity>
      </View>
      {text ? <Text text={text} style={[textStyle, textRegular]} /> : null}
    </View>
  );
};

export default IconCard;
