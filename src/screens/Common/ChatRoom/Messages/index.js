import React, {useState, useEffect, useRef} from 'react';
import {connect} from 'react-redux';
import Database from './database';
import {Icon} from 'native-base';

import firestore from '@react-native-firebase/firestore';
import {
  Text,
  View,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';
import {Images} from 'src/theme';
import MessageCard from './MessageCard';
import styles from './styles';
import {SafeAreaView} from 'react-native';
import {Fonts} from 'src/theme';

const {titleSmall, textMedium} = Fonts;

const Messages = (props) => {
  const {
    user,
    profileData,
    customerProfile,
    route: {
      params: {chat},
    },
    navigation: {navigate},
  } = props;

  //const user = auth().currentUser.toJSON();
  const {id, first_name, image, role} = user;
  const [chats, setChats] = useState({});
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [typedMessage, setTypedMessage] = useState('');
  const [newMessage, setNewMessage] = useState([]);
  const db = firestore();
  const flatList = useRef();

  const scrollToBottom = () => {
    setTimeout(() => {
      flatList.current.scrollToOffset({
        animated: true,
        offset: 0,
      });
    }, 10);
  };

  const backButtonTapped = () => {
    props.navigation.goBack();
  };

  useEffect(() => {
    setChats(chat);
    var isFirstTime = true;
    Database.shared().init(
      chat.chatID,
      {
        userID: id,
        userName: first_name,
        userImage:
          role == 'customer'
            ? customerProfile[0]?.image
              ? customerProfile[0]?.image
              : ''
            : profileData[0]?.photo
            ? profileData[0]?.photo
            : '',
      },
      chat?.detail?.secondaryUser,
    );

    Database.shared().resetUnReadMessagesCount();

    Database.shared().subscribe(
      (newMessages) => {
        if (!isFirstTime) {
          if (newMessages.length > 0) {
            setNewMessage([...newMessages]);
          }
          Database.shared().resetUnReadMessagesCount();
        } else {
          isFirstTime = false;
        }
      },
      [messages],
    );
    getMessages(false);

    return () => {
      Database.shared().unSubscribe();
    };
  }, []);

  const getMessages = async (isLoadingMore = false) => {
    if (loading) {
      return;
    }
    setLoading(true);
    const results = await Database.shared().getMessages();
    if (isLoadingMore) {
      setMessages(results);
    } else {
      setMessages(results);
    }
    setLoading(false);
  };

  useEffect(() => {
    setMessages([...newMessage, ...messages]);
  }, [newMessage]);

  const sendMessageButtonTapped = async () => {
    const message = {
      message: typedMessage,
      messageType: 'text',
    };
    console.log('message>', message);
    Database.shared().send([message]);
    const messagesClone = [...messages];
    messagesClone.unshift(message);
    setMessages(messagesClone);
    setTypedMessage('');
    console.log('messages>>>', messages);
    //props.getUnreadCount(chat.detail.unReadMessagesCount);
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#555" style={{flex: 1}} />;
  }
  // console.log('chat?.detail?.secondaryUser', chat?.detail?.secondaryUser);
  // console.log('customerProfile', customerProfile);
  console.log('chat', chat);
  console.log('messages', messages);
  console.log('profileData>>', profileData);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <SafeAreaView style={{flex: 1, marginBottom: 10}}>
        <View style={styles.container}>
          <TouchableOpacity
            style={{width: 50, height: 40, marginLeft: 20, marginTop: 35}}
            onPress={() => props.navigation.goBack()}>
            <Icon type="FontAwesome5" name="arrow-left" style={[titleSmall]} />
          </TouchableOpacity>

          <FlatList
            ref={flatList}
            style={styles.messagesListView}
            data={messages}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <MessageCard primaryUserID={id} message={item} />
            )}
            inverted
            //onEndReached={() => getMessages(true)}
            onEndReachedThreshold={1}
          />
        </View>
        <View style={[styles.messageInputTextContainer]}>
          <View style={styles.inputTextView}>
            {/* <TouchableOpacity
            style={styles.chatMediaButton}
            onPress={sendMessageButtonTapped}>
            <Text style={{color: 'white'}}>GIF</Text>
          </TouchableOpacity> */}

            {/* <TouchableOpacity
              style={styles.chatMediaButton}
              onPress={this.uploadPhotoButtonTapped}>
              <Image source={Resources.camera} />
            </TouchableOpacity> */}

            <TextInput
              style={styles.inputText}
              value={typedMessage}
              onChangeText={(text) => setTypedMessage(text)}
              placeholder="Message"
            />
          </View>

          <TouchableOpacity
            style={styles.sendMessageButton}
            onPress={sendMessageButtonTapped}>
            <Image source={Images.send1} style={{width: 40, height: 40}} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const mapStateToProps = (state) => ({
  user: state?.login?.user,
  profileData: state?.profileData?.profileData,
  customerProfile: state?.customerProfile?.customerProfile,
});

export default connect(mapStateToProps, null)(Messages);
