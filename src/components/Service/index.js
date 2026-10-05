import React from 'react';
import {View, Image} from 'react-native';

// components
import Text from '../Text';

// theme
import {Layout, Gutters, Fonts, Images} from 'src/theme';

// styles
import styles from './styles';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Service = ({
  name,
  text,
  date,
  time,
  onPress,
  address,
  imageUrl,
  categoryName,
  withViewSection,
}) => {
  const {textMedium} = Fonts;
  const {
    row,
    fill,
    fill2x,
    fill3x,
    center,
    alignItemsCenter,
    justifyContentBetween,
  } = Layout;
  const {smallLMargin, smallRPadding, smallHPadding} = Gutters;

  const {reviewer, reviewerPicWrapper, view, cardWrapper} = styles;

  return (
    <TouchableOpacity
      style={[fill, row, smallHPadding, cardWrapper]}
      onPress={onPress}>
      <View style={[row, alignItemsCenter, fill3x]}>
        <View style={[reviewerPicWrapper]}>
          <Image
            source={imageUrl ? {uri: imageUrl} : Images.anneonbeach}
            style={reviewer}
          />
        </View>
        <View style={[fill, {paddingLeft: 15}]}>
          <View style={[fill2x]}>
            {name && <Text text={name} bold style={{fontSize: 12}} />}
            {address ? (
              <View style={[fill3x, {paddingRight: 5}]}>
                <Text
                  text={address}
                  style={{
                    fontSize: 12,
                    marginLeft: 0,
                    color: '#a5a5a5',
                  }}
                />
              </View>
            ) : null}
            {categoryName && (
              <Text
                text={categoryName}
                style={{fontSize: 12, marginLeft: 0, color: '#a5a5a5', flex: 1}}
              />
            )}
          </View>
          <View style={[row, fill]}>
            {date && <Text text={date} bold style={[smallRPadding, fill]} />}
            {time && <Text text={time} style={[fill]} color="quaternary" />}
          </View>
        </View>
      </View>
      {withViewSection && (
        <View style={[row, fill, justifyContentBetween, view]}>
          <Text
            text={text}
            bold
            color="quaternary"
            style={[{fontSize: 14}, smallRPadding]}
          />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Service;
