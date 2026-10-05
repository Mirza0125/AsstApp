import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {Content, Icon} from 'native-base';
// components
import Text from '../Text';

// theme
import {Layout, Images, Gutters, Fonts} from 'src/theme';

// styles
import styles from './styles';

const MyOrders = ({
  time,
  date,
  name,
  address,
  onViewDetail,
  imageUrl,
  category,
  onMessage,
  onCheckPrice,
}) => {
  const {textRegular, textMedium} = Fonts;
  const {row, fill, center, justifyContentBetween, alignItemsCenter} = Layout;
  const {smallRMargin, regularLMargin, smallLMargin} = Gutters;
  const {
    check,
    primaryBg,
    reviewer,
    PicWrapper,
    mainWrapper,
    locationIcon,
    locationWrapper,
  } = styles;
  return (
    <View
      style={[
        {
          borderRadius: 8,
          overflow: 'hidden',
          marginTop: 10,
          borderWidth: 0.5,
          borderColor: '#F0F0F0',
          backgroundColor: 'white',
          shadowColor: '#707070',
          shadowOffset: {
            width: 0,
            height: 0.1,
          },
          shadowOpacity: 0.1,
          shadowRadius: 1.84,
          elevation: 0.5,
        },
      ]}>
      <View style={[row, mainWrapper, justifyContentBetween]}>
        <View>
          <Text text={date} bold style={{fontSize: 22}} />
          <Text text={time} style={{fontSize: 16}} />
        </View>
        <View style={[regularLMargin, {right: 10}]}>
          <View style={[row, alignItemsCenter, smallRMargin]}>
            <View style={[PicWrapper]}>
              <Image
                source={imageUrl ? {uri: imageUrl} : Images.anneonbeach}
                style={reviewer}
              />
            </View>
            <View style={smallLMargin}>
              <View style={[row, center, justifyContentBetween]}>
                <Text text={name} bold style={textMedium} />
              </View>
              <Text text={category} color="quaternary" />
            </View>
          </View>
          <View style={[row, center, locationWrapper]}>
            <Icon name="location" style={locationIcon} />
            <Text text={address} />
          </View>
        </View>
      </View>
      <View
        style={[
          row,
          {
            backgroundColor: 'white',
            borderWidth: 1,
            height: 42,
            borderColor: '#F0F0F0',
            overflow: 'hidden',
          },
        ]}>
        <TouchableOpacity
          style={[
            fill,
            center,
            primaryBg,
            {
              backgroundColor: 'white',
              borderRightWidth: 1,
              borderColor: '#F0F0F0',
            },
          ]}
          onPress={onMessage}>
          <Text text="Message" color="quaternary" />
        </TouchableOpacity>
        <TouchableOpacity style={[fill, row, center]} onPress={onViewDetail}>
          {/* <Icon type="FontAwesome5" name="check-circle" style={check} /> */}
          <Text text="View Details" color="quinary" style={smallLMargin} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MyOrders;
