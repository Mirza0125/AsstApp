import React from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import {ParseDateStringForChat} from 'src/utils/functions';
import {Images} from 'src/theme';

import styles from './styles';

const ChatCard = (props) => {
  const {profilePicture, userName} = props.chat.secondaryUser;
  const {message, dateTime, messageType, unReadMessagesCount} = props.chat;
  let isImage = messageType === 'image';

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.container}
      onPress={() => props.chatTapped()}>
      <View style={styles.imageView}>
        <Image style={styles.image} source={Images.mark} />
      </View>

      <View style={styles.messageView}>
        <Text style={styles.nameText} numberOfLines={1}>
          {userName}
        </Text>
        <Text style={styles.messageText} numberOfLines={3}>
          {isImage ? (
            <View style={styles.photoView}>
              <Image source={Images.mark} />
              <Text style={styles.photoText}>Photo</Text>
            </View>
          ) : (
            <Text> {message}</Text>
          )}
        </Text>
      </View>

      <View style={styles.timestampView}>
        <Text style={styles.timestampText}>
          {ParseDateStringForChat(dateTime)}
        </Text>
        {unReadMessagesCount > 0 && (
          <View style={styles.countView}>
            <Text style={styles.countText}>{unReadMessagesCount}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ChatCard;
