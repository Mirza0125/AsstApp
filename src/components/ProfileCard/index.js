import React from 'react';

import {View, Image, TouchableOpacity} from 'react-native';
import {Rating} from 'react-native-ratings';
// components
import Text from '../Text';

// theme
import {Layout, Gutters, Fonts} from 'src/theme';

// styles
import styles from './styles';

const ProfileCard = ({source, text, id, rating, onPress}) => {
  const {center, alignItemsCenter} = Layout;
  const {smallBMargin} = Gutters;
  const {textMedium} = Fonts;
  const {wrapper, image, mainWrapper} = styles;

  return (
    <View style={[alignItemsCenter, mainWrapper]}>
      <TouchableOpacity onPress={onPress}>
        <View style={[center, wrapper, smallBMargin]}>
          <Image source={source} style={image} />
        </View>
      </TouchableOpacity>
      <Text text={text} center style={textMedium} />
      <Text text={id} center style={textMedium} />
      <Rating
        startingValue={rating}
        ratingCount={5}
        imageSize={14}
        style={{paddingVertical: 4}}
        tintColor="#F7F7F7"
        readonly
      />
    </View>
  );
};

export default ProfileCard;
