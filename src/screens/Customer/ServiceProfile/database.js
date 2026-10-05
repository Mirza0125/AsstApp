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

  init = (id, name, image) => {
    this.userID = id;
    this.userName = name;
    this.userImage = image;
  };

  dbRef() {
    let path = `users/${this.userID}/chats`;
    return firestore().collection(path);
  }

  async addChat(val) {
    let id = this.userID;
    const data = {
      id,
      matchID: val.user,
      createdAt: moment.now(),
      count: 0,
      messages: [],
      secondaryUser: {
        userID: val.user,
        userName: val.name,
        userImage: val.photo ? val.photo : '',
      },
    };
    let chatlist = await this.getChatList(id);
    console.log('chatlist', chatlist);
    let path = `users/${id}/chats`;
    let chatData = null;
    for (let index = 0; index < chatlist.length; index++) {
      try {
        if (chatlist[index].detail.matchID == val.user) {
          chatData = chatlist[index];
          break;
        }
      } catch (err) {
        console.log('no previous chat found');
        break;
      }
    }

    if (chatData == null) {
      chatData = data;

      try {
        await firestore()
          .collection(path)
          .add(data)
          .then((docRef) => {
            chatData = {chatID: docRef.id, detail: data};
            // this.createMatchChat(docRef.id, id, val.user, this.userImage);
          });
      } catch (e) {
        console.log('error while adding new chat ', e);
      }
    }

    return chatData;
  }
  // async createMatchChat(chatID, userID, matchID, userImage) {
  //   try {
  //     var secondaryUserMessage = {
  //       message: `${this.userName} added you on chat`,
  //       messageType: 'text',
  //       dateTime: Date(),
  //       matchID: matchID,
  //       timestamp: Number(moment().format('X')),
  //       unReadMessagesCount: 1,
  //       secondaryUser: {
  //         userID: this.userID,
  //         userName: this.userName,
  //         userImage: userImage,
  //       },
  //     };

  //     let path = `users/${userID}/chats/${chatID}`;
  //     await firestore().doc(path).set(secondaryUserMessage, { merge: true });
  //   } catch (e) {
  //     console.log('error chat ', e);
  //   }
  // }

  async blockUser(secondaryUser, chatID) {
    const secondaryUserMessage = {
      message: 'you are block',
      messageType: 'block',
      id: this.userID,
      dateTime: Date(),
      timestamp: Number(moment().format('X')),
      secondaryUser: {
        userID: this.userID,
        userName: this.name,
      },
    };
    try {
      let path = `users/${secondaryUser}/chats/${chatID}`;
      await firestore().doc(path).set(secondaryUserMessage, {merge: true});
    } catch (e) {
      console.log('error while user block', e);
    }
  }
  async getChatList(userId) {
    let path = `users/${this.userID}/chats`;
    console.log('getChatList path', path);
    const snapshot = await firestore().collection(path).get();
    console.log('getChatList snapshot', snapshot);
    const chats = [];
    for (let index = 0; index < snapshot.docs.length; index++) {
      try {
        const docSS = snapshot.docs[index];
        const chat = {
          chatID: docSS.id,
          detail: docSS._data,
        };
        chats.push(chat);
      } catch (err) {
        console.log(err);
      }
    }
    return chats;
  }

  subscribe = (callback) => {
    let path = `users/${this.id}/chats`;
    this.unSub = firestore()
      .collection(path)
      .onSnapshot((snapshot) => callback());
  };

  off() {
    this.unSub();
  }
}
