import React from 'react';
import {View, Image} from 'react-native';

// components
import Text from '../Text';

// theme
import {Layout, Gutters, Fonts, Images} from 'src/theme';

// styles
import styles from './styles';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Notification = ({
  imageUrl,
  name,
  text,
  date,
  time,
  onPress,
  message,
  createdAt,
  newMessage,
  topRounded,
  withViewSection,
}) => {
  const {textMedium} = Fonts;
  const {row, fill, fill3x, center, alignItemsCenter, justifyContentBetween} =
    Layout;
  const {smallLMargin, smallRPadding, smallHPadding} = Gutters;

  const {
    reviewer,
    reviewerPicWrapper,
    view,
    created,
    indicator,
    cardWrapper,
    topRoundedStyle,
  } = styles;

  return (
    <TouchableOpacity
      style={[row, smallHPadding, topRounded ? topRoundedStyle : cardWrapper]}
      onPress={onPress}>
      <View style={[row, alignItemsCenter, fill3x]}>
        <View style={[reviewerPicWrapper]}>
          {imageUrl && (
            <Image
              source={imageUrl ? {uri: imageUrl} : Images.anneonbeach}
              style={reviewer}
            />
          )}
        </View>
        <View style={[smallLMargin]}>
          <View style={[row, center]}>
            {name && <Text text={name} bold style={textMedium} />}
            {message && (
              <Text
                text={message}
                style={{fontSize: 10, marginLeft: 5, color: '#a5a5a5'}}
              />
            )}
          </View>
          {createdAt && (
            <Text
              text={createdAt}
              style={[smallRPadding, {fontSize: 12}]}
              color="quaternary"
            />
          )}
          {date ||
            (time && (
              <View style={row}>
                {date && <Text text={date} bold style={smallRPadding} />}
                {time && (
                  <Text text={time} style={smallRPadding} color="quaternary" />
                )}
              </View>
            ))}
        </View>
      </View>
      {withViewSection && (
        <View style={[row, fill, justifyContentBetween, view]}>
          <Text
            text={text}
            bold
            color="quaternary"
            style={[textMedium, smallRPadding]}
          />
        </View>
      )}
      {newMessage && <View style={indicator} />}
    </TouchableOpacity>
  );
};

export default Notification;
