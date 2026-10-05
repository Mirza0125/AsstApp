import React from 'react';
import {View, Image} from 'react-native';
import {Rating} from 'react-native-ratings';

// components
import Text from '../Text';

// theme
import {Layout, Gutters, Fonts} from 'src/theme';

// styles
import styles from './styles';

const ServiceDetail = ({source, amount, date, time}) => {
  const {textLarge} = Fonts;
  const {row, center, alignItemsCenter, alignItemsStart} = Layout;
  const {smallBPadding, smallHPadding, smallTPadding, smallLMargin} = Gutters;

  const {reviewer, cardWrapper, font} = styles;

  return (
    <View style={[smallHPadding, smallTPadding, smallBPadding, cardWrapper]}>
      <View style={[row, alignItemsCenter]}>
        <Image source={source} style={reviewer} />
        <View style={smallLMargin}>
          <View style={[center, alignItemsStart]}>
            <Text text={date} style={font} />
            <Text text={time} bold style={font} />
          </View>
        </View>
      </View>
      <Text
        text={amount}
        bold
        color="quaternary"
        style={[textLarge, {alignSelf: 'flex-end'}]}
      />
    </View>
  );
};

export default ServiceDetail;
