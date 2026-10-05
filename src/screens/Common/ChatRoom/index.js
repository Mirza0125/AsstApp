import React, {useState, useEffect, useRef} from 'react';
import {connect} from 'react-redux';
// import { SwipeListView } from 'react-native-swipe-list-view';
import {Icon} from 'native-base';
import {ParseDateStringForChat} from 'src/utils/functions';
import {View, FlatList, Image} from 'react-native';
import Database from './database';
import {getUnreadCount} from './redux/action';
// components
import {
  Text,
  ChatNotification,
  LuckyHeader,
  Separator,
  DataAvailability,
} from 'src/components';

// theme
import {Images, Fonts} from 'src/theme';

//styles
import styles from './styles';
import {SafeAreaView} from 'react-native';

const ChatRoom = (props) => {
  const {
    user,
    // route: {
    //   params: {},
    // },
    navigation: {navigate},
  } = props;
  const {titleSmall} = Fonts;

  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalUnReadChatsCount, setTotalUnReadChatsCount] = useState(0);

  const calculateTotalUnReadChatsCount = () => {
    const chatCount = [...chats];
    let count = 0;
    chatCount.forEach((chat) => {
      console.log('chat.detail', chat);
      if (chat.detail.unReadMessagesCount > 0) {
        count += 1;
      }
    });
    setTotalUnReadChatsCount(count);
  };

  const getConversations = async () => {
    if (loading) {
      return;
    }
    setLoading(true);

    const chat = await Database.shared().getChatList();
    setLoading(false);
    setChats(chat);
    calculateTotalUnReadChatsCount();
  };

  const chatTapped = (chat) => {
    console.log('chatTapped', chat);
    navigate('Messages', {
      chat: chat,
    });
  };

  useEffect(() => {
    Database.shared().init(
      user.id,
      user.user_email ? user.user_email : user.email,
    );
    Database.shared().subscribe(() => {
      getConversations(false);
    });
    getConversations(false);
  }, []);
  console.log('chats>>', chats);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      {/* <StatusBar backgroundColor={Colors.white} barStyle="dark-content" /> */}
      <LuckyHeader
        left={
          <Image
            style={{width: 14, height: 12, resizeMode: 'contain'}}
            source={require('../../../assets/images/new/arrow-left.png')}
          />
        }
        onPress={() => props.navigation.goBack()}
        title={<Text text="Chats" color="#000" bold style={titleSmall} />}
        right={
          <Icon
            type="Ionicons"
            name="ios-notifications-outline"
            style={{fontSize: 22, color: '#000'}}
          />
        }
        titleStyle={{alignItems: 'flex-start'}}
      />

      <View style={styles.container}>
        {/* <View style={styles.sectionTitleView}>
          <Text style={styles.sectionTitleText}>Messages</Text>
          {totalUnReadChatsCount > 0 && (
            <View style={styles.countView}>
              <Text style={styles.countText}>{totalUnReadChatsCount}</Text>
            </View>
          )}
        </View> */}

        {/* <DataAvailability requesting={loading} hasData={chats.length != 0}> */}
        {/* <SwipeListView
            style={styles.messagesListView}
            data={chats}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <>
                <ChatNotification
                  name={item.detail.secondaryUser.userName}
                  source={
                    item.detail.secondaryUser.userImage
                      ? item.detail.secondaryUser.userImage
                      : Images.anneonbeach
                  }
                  message={item.detail.message}
                  unread={item.detail.unReadMessagesCount}
                  createdAt={ParseDateStringForChat(item.dateTime)}
                  onPress={() => chatTapped(item)}
                />
                <Separator />
              </>
            )}
            renderHiddenItem={(data, rowMap) => (
              <View style={styles.swipeToDeleteView}>
                <TouchableOpacity
                  style={styles.swipeToDeleteButton}
                  onPress={() => console.log('Item Removed')}>
                  <Icon
                    type="FontAwesome"
                    name="trash"
                    style={[titleSmall, {color: 'red'}]}
                  />
                  <Text style={styles.swipeToDeleteButtonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            )}
            rightOpenValue={-110}
            disableRightSwipe
          /> */}
        <FlatList
          style={styles.messagesListView}
          data={chats}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <>
              <ChatNotification
                name={item?.detail?.secondaryUser?.userName}
                source={
                  item?.detail?.secondaryUser?.userImage
                    ? {uri: String(item?.detail?.secondaryUser?.userImage)}
                    : Images.nopic
                }
                message={item?.detail?.message}
                unread={item?.detail?.unReadMessagesCount}
                createdAt={ParseDateStringForChat(item?.dateTime)}
                onPress={() => chatTapped(item)}
              />
              <Separator />
            </>
          )}
        />
        {/* </DataAvailability> */}
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  user: state.login.user,
  unreadCount: state.unreadCount.unreadCount,
  requesting: state.profile.requesting,
  profile: state.profile.profile,
});

const mapDispatchToProps = (dispatch) => ({
  getUnreadCount: (count) => dispatch(getUnreadCount(count)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom);
