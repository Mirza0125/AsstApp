import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';

// components
import {Text, LuckyHeader} from 'src/components';
import {StatusBar} from 'react-native';
import {Icon, Container, Content} from 'native-base';
import {View, Image, TouchableOpacity} from 'react-native';

// styles
import styles from './styles';
import {Layout, Fonts, Colors, Gutters} from 'src/theme';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';

const TermsAndCondition = (props) => {
  const {
    navigation: {navigate},
  } = props;

  const {row, fill, center, alignItemsCenter} = Layout;
  const {
    mediumHPadding,
    mediumVMargin,
    mediumTMargin,
    smallHPadding,
    smallLPadding,
  } = Gutters;
  const {
    textLarge,
    textLeft,
    textCenter,
    titleRegular,
    titleSmall,
    textRegularX,
  } = Fonts;
  const {contentStyle, fonts, line} = styles;

  return (
    <SafeAreaView style={[fill, {backgroundColor: '#fff'}]}>
      {/* <StatusBar backgroundColor={Colors.white} barStyle="dark-content" /> */}

      <LuckyHeader
        left={
          <Icon
            type="FontAwesome5"
            name="arrow-left"
            style={{fontSize: 20}}
            onPress={() => props.navigation.goBack()}
          />
        }
        title={
          <Text
            text="Terms and conditions"
            color="#000"
            bold
            style={titleSmall}
          />
        }
      />
      <View style={line} />

      <ScrollView>
        <Text style={[textLarge, smallHPadding, mediumTMargin]}>
          Lorem ipsum dolor sit amet
        </Text>
        <Text style={[textRegularX, smallHPadding, mediumTMargin]}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
          consectetur eget purus eu hendrerit. Pellentesque eget rhoncus nulla,
          id ornare lorem. Aenean sit amet purus erat. Nulla facilisi. Donec ut
          nunc consequat, lacinia massa eu, fermentum elit. Nulla rutrum orci
          risus, vitae pulvinar sapien sollicitudin non.
        </Text>

        <Text style={[textRegularX, smallHPadding, mediumTMargin]}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
          consectetur eget purus eu hendrerit. Pellentesque eget rhoncus nulla,
          id ornare lorem. Aenean sit amet purus erat. Nulla facilisi. Donec ut
          nunc consequat, lacinia massa eu, fermentum elit. Nulla rutrum orci
          risus, vitae pulvinar sapien sollicitudin non.
        </Text>

        <Text style={[textRegularX, smallHPadding, mediumTMargin]}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
          consectetur eget purus eu hendrerit. Pellentesque eget rhoncus nulla,
          id ornare lorem. Aenean sit amet purus erat. Nulla facilisi. Donec ut
          nunc consequat, lacinia massa eu, fermentum elit. Nulla rutrum orci
          risus, vitae pulvinar sapien sollicitudin non.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TermsAndCondition;
