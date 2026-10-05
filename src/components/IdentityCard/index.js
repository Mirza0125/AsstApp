import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {Rating} from 'react-native-ratings';

// components
import Text from '../Text';

// theme
import {Layout, Gutters, Global, Fonts} from 'src/theme';

// styles
import styles from './styles';
import {Images} from '../../theme';

const IdentityCard = ({
  imageUrl,
  name,
  text,
  date,
  time,
  rating,
  topRounded,
  withViewSection,
  onPress,
}) => {
  const {textMedium} = Fonts;
  const {row, fill, fill3x, center, alignItemsCenter, justifyContentBetween} =
    Layout;
  const {smallLMargin, smallRPadding, smallVPadding, smallHPadding} = Gutters;

  const {
    view,
    ratings,
    reviewer,
    cardWrapper,
    topRoundedStyle,
    reviewerPicWrapper,
  } = styles;

  return (
    <View
      style={[
        row,
        fill,
        smallHPadding,
        topRounded ? topRoundedStyle : cardWrapper,
      ]}>
      <View style={[row, alignItemsCenter, fill3x]}>
        <View style={[reviewerPicWrapper]}>
          <Image
            source={imageUrl ? {uri: imageUrl} : Images.anneonbeach}
            style={reviewer}
          />
        </View>
        <View style={[smallLMargin, smallVPadding]}>
          <View style={[row, center, justifyContentBetween]}>
            {name ? <Text text={name} bold style={[textMedium]} /> : null}
          </View>
          <Rating
            readonly
            ratingCount={5}
            imageSize={18}
            style={ratings}
            tintColor="#F5F5F5"
            startingValue={rating}
          />
          {date || time ? (
            <View style={row}>
              {date ? <Text text={date} bold style={smallRPadding} /> : null}
              {time ? <Text text={time} style={smallRPadding} /> : null}
            </View>
          ) : null}
        </View>
      </View>
      {withViewSection ? (
        <View style={[row, fill, justifyContentBetween, view]}>
          <TouchableOpacity onPress={onPress}>
            <Text
              text={text}
              bold
              color="quaternary"
              style={[textMedium, smallRPadding]}
            />
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};

export default IdentityCard;
