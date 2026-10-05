import firestore from '@react-native-firebase/firestore';
import moment from 'moment';
const store = firestore();

export default class Database {
  static database = null;

  static shared() {
    if (Database.database == null) {
      Database.database = new Database();
    }
    return this.database;
  }

  init = (chatID, primaryUser, secondaryUser) => {
    this.chatID = chatID;
    this.primaryUser = primaryUser;
    this.secondaryUser = secondaryUser;
    // console.log('this.chatID = ChatID', this.chatID);
    // console.log('this.primaryUser XX = primaryUser', this.primaryUser = primaryUser);
    // console.log('this.secondaryUser = secondaryUser', this.secondaryUser = secondaryUser);
  };

  dbRef() {
    let messagePath = `chats/${this.chatID}/messages`;
    return firestore().collection(messagePath);
  }

  async getMessages(lastVisible = null) {
    var snapshot;
    let messagePath = `chats/${this.chatID}/messages`;
    if (lastVisible === null) {
      const lastSS = await firestore()
        .collection(messagePath)
        .orderBy('timestamp', 'desc')
        .limit(1)
        .get();
      if (lastSS.docs.length > 0) {
        const docSS = lastSS.docs[0];
        const lastMessage = docSS.data();
        snapshot = await firestore()
          .collection(messagePath)
          .orderBy('timestamp', 'desc')
          .startAt(lastMessage.timestamp)
          .limit(10)
          .get();
      }
    } else {
      try {
        snapshot = await firestore()
          .collection(messagePath)
          .orderBy('timestamp', 'desc')
          .limit(10)
          .get();
      } catch (error) {
        console.log('for snapshot get message', error);
      }
    }

    const messages = [];
    if (snapshot) {
      for (let index = 0; index < snapshot.docs.length; index++) {
        try {
          const docSS = snapshot.docs[index];
          const message = docSS.data();
          messages.push(message);
        } catch (err) {
          console.log(err);
        }
      }
    }
    return messages;
  }

  async send(messages) {
    for (let i = 0; i < messages.length; i++) {
      const message = messages[i];
      message.dateTime = Date();
      message.timestamp = Number(moment().format('X'));
      message.sender = this.primaryUser.userID;
      message.receiver = this.secondaryUser.userID;
      console.log('send before messgs');
      var primaryUserMessage = {
        message: message.message,
        messageType: message.messageType,
        dateTime: message.dateTime,
        timestamp: message.timestamp,
        secondaryUser: {
          userID: this.secondaryUser?.userID,
          userName: this.secondaryUser?.userName,
          userImage: this.secondaryUser?.userImage
            ? this.secondaryUser?.userImage
            : '',
        },
      };
      const secondaryUserChat = await store
        .doc(`users/${this.secondaryUser.userID}/chats/${this.chatID}`)
        .get();
      // console.log('userID in primaryUserMessage', this.secondaryUser.userID);
      let unread = await secondaryUserChat.data()?.unReadMessagesCount;

      var secondaryUserMessage = {
        message: message.message,
        messageType: message.messageType,
        dateTime: message.dateTime,
        timestamp: message.timestamp,
        unReadMessagesCount: unread ? unread + 1 : 1,
        secondaryUser: {
          userID: this.primaryUser.userID,
          userName: this.primaryUser.userName,
          userImage: this.primaryUser?.userImage
            ? this.primaryUser.userImage
            : '',
        },
      };
      // console.log('primaryUserMessage>>', primaryUserMessage);
      // console.log('secondaryUserMessage>>', secondaryUserMessage);
      let primaryUserDoc = `users/${this.primaryUser.userID}/chats/${this.chatID}`;
      let secondaryUserDoc = `users/${this.secondaryUser.userID}/chats/${this.chatID}`;
      try {
        // console.log('primaryUserDoc', primaryUserDoc);
        // console.log('secondaryUserDoc', secondaryUserDoc);
        await firestore().doc(primaryUserDoc).update(primaryUserMessage);
        await firestore()
          .doc(secondaryUserDoc)
          .set(secondaryUserMessage, {merge: true});
      } catch (e) {
        console.log('error while updating chat ', e);
      }

      try {
        let messagePath = `chats/${this.chatID}/messages`;
        await firestore().collection(messagePath).add(message);
      } catch (e) {
        console.log('error while adding new message', e);
      }
    }
  }

  resetUnReadMessagesCount() {
    var updatedMessage = {
      unReadMessagesCount: 0,
    };
    store
      .doc(`users/${this.primaryUser.userID}/chats/${this.chatID}`)
      .update(updatedMessage);
  }
  async blockUser() {
    var secondaryUserMessage = {
      message: 'you are block',
      messageType: 'block',
      id: this.primaryUser.userID,
      dateTime: Date(),
      timestamp: Number(moment().format('X')),
      secondaryUser: {
        userID: this.primaryUser.userID,
        userName: this.primaryUser.userName,
      },
    };
    try {
      await firestore()
        .doc(`users/${this.secondaryUser.userID}/chats/${this.chatID}`)
        .set(secondaryUserMessage, {merge: true});
    } catch (e) {
      console.log('error while user block', e);
    }
  }
  parseNewMessage(snapshot) {
    const messages = [];
    snapshot.docChanges().forEach((change) => {
      const latestMessage = change.doc.data();
      if (latestMessage.sender !== this.primaryUser.userID) {
        messages.push(latestMessage);
      }
    });
    return messages;
  }

  subscribe = (callback) => {
    this.unSub = this.dbRef().onSnapshot((snapshot) =>
      callback(this.parseNewMessage(snapshot)),
    );
  };

  unSubscribe() {
    this.unSub();
  }
}
