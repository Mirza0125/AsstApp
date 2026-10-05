import React from 'react';
import {View, Image, Text} from 'react-native';
import {getMessageTime} from 'src/utils/functions';
import {Colors} from 'src/theme';
import styles from './styles';

const MessageCard = (props) => {
  const {message, dateTime, sender, messageType} = props.message;
  const primaryUserID = props.primaryUserID;

  return (
    <View>
      <View
        style={
          sender === primaryUserID
            ? styles.messageContainerSender
            : styles.messageContainerReceiver
        }>
        <View
          style={[
            styles.messageView,
            sender === primaryUserID
              ? styles.sentMessageView
              : styles.recievedMessageView,
          ]}>
          {messageType == 'image' ? (
            <View style={styles.imageContainer}>
              <Image style={[styles.messageImage]} source={{uri: message}} />
              <Text
                style={[
                  styles.imageTimeText,
                  {
                    color:
                      sender === primaryUserID
                        ? Colors.senderTimeColor
                        : Colors.receiverTimeColor,
                  },
                ]}>
                {getMessageTime(dateTime)}
              </Text>
            </View>
          ) : (
            <View>
              <Text
                style={[
                  styles.messageText,
                  {
                    color:
                      sender === primaryUserID
                        ? Colors.senderMessageTextColor
                        : Colors.receiverMessageTextColor,
                  },
                ]}>
                {message}
              </Text>
              <Text
                style={[
                  styles.messageTimeText,
                  {
                    color:
                      sender === primaryUserID
                        ? Colors.senderTimeColor
                        : Colors.receiverTimeColor,
                  },
                ]}>
                {getMessageTime(dateTime)}
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default MessageCard;
