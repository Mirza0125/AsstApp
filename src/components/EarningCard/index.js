import React from 'react';
import {Icon} from 'native-base';
import {View} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

// components
import Text from '../Text';

// theme
import {Layout, Gutters, Fonts, Colors} from 'src/theme';

// styles
import styles from './styles';

const EarningCard = ({heading, amount, text}) => {
  const data = [
    {
      title: 'Fast and Easy',
      text: 'A',
      image: require('src/assets/images/cleaning.png'),
    },
    {
      title: 'Customise your appearance',
      text: 'B',
      image: require('src/assets/images/appearance.png'),
    },
    {
      title: 'Control over your schedule',
      text: 'C',
      image: require('src/assets/images/wallcleaning.png'),
    },
  ];
  const renderItem = () => {
    return (
      <View style={[center, regularHPadding, card]}>
        <Text text={heading} style={textMedium} color="tertiary" PoppinsM />
        <Text text={amount} color="secondary" style={titleLarge} PoppinsM />
        <Text text={text} color="secondary" style={textRegularX} PoppinsM />
      </View>
    );
  };

  const keyExtractor = (item) => item.title;

  const renderNextButton = () => {
    return (
      <View style={{marginTop: -10}}>
        <Icon
          type="FontAwesome5"
          name="chevron-right"
          style={{fontSize: 20, color: 'white', opacity: 0.5}}
        />
      </View>
    );
  };

  const renderBackButton = () => {
    return (
      <View style={{marginTop: -10}}>
        <Icon
          type="FontAwesome5"
          name="chevron-left"
          style={{fontSize: 20, color: 'white', opacity: 0.5}}
        />
      </View>
    );
  };

  const {textMedium, titleLarge, textRegularX} = Fonts;
  const {row, center} = Layout;
  const {regularHPadding} = Gutters;
  const {card} = styles;

  return (
    <AppIntroSlider
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      data={data}
      goToSlide={1}
      bottomButton={false}
      showPrevButton={true}
      showNextButton={true}
      showSkipButton={false}
      showDoneButton={false}
      dotClickEnabled={false}
      renderPrevButton={renderBackButton}
      renderNextButton={renderNextButton}
      nextLabel={<Icon type="FontAwesome5" name="chevron-right" />}
      prevLabel={<Icon type="FontAwesome5" name="chevron-left" />}
      showsHorizontalScrollIndicator={false}
      activeDotStyle={{backgroundColor: Colors.monza}}
      dotStyle={{backgroundColor: Colors.monza}}
    />
  );
};

export default EarningCard;
