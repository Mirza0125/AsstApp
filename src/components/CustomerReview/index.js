import React from 'react';
import {View, Image} from 'react-native';
import {Rating} from 'react-native-ratings';

// components
import Text from '../Text';

// theme
import {Layout, Images, Gutters, Fonts} from 'src/theme';

// styles
import styles from './styles';

const CustomerReview = ({source, name, text, rating, readonly, date, time}) => {
  const {textMedium} = Fonts;
  const {row, fill, center, justifyContentBetween} = Layout;
  const {smallLMargin, mediumBPadding, smallHPadding, smallTPadding} = Gutters;

  const {reviewer, reviewerPicWrapper, cardWrapper} = styles;

  return (
    <View
      style={[row, smallHPadding, smallTPadding, mediumBPadding, cardWrapper]}>
      <View style={reviewerPicWrapper}>
        <Image source={source} style={reviewer} />
      </View>
      <View style={[fill, smallLMargin]}>
        <View style={[row, center, justifyContentBetween]}>
          <Text text={name} bold style={textMedium} />
          <Text text={date} />
        </View>
        <View style={[row, justifyContentBetween]}>
          <Rating
            readonly={readonly}
            startingValue={rating}
            ratingCount={5}
            imageSize={14}
            style={{paddingVertical: 4}}
          />
          <Text text={time} />
        </View>
        <Text text={text} />
      </View>
    </View>
  );
};

export default CustomerReview;
