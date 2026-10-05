import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';

// components
import Text from '../Text';

// theme
import {Layout, Gutters, Fonts} from 'src/theme';

// styles
import styles from './styles';

const ChatNotification = ({
  source,
  name,
  text,
  date,
  time,
  unread,
  message,
  createdAt,
  newMessage,
  topRounded,
  withViewSection,
  onPress,
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
    unreadMsg,
    indicator,
    cardWrapper,
    topRoundedStyle,
  } = styles;

  return (
    <TouchableOpacity
      style={[row, smallHPadding, topRounded ? topRoundedStyle : cardWrapper]}
      onPress={onPress}
      activeOpacity={1}>
      <View style={[row, alignItemsCenter, fill3x]}>
        <View style={[reviewerPicWrapper]}>
          <Image source={source} style={reviewer} />
        </View>
        <View style={[smallLMargin]}>
          <View style={[row, center, justifyContentBetween]}>
            {name ? <Text text={name} bold style={textMedium} /> : null}
          </View>
          {message ? (
            <Text text={message} style={[smallRPadding, {fontSize: 14}]} />
          ) : null}
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
          <Text
            text={text}
            bold
            color="quaternary"
            style={[textMedium, smallRPadding]}
          />
        </View>
      ) : null}
      {newMessage ||
        (unread ? (
          <View style={indicator}>
            <Text text={unread} style={unreadMsg} />
          </View>
        ) : null)}
      {createdAt && (
        <Text text={createdAt} color="quaternary" style={created} />
      )}
    </TouchableOpacity>
  );
};

export default ChatNotification;
