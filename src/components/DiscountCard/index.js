import React from 'react';
import {View, Image} from 'react-native';
import {Icon} from 'native-base';
import AppIntroSlider from 'react-native-app-intro-slider';

// components
import Text from '../Text';

// theme
import {Layout, Gutters, Fonts, Colors} from 'src/theme';

// styles
import styles from './styles';

const DiscountCard = ({heading, text, codeText, code, source}) => {
  const {textMedium, textRegular} = Fonts;
  const {row, center, justifyContentBetween} = Layout;
  const {regularHPadding} = Gutters;
  const {card, image} = styles;
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
      <View style={[row, center, justifyContentBetween, regularHPadding, card]}>
        <View>
          <Text text={heading} style={[textMedium]} color="tertiary" PoppinsM />
          <Text
            text={text}
            color="secondary"
            style={textMedium}
            bold
            PoppinsM
          />
          <View style={row}>
            <Text
              text={codeText}
              color="tertiary"
              style={textRegular}
              PoppinsM
            />
            <Text
              text={code}
              color="tertiary"
              style={textRegular}
              bold
              PoppinsM
            />
          </View>
        </View>
        <Image source={source} style={image} />
      </View>
    );
  };

  const keyExtractor = (item) => item.title;

  // const renderNextButton = () => {
  //   return (
  //     <View style={{marginTop: -10}}>
  //       <Icon
  //         type="FontAwesome5"
  //         name="chevron-right"
  //         style={{fontSize: 20, color: 'white', opacity: 0.5}}
  //       />
  //     </View>
  //   );
  // };

  // const renderBackButton = () => {
  //   return (
  //     <View style={{marginTop: -10}}>
  //       <Icon
  //         type="FontAwesome5"
  //         name="chevron-left"
  //         style={{fontSize: 20, color: 'white', opacity: 0.5}}
  //       />
  //     </View>
  //   );
  // };

  return (
    <AppIntroSlider
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      data={data}
      goToSlide={1}
      bottomButton={false}
      showPrevButton={false}
      showNextButton={false}
      showSkipButton={false}
      showDoneButton={false}
      dotClickEnabled={false}
      showsHorizontalScrollIndicator={false}
      dotStyle={{backgroundColor: Colors.monza}}
      activeDotStyle={{backgroundColor: Colors.monza}}
      // renderPrevButton={renderBackButton}
      // renderNextButton={renderNextButton}
      // nextLabel={<Icon type="FontAwesome5" name="chevron-right" />}
      // prevLabel={<Icon type="FontAwesome5" name="chevron-left" />}
    />
  );
};

// return (
//   <View style={[row, center, justifyContentBetween, regularHPadding, card]}>
//     <View>
//       <Text text={heading} style={textMedium} color="tertiary" />
//       <Text text={text} color="secondary" style={textMedium} />
//       <View style={row}>
//         <Text text={codeText} color="secondary" style={textMedium} />
//         <Text text={code} color="tertiary" style={textMedium} />
//       </View>
//     </View>
//     <Image source={source} style={image} />
//   </View>
// );

export default DiscountCard;
