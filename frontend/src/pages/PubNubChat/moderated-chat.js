import React, { useState, useEffect, useCallback, useRef } from 'react';
import { usePubNub } from 'pubnub-react';
import PubNub from 'pubnub';
import HomeLayout from '../../layout/HomeLayout';
import ChatInputWrapper from './ChatComponents/ChatInputWrapper';
import ChatHeader from './ChatComponents/ChatHeader';
// import avatarImg from '../../assets/images/avatar.svg';
import moment from 'moment';
import closeIcon from '../../assets/images/close-icon.svg';
import chatToggleIcon from '../../assets/images/toggle.svg';
import { useReactMediaRecorder } from 'react-media-recorder';
import { publishKey, subscribeKey } from '../../config/app';
import {
  Chat,
  MemberList,
  useChannelMembers,
  useChannels,
  usePresence,
  useUser,
  useUserMemberships,
  useUsers,
} from '@pubnub/react-chat-components';
import { CreateChatModal } from './components/create-chat-modal';
import { ReportUserModal } from './components/report-user-modal';
import { PublicChannelsModal } from './components/public-channels-modal';
import './moderated-chat.scss';
import { connect } from 'react-redux';
import ChatSideBar from './ChatComponents/ChatSideBar';
import ChatWrapper from './ChatComponents/ChatWrapper';
import Search from '../../components/searchFeild';
import ChatMessageModal from './components/ChatModals/index';
import { useStore } from './Store';
import { getAllUsersData, getPubnubChannel, setDirectUser, setGroupUsers } from './redux/action';
import { removePubnubUser } from './redux/action';
import {
  cloneArray,
  fetchChannels,
  listener,
  loadHistory,
  makeChannelsList,
  removePubnubChannel,
  sendMessage,
  setChannelMembers,
} from '../../utils/utils';
import { Spinner } from 'reactstrap';
import { toast } from 'react-hot-toast';
// import downArrow from '../../assets/images/down-icon.svg';
import addIcon from '../../assets/images/add-icon.svg';
import { searchListShow } from './redux/action';
import { history } from '../../reduxStore/store';
import { Images } from '../../theme/Images';
const defaultChannel = {
  id: 'default',
  name: 'Default Channel',
  description: 'This is the default channel',
};

const ModeratedChat = (props) => {
  const pubnub = usePubNub();
  const {
    getAllUsersData,
    // allUsersdata,
    alldata,
    loginInfo,
    groupUsers,
    getPubnubChannel,
    allChannelsData,
    removePubnubUser,
    searchListShow,
    setDirectUser,
    requesting
  } = props;
  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({ video: false });
  const { state, dispatch } = useStore();
  const [theme, setTheme] = useState('light');
  const [currentChannel, setCurrentChannel] = useState(defaultChannel);
  const [showMembers, setShowMembers] = useState(false);
  const [showChannels, setShowChannels] = useState(true);
  const [showPublicChannelsModal, setShowPublicChannelsModal] = useState(false);
  const [showCreateChatModal, setShowCreateChatModal] = useState(false);
  const [showReportUserModal, setShowReportUserModal] = useState(false);
  const [channelsFilter, setChannelsFilter] = useState('');
  const [membersFilter, setMembersFilter] = useState('');
  const [newChatModal, setNewChatModal] = useState(false);
  const [showGroupChat, setShowGroupChat] = useState(false);
  const [reportedMessage, setReportedMessage] = useState('');
  const [inputMessage, setInputMessage] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bootstrapLoading, setBootstrapLoading] = useState(false);

  const [selectedChat, setSelectedChat] = useState(false);
  const [allChatMessages, setAllChatMessages] = useState([]);
  const [allChannel, setAllChannel] = useState(false);
  const [BEChatChannel, setBEChatChannel] = useState(false);
  const [fileUpload, setFileUpload] = useState(false);
  const [multiFileUpload, setMultiFileUpload] = useState([]);
  const [chatFileName, setChatFileName] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [chatChannels, setChatChannels] = useState([]);
  const [multiFiles, setMultiFiles] = useState([]);

  const [emojiValue, setEmojiValue] = useState(false);
  const [voiceRecoording, setVoiceRecording] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [voiceBlob, setVoiceBlob] = useState(false);
  const [mediaUrl, setMediaUrl] = useState([]);

  const [isRequesting, setIsRequesting] = useState(false);
  const [showFixedSidebar, setShowFixedSidebar] = useState(false);
  const [createBtnClass, setCreateBtnClass] = useState("")


  const [showOption, setShowOption] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  const [selectChat, setSelectChat] = useState(false);
  const [checkSingleBtn, setCheckSingleBtn] = useState(false);
  const [pageRoute, setPageRoute] = useState('')
  const [directChannel, setDirectChannel] = useState([])
  const [groupChannel, setGroupChannel] = useState([])
  const [messages, setMessages] = useState(
    state.messages[selectedChat?.id] || [],
  );
  const [chatBoxMessages, setChatBoxMessages] = useState([
    {
      text: 'You has joined the conversation',
      type: 'notification',
    },
    {
      author: {
        username: 'user1',
        id: 1,
        avatarUrl: '',
      },
      text: 'https://png.pngtree.com/png-vector/20220430/ourmid/pngtree-smiling-people-avatar-set-different-men-and-women-characters-collection-png-image_4526743.png',
      type: 'text',
      timestamp: 1578366393250,
    },
  ]);


  useEffect(() => {
    if (history.location.pathname == '/admin/group_chat') {
      setPageRoute('group')
    } else if (history.location.pathname == '/admin/messages') {
      setPageRoute('direct')
    }
  }, [])

  useEffect(() => {
    if (fileUpload) {
      setInputMessage(fileUpload?.target?.files[0]?.name);
    }
  }, [fileUpload]);


  useEffect(() => {
    if (mediaBlobUrl) {
      setInputMessage('audio.wav');
      setVoiceBlob(mediaBlobUrl);
    }
  }, [mediaBlobUrl]);

  const convertUrl = async (item) => {
    const response = await fetch(item);
    const data = await response.blob();
    var file = new File([data], 'audio.wav', { type: 'audio/wav' });
    pubnub
      .sendFile({
        channel: `${selectedChat.id}`,
        file: file,
      })
      .then((res) => {
        setInputMessage('');
        getmessages(selectedChat);
        setVoiceBlob(false);
        setIsRequesting(false);
      })
      .catch(() => {
        setInputMessage('');
        getmessages(selectedChat);
        setVoiceBlob(false);
        setIsRequesting(false);
      });
  };

  useEffect(() => {
    getAllUsersData('');
    bootstrap();
    getPubnubChannel({ owner: '', group: '' });
  }, []);

  const onEmojiClick = (event, emojiObject) => {
    setInputMessage((prevInput) => prevInput + event.emoji);
  };


  useEffect(() => {
    let dummyUrl = [];
    if (allChatMessages) {
      allChatMessages.map((item) => {
        if (item.messageType == 4) {
          const url = pubnub.getFileUrl({
            channel: `${selectedChat.id}`,
            id: `${item.message.file.id}`,
            name: `${item.message.file.name}`,
          });
          if (
            item.message.file.name.includes('.png') ||
            item.message.file.name.includes('.jpg') ||
            item.message.file.name.includes('.jpeg')
          ) {
            dummyUrl.push({
              channel: `${selectedChat.id}`,
              message: {
                createdAt: '2023-01-03T15:45:22.090Z',
                id: `${item.message.file.id}`,
                name: `${item.message.file.name}`,
                text: `${url}`,
                type: 'default',
                image:
                  'https://idronline.org/wp-content/uploads/2021/01/Screen-Shot-2019-02-19-at-1.23.40-PM-300x300-3.jpg',
              },
              messageType: 'image',
              timetoken: `${item.timetoken}`,
              uuid: `${item.uuid}`,
            });
          }
          if (
            item.message.file.name.includes('.mp4') ||
            item.message.file.name.includes('.mov') ||
            item.message.file.name.includes('.wmv') ||
            item.message.file.name.includes('.flv') ||
            item.message.file.name.includes('.avi') ||
            item.message.file.name.includes('.mkv')
          ) {
            dummyUrl.push({
              channel: `${selectedChat.id}`,
              message: {
                createdAt: '2023-01-03T15:45:22.090Z',
                id: `${item.message.file.id}`,
                name: `${item.message.file.name}`,
                text: `${url}`,
                type: 'default',
                image:
                  'https://idronline.org/wp-content/uploads/2021/01/Screen-Shot-2019-02-19-at-1.23.40-PM-300x300-3.jpg',
              },
              messageType: 'video',
              timetoken: `${item.timetoken}`,
              uuid: `${item.uuid}`,
            });
          }
          if (
            item.message.file.name.includes('.mp3') ||
            item.message.file.name.includes('.wav')
          ) {
            dummyUrl.push({
              channel: `${selectedChat.id}`,
              message: {
                createdAt: '2023-01-03T15:45:22.090Z',
                id: `${item.message.file.id}`,
                name: `${item.message.file.name}`,
                text: `${url}`,
                type: 'default',
                image:
                  'https://idronline.org/wp-content/uploads/2021/01/Screen-Shot-2019-02-19-at-1.23.40-PM-300x300-3.jpg',
              },
              messageType: 'audio',
              timetoken: `${item.timetoken}`,
              uuid: `${item.uuid}`,
            });
          }
          if (
            item.message.file.name.includes('.pdf') ||
            item.message.file.name.includes('.xls') ||
            item.message.file.name.includes('.xlsx') ||
            item.message.file.name.includes('.doc') ||
            item.message.file.name.includes('.odt') ||
            item.message.file.name.includes('.ods') ||
            item.message.file.name.includes('.zip') ||
            item.message.file.name.includes('.docx')
          ) {
            dummyUrl.push({
              channel: `${selectedChat.id}`,
              message: {
                createdAt: '2023-01-03T15:45:22.090Z',
                id: `${item.message.file.id}`,
                name: `${item.message.file.name}`,
                text: `${url}`,
                type: 'default',
                image:
                  'https://idronline.org/wp-content/uploads/2021/01/Screen-Shot-2019-02-19-at-1.23.40-PM-300x300-3.jpg',
              },
              messageType: 'file',
              timetoken: `${item.timetoken}`,
              uuid: `${item.uuid}`,
            });
          }
        } else {
          dummyUrl.push(item);
        }
      });
      setMediaUrl(dummyUrl);
    }
  }, [allChatMessages]);

  const pubnubKeys = {
    publishKey,
    subscribeKey,
  };
  const client = new PubNub({
    ...pubnubKeys,
    userId: `${loginInfo.id}`,
    fileUploadPublishRetryLimit: 0,
  });

  const bootstrap = () => {
    setLoading(true);
    fetchChannels(pubnub, loginInfo.id).then((channels) => {
      const IDS = Object.entries(channels).map((item) => item[1].receiver);
      const subIDs = IDS.concat(String(loginInfo.id));
      client.addListener(listener(state, dispatch));
      client.subscribe({
        channelGroups: subIDs,
        withPresence: true,
      });
      const chnls = makeChannelsList(channels);
      setAllChannel(chnls[1]);
      dispatch({ channels });
      setLoading(false);
    });
  };

  const handleTooltip = () => {
    setShowOption(false);
  };

  const uuid = pubnub.getUUID();
  const [currentUser] = useUser({ uuid });
  const [allUsers] = useUsers({ include: { customFields: true } });
  const [allChannels] = useChannels({ include: { customFields: true } });
  const [joinedChannels, , refetchJoinedChannels] = useUserMemberships({
    include: { channelFields: true, customChannelFields: true },
  });
  const [channelMembers, , refetchChannelMemberships, totalChannelMembers] =
    useChannelMembers({
      channel: currentChannel.id,
      include: { customUUIDFields: true },
    });
  const [presenceData] = usePresence({
    channels: joinedChannels.length
      ? joinedChannels.map((c) => c.id)
      : [currentChannel.id],
  });

  const getmessages = (item) => {
    setSelectedChat(item);
    setShowOption(false);
    pubnub.fetchMessages(
      {
        channels: [item.id],
        includeMessageActions: true,
        includeMessageType: true,
      },
      (_, response) => {
        if (response) {
          setAllChatMessages(
            response?.channels?.[item.id] ? response.channels[item.id] : [],
          );
          const messages = response.channels[item.id].map((obj) => obj.message);
          state.messages[item.id] = loadHistory(messages);
          dispatch({ messages: state.messages });
        }
      },
    );
  };

  function generateUUID() {
    var d = new Date().getTime(); //Timestamp
    var d2 =
      (typeof performance !== 'undefined' &&
        performance.now &&
        performance.now() * 1000) ||
      0;
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        var r = Math.random() * 16; //random number between 0 and 16
        if (d > 0) {
          //Use timestamp until depleted
          r = (d + r) % 16 | 0;
          d = Math.floor(d / 16);
        } else {
          //Use microseconds since page-load if supported
          r = (d2 + r) % 16 | 0;
          d2 = Math.floor(d2 / 16);
        }
        return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
      },
    );
  }

  const handleEnterKey = (e) => {
    if (e.key === 'Enter') {
      onSend();
    }
  };

  const onSend = async (message) => {
    scrollToBottom();
    setIsRequesting(true);
    // bootstrap()
    if (fileUpload) {
      pubnub
        .sendFile({
          channel: `${selectedChat.id}`,
          file: fileUpload?.target?.files[0],
        })
        .then((res) => {
          setFileUpload(false);
          getmessages(selectedChat);
          setInputMessage('');
          setIsRequesting(false);
        })
        .catch((e) => {
          setFileUpload(false);
          getmessages(selectedChat);
          setInputMessage('');
          setIsRequesting(false);
        });
    } else if (multiFiles.length > 0) {
      multiFiles.map((item) => {
        pubnub
          .sendFile({
            channel: `${selectedChat.id}`,
            file: item,
          })
          .then((res) => {
            setFileUpload(false);
            getmessages(selectedChat);
            setMultiFiles([]);
            setIsRequesting(false);
          })
          .catch((e) => {
            setFileUpload(false);
            getmessages(selectedChat);
            setMultiFiles([]);
            setIsRequesting(false);
          });
      });
    } else {
      if (voiceBlob) {
        convertUrl(voiceBlob);
      } else {
        if (inputMessage) {
          generateUUID();
          const newMessage = [
            {
              createdAt: +new Date(),
              id: `${generateUUID()}`,
              text: inputMessage,
              type: 'default',
              image: `${loginInfo.profile_picture
                ? loginInfo.profile_picture
                : 'https://idronline.org/wp-content/uploads/2021/01/Screen-Shot-2019-02-19-at-1.23.40-PM-300x300-3.jpg'
                }`,
              name: `${loginInfo.name}`
            },
          ];

          const tmpMessages = cloneArray(newMessage);
          tmpMessages.push({
            text: newMessage[0].text,
            pending: true,
            user: loginInfo,
          });
          setMessages(tmpMessages);
          sendMessage(pubnub, selectedChat.id, newMessage[0])
            .then((res) => {
              // getmessages(selectedChat)
              setTimeout(() => {
                getmessages(selectedChat);
              }, 1000);
              setIsRequesting(false);
              setInputMessage('');
            })
            .catch(() => {
              getmessages(selectedChat);
              setInputMessage('');
              setIsRequesting(false);
            });
        } else {
          setIsRequesting(false);
        }
      }
    }
  };


  useEffect(() => {
    if (chatChannels) {
      let chatId = chatChannels && chatChannels.find((item => item.id == selectedChat.id))
      console.log("chatId", chatId);

      if (!chatId) {
        setSelectedChat(false)
        setMediaUrl([])
      }
    }
  }, [chatChannels])

  // console.log('chatChannel', chatChannels);
  // console.log('selectedChat', selectedChat);
  // console.log('chatIds', chatId);

  useEffect(() => {
    setInterval(() => {
      bootstrap()
      // if (!chatId) {
      //   setSelectedChat(false)
      // }
    }, 3000)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      if (selectedChat) {
        getmessages(selectedChat);
        scrollToBottom();
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [selectedChat]);

  const presentUUIDs = presenceData[currentChannel.id]?.occupants?.map(
    (o) => o.uuid,
  );

  const groupChannels = joinedChannels.filter(
    (c) =>
      c.id?.startsWith('space.') &&
      c.name?.toLowerCase().includes(channelsFilter.toLowerCase()),
  );
  const groupChannelsToJoin = allChannels.filter(
    (c) =>
      c.id.startsWith('space.') && !joinedChannels.some((b) => c.id === b.id),
  );
  const directChannels = joinedChannels
    .filter((c) => c.id?.startsWith('direct.') || c.id?.startsWith('group.'))
    .map((c) => {
      if (!c.id?.startsWith('direct.')) return c;
      const interlocutorId = c.id
        .replace(uuid, '')
        .replace('direct.', '')
        .replace('@', '');
      const interlocutor = allUsers.find((u) => u.id === interlocutorId);
      if (interlocutor) {
        c.custom = { profileUrl: interlocutor.profileUrl || '' };
        c.name = interlocutor.name;
      }
      return c;
    })
    .filter((c) =>
      c.name?.toLowerCase().includes(channelsFilter.toLowerCase()),
    );

  const isUserBanned = currentUser?.custom?.ban;
  const isUserMuted = currentUser?.custom?.mutedChannels
    ?.split(',')
    .includes(currentChannel.id);
  const isUserBlocked = currentUser?.custom?.blockedChannels
    ?.split(',')
    .includes(currentChannel.id);

  const leaveChannel = async (channel, event) => {
    event.stopPropagation();
    await pubnub.objects.removeMemberships({ channels: [channel.id] });
    setAnotherCurrentChannel(channel.id);
  };

  const refreshMemberships = useCallback(
    (event) => {
      if (event.channel.startsWith('user_')) refetchJoinedChannels();
      if (event.channel === currentChannel.id) refetchChannelMemberships();
    },
    [currentChannel, refetchJoinedChannels, refetchChannelMemberships],
  );

  const setAnotherCurrentChannel = (channelId) => {
    if (currentChannel.id === channelId) {
      const newCurrentChannel = joinedChannels?.find(
        (ch) => ch.id !== channelId,
      );
      if (newCurrentChannel) setCurrentChannel(newCurrentChannel);
    }
  };

  const handleError = (e) => {
    if (
      (e.status?.operation === 'PNPublishOperation' &&
        e.status?.statusCode === 403) ||
      e.message.startsWith('Publish failed')
    ) {
      alert(
        'Your message was blocked. Perhaps you tried to use offensive language or send an image that contains nudity?',
      );
    }

    console.warn(e);
  };

  useEffect(() => {
    if (currentChannel.id === 'default' && joinedChannels.length)
      setCurrentChannel(joinedChannels[0]);
  }, [currentChannel, joinedChannels]);

  const handleFileDownload = async (item) => {
    const url = pubnub.getFileUrl({
      channel: `${selectedChat.id}`,
      id: `${item.message.id}`,
      name: `${item.message.name}`,
    });
    window.open(`${url}`, '_blank', 'noreferrer');
  };

  const handleSearchChannel = (item) => {
    setTimeout(() => {
      if (item) {
        const filter_array =
          chatChannels.length > 0 &&
          chatChannels.filter((q) => {
            if (q.chat_creation == 'user') {
              if (loginInfo.name == q.group_name) {
                return (
                  q.owner_name.toLowerCase().indexOf(item.toLowerCase()) > -1
                );
              } else {
                return (
                  q.group_name.toLowerCase().indexOf(item.toLowerCase()) > -1
                );
              }
            } else {
              return (
                q.group_name.toLowerCase().indexOf(item.toLowerCase()) > -1
              );
            }
          });
        setChatChannels(filter_array);
        if (filter_array) {
          setBootstrapLoading(false);
        }
      } else {
        getPubnubChannel({ owner: '', group: '' });
      }
    }, 1000);
  };

  const dev = document.getElementById('userDev');
  const containerRef = useRef(dev);

  const scrollToBottom = () => {
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  };

  const hideBtn = () => {
    scrollToBottom();
    setShowBtn(false);
  };

  useEffect(() => {
    if (selectedChat) {
      scrollToBottom();
    }
  }, [selectedChat]);

  useEffect(() => {
    const tem1 = []
    const tem2 = []
    // setDirectChannel([])
    // setGroupChannel([])
    if (allChannel) {
      setChatChannels(allChannel.data);
      setDirectChannel(allChannel.data.filter((item) => item.custom.direct == 'true'))
      setGroupChannel(allChannel.data.filter((item) => item.custom.direct == 'false'))
    }
  }, [allChannel]);



  useEffect(() => {
    BEChatChannel && setCheckSingleBtn(BEChatChannel.chat_creation == 'group');
  }, [BEChatChannel]);

  const removeUserHeader = () => {
    setTimeout(() => {
      setSelectedChat(false);
      setFileUpload(false);
    }, 500);
  };

  const onAddChannelMember = async () => {
    let allUsersIds = groupUsers.map((item) => parseInt(item.eTag));
    let selectUsers = groupUsers.map((item) => item.eTag);
    if (selectUsers) {
      pubnub.objects
        .setChannelMembers({
          channel: `${selectedChat.id}`,
          uuids: selectUsers,
        })
        .then((res) => {
          removePubnubUser({
            data: {
              check: true,
              user_id: allUsersIds,
            },
            id: BEChatChannel?.id,
          });
        })
        .catch((err) => console.log('setChannelMembers err', err));
    }
  };

  const handleRemoveFile = (i) => {
    const newFile = multiFiles.filter((val, index) => index !== i);
    setMultiFiles(newFile);
  };

  const handleFileUpload = (file) => {
    console.log('file', file);
    if (file?.target?.files[0].size > 5 * 1024 * 1024) {
      toast.error("File size exceeds 5mb ", {
        id: "card fields"
      })
    } else {
      setMultiFiles([file?.target?.files[0]]);
    }
  };

  const onMediaUpload = (e) => {
    setMultiFiles([...multiFiles, e?.target?.files[0]]);
    setMultiFileUpload([...multiFileUpload, e?.target?.files[0]?.name]);
  };

  const handleChatClick = (item) => {
    setSelectChat(item?.id);
    const data = {
      id: item.id,
    };
    setBEChatChannel(item);
    getmessages(data);
    setSelectedChat(data);
    setShowFixedSidebar(false);
    // bootstrap()
  };

  const newChatBtn = () => {
    setShowOption(false);
    setNewChatModal(true);
    setDirectUser(false);
    searchListShow(false);
    setCheckSingleBtn(false);
    setSelectChat(false);
    setSelectedChat(false);
    setCreateBtnClass('')
  };

  const openGroupModal = () => {
    setShowOption(false);
    setNewChatModal(true)
    setShowGroupChat(true);
    setDirectUser(false);
    searchListShow(false);
    setSelectChat(false);
    setSelectedChat(false);
    setGroupUsers(false)
    setCreateBtnClass('')
  };

  const handleLeaveGroup = () => {
    setCreateBtnClass('')
    removePubnubChannel(pubnub, loginInfo.id, selectedChat.id)
      .then(res => {
        // if (ChatChannel.chat_creation == "user") {
        //   deletePubnubChannel(ChatChannel?.id)
        // } else {
        //   removePubnubUser({
        //     data: {
        //       check: false,
        //       user_id: [loginInfo.user.id]
        //     },
        //     id: ChatChannel?.id
        //   })
        // }
        setMediaUrl([])
        setSelectedChat(false)
        bootstrap()
        // chatScreenData([])
      })
      .catch(err => console.log("remove error", err))
  }



  function formatTime(time) {
    let timeString = moment(time).format('h:mm a');
    let dateDiff = moment().startOf('day').diff(moment(time).startOf('day'), 'days');
    let dateString;

    switch (dateDiff) {
      case 0:
        dateString = 'Today';
        break;
      case 1:
        dateString = 'Yesterday';
        break;
      default:
        dateString = Math.abs(dateDiff) + ' days ago';
        break;
    }

    return dateString + ' - ' + timeString;
  }

  const timeStamp = "14966804541029440"
  const formattedTime = moment(parseInt(timeStamp / 1000)).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');

  const stamp = formatTime(formattedTime)

  useEffect(() => {

  }, [])

  return (
    // <HomeLayout
    //   headerName="Chat"
    //   showBack={false}
    //   showChatButton={true}
    //   onClick={newChatBtn}>
    //   <div className="chat-wrapper-section">
    <div className={`app-moderated app-moderated--${theme}`}>
      <Chat
        theme={theme}
        users={allUsers}
        currentChannel={currentChannel.id}
        channels={[...joinedChannels.map((c) => c.id), uuid]}
        onError={handleError}
        onMembership={(e) => refreshMemberships(e)}>
        {showPublicChannelsModal && (
          <PublicChannelsModal
            {...{
              groupChannelsToJoin,
              hideModal: () => setShowPublicChannelsModal(false),
              setCurrentChannel,
            }}
          />
        )}
        {showCreateChatModal && (
          <CreateChatModal
            {...{
              currentUser,
              hideModal: () => setShowCreateChatModal(false),
              setCurrentChannel,
              users: allUsers.filter((u) => u.id !== uuid),
            }}
          />
        )}
        {showReportUserModal && (
          <ReportUserModal
            {...{
              currentUser,
              reportedMessage,
              hideModal: () => setShowReportUserModal(false),
              users: allUsers,
            }}
          />
        )}
        {isUserBanned ? (
          <strong className="error">
            Unfortunately, you were banned from the chat.
          </strong>
        ) : (
          <>
            <div
              className={`channels-panel ${showChannels && 'shown'}`}
              onClick={() => {
                setShowOption(false);
                setVoiceRecording(false);
              }}>
              <ChatSideBar
                className={`${showFixedSidebar ? 'fixed-chat-sidebar' : ''
                  }`}>
                <div
                  className="chat-toggle"
                  onClick={() => setShowFixedSidebar(true)}>
                  <img src={chatToggleIcon} alt="" />
                </div>
                <div
                  className="close-icon"
                  onClick={() => setShowFixedSidebar(false)}>
                  <img src={closeIcon} alt="" />
                </div>
                {/* <Search
                  placeholder="Enter Name to Search"
                  onChange={(e) => handleSearchChannel(e.target.value)}
                  channelSearch={true}
                  disabledField={allChannel ? false : true}
                /> */}

                <div className="add flex-justify-between">
                  <p className="mb-0">
                    {pageRoute == 'direct'
                      ? 'Direct Messages' :
                      pageRoute == 'group'
                      && 'Group Chat'}
                  </p>
                  <img src={addIcon} onClick={() => {
                    pageRoute == 'direct'
                      ? newChatBtn() :
                      pageRoute == 'group'
                      && openGroupModal()
                  }
                  } alt="" />
                </div>

                {chatChannels ? (
                  chatChannels.length == 0 ? (
                    <p
                      className="no-channel"
                      style={{
                        textAlign: 'center',
                      }}>
                      No channels found
                    </p>
                  ) : (
                    pageRoute == 'direct' ?
                      <div className="channel-list-wrapper">
                        {directChannel && directChannel.length === 0 ?
                          <p
                            className="no-channel"
                            style={{
                              textAlign: 'center',
                            }}>
                            No channels found
                          </p> :
                          directChannel.map((item) => (
                            <div className="channel-lists">
                              {item.id.includes(
                                loginInfo.id,
                              ) && (
                                  <div
                                    className={`channel-list-item ${selectChat == item.id
                                      ? 'selected-chat'
                                      : ''
                                      }`}
                                    onClick={() => {
                                      {
                                        handleChatClick(item);
                                        searchListShow(false);
                                      }
                                    }}>
                                    <div className="delete-user">
                                      <div className={`image-wrapper ${selectChat == item.id ? '' : 'no-pointer'}`}
                                        onClick={() => handleLeaveGroup()}
                                      >
                                        <img src={Images.deleteIcon} alt="" />
                                      </div>
                                    </div>
                                    <div className="list-details">
                                      <div className="img-wrapper">
                                        <img
                                          src={
                                            item.custom.image
                                              ? item.custom.image
                                              : 'https://png.pngtree.com/png-vector/20220430/ourmid/pngtree-smiling-people-avatar-set-different-men-and-women-characters-collection-png-image_4526743.png'
                                          }
                                        />
                                      </div>
                                      <div className={'list-item-details'}>
                                        <h3
                                          title={
                                            item.custom.direct == 'true'
                                              ? loginInfo.name ==
                                                item.name
                                                ? item.custom.owner
                                                : item.name
                                              : item.name
                                          }>
                                          {
                                            item.custom.direct == 'true'
                                              ? loginInfo.name ==
                                                item.name
                                                ? item.custom.owner
                                                : item.name
                                              : item.name
                                          }
                                        </h3>
                                        <p>Click here to start chat</p>
                                      </div>
                                    </div>
                                    <div className="updated-time">
                                      {/* {item.updated} */}
                                      {moment(item.updated)
                                        // .startOf("hour")
                                        .fromNow()}
                                    </div>
                                  </div>
                                )}
                            </div>
                          ))}
                      </div>
                      : pageRoute == 'group' &&
                      <div className="channel-list-wrapper">
                        {groupChannel &&
                          groupChannel.length === 0 ?
                          <p
                            className="no-channel"
                            style={{
                              textAlign: 'center',
                            }}>
                            No channels found
                          </p> :
                          groupChannel.map((item) => (
                            <div className="channel-lists">
                              {item.id.includes(
                                loginInfo.id,
                              ) && (
                                  <div
                                    className={`channel-list-item ${selectChat == item.id
                                      ? 'selected-chat'
                                      : ''
                                      }`}
                                    onClick={() => {
                                      {
                                        handleChatClick(item);
                                        searchListShow(false);
                                      }
                                    }}>
                                    <div className="delete-user">
                                      <div className="image-wrapper"
                                        onClick={() => handleLeaveGroup()}
                                      >
                                        <img src={Images.deleteIcon} alt="" />
                                      </div>
                                    </div>
                                    <div className="list-details">
                                      <div className="img-wrapper">
                                        <img
                                          src={
                                            item.custom.image
                                              ? item.custom.image
                                              : 'https://png.pngtree.com/png-vector/20220430/ourmid/pngtree-smiling-people-avatar-set-different-men-and-women-characters-collection-png-image_4526743.png'
                                          }
                                        />
                                      </div>
                                      <div className={'list-item-details'}>
                                        <h3
                                          title={
                                            item.custom.direct == 'true'
                                              ? loginInfo.name ==
                                                item.name
                                                ? item.custom.owner
                                                : item.name
                                              : item.name
                                          }>
                                          {
                                            item.custom.direct == 'true'
                                              ? loginInfo.name ==
                                                item.name
                                                ? item.custom.owner
                                                : item.name
                                              : item.name
                                          }
                                        </h3>
                                        <p>Click here to start chat</p>
                                      </div>
                                    </div>
                                    <div className="updated-time">
                                      {/* {item.updated} */}
                                      {moment(item.updated)
                                        // .startOf("hour")
                                        .fromNow()}
                                    </div>
                                  </div>
                                )}
                            </div>
                          ))}
                      </div>
                  )
                ) : (
                  <div
                    className="no-chat"
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '80%',
                      fontWeight: 'bold',
                      fontSize: '22px',
                    }}>
                    No Chat
                  </div>
                )}
              </ChatSideBar>
            </div>
            <ChatWrapper>
              {/* <ChatHeader
                pubnub={pubnub}
                userChannel={selectedChat}
                currentUserId={loginInfo.id}
                getChannelsFunc={bootstrap}
                chatScreenData={setMediaUrl}
                isSearchChat={checkSingleBtn}
                loginInfo={loginInfo}
                disabledAction={selectedChat ? false : true}
                showOption={showOption}
                setShowOption={setShowOption}
                senderHeader={selectedChat}
                setSenderHeader={removeUserHeader}
                onAddButtonClick={onAddChannelMember}
                ChatChannel={BEChatChannel}>
                {currentChannel.name || currentChannel.id}
                {!isUserBlocked && (
                  <i className="material-icons-outlined"></i>
                )}
              </ChatHeader> */}
              <div
                className="chat-window"
                onClick={() => {
                  setShowOption(false);
                  setVoiceRecording(false);
                }}>
                {isUserBlocked ? (
                  <strong className="error">
                    Unfortunately, you were blocked from this channel.
                  </strong>
                ) : (
                  <div className="chat-window-wrapper" ref={containerRef}>
                    {mediaUrl.length > 0 && selectChat ? (
                      mediaUrl.map((item) => {
                        return (
                          <>
                            <div
                              className={`message-item 
                              ${(item.uuid == loginInfo.id) ? 'own-message-item' : ""}  
                              ${(item.messageType === 'video' || item.messageType === 'image')
                                  ? 'show-time'
                                  : ''
                                }
                                `
                              }>
                              <div className="message-info-wrapper">
                                <div className="img">
                                  <img
                                    src={
                                      item.message.image
                                        ? item.message.image
                                        : 'https://png.pngtree.com/png-vector/20220430/ourmid/pngtree-smiling-people-avatar-set-different-men-and-women-characters-collection-png-image_4526743.png'
                                    }
                                    alt=""
                                  />
                                  {/* <div className="time">
                                    {moment(item.message.createdAt).format(
                                      'h:mm a',
                                    )}
                                  </div> */}
                                </div>
                                {(item.messageType == 'video' || item.messageType == 'image') &&
                                  <div className="time">
                                    {moment(item.message.createdAt).format(
                                      'h:mm a',
                                    )}
                                  </div>
                                }
                              </div>
                              {item.messageType == 'file' ? (
                                <div
                                  className="message-item-bubble"
                                  style={{
                                    backgroundColor: `${item.uuid == `${loginInfo.id}`
                                      ? '#FFFFFF'
                                      : '#f7f7f7'
                                      }`,
                                  }}>
                                  <div className="wrapper"
                                    style={{
                                      width: 'fit-content',
                                      display: 'flex',
                                      justifyContent: 'space-between',
                                      alignItems: 'center',
                                    }}
                                  >
                                    <p style={{ margin: '0px 20px 0px 0px' }}>
                                      {item?.message?.name}
                                    </p>
                                    <img
                                      onClick={() => handleFileDownload(item)}
                                      src="https://static.thenounproject.com/png/1030575-200.png"
                                      style={{
                                        height: '30px',
                                        width: '30px',
                                      }}
                                    />
                                  </div>
                                </div>
                              ) : item.messageType == 'video' ? (
                                <div className="message-item-audio">
                                  <video
                                    src={`${item.message.text}`}
                                    controls
                                    style={{
                                      height: 'auto',
                                      width: '100%',
                                    }}
                                  />
                                </div>
                              ) : item.messageType == 'audio' ? (
                                <div className="message-item-audio">
                                  <audio
                                    src={`${item.message.text}`}
                                    controls
                                  />
                                </div>
                              ) : item.messageType == 'image' ? (
                                <img
                                  src={item?.message?.text}
                                  style={{
                                    height: 'auto',
                                    width: '100%',
                                    maxHeight: '300px',
                                    borderRadius: '12px',
                                    marginTop: 10,
                                    objectFit: 'contain'
                                  }}
                                />
                              ) : (
                                item.messageType == null && (
                                  <div
                                    className="message-item-bubble"
                                    style={{
                                      backgroundColor: `${item.uuid == `${loginInfo.id}`
                                        ? '#FFFFFF'
                                        : '#f7f7f7'
                                        }`,
                                      width: 'fit-content',
                                    }}>
                                    {pageRoute == 'direct' ?
                                      loginInfo.name !== item.message.name ?
                                        <p className='name'>
                                          {item.message.name}
                                        </p> :
                                        loginInfo.name !== item.message.name &&
                                        <p className='name'>
                                          {BEChatChannel.name}
                                        </p>
                                      : ''
                                    }
                                    {pageRoute == 'group' ?
                                      loginInfo.name !== item.message.name ?
                                        <p className='name'>
                                          {item.message.name}
                                        </p> :
                                        loginInfo.name !== BEChatChannel.custom.owner &&
                                        <p className='name'>
                                          {BEChatChannel.custom.owner}
                                        </p>
                                      : ''
                                    }

                                    <p className="text mb-0">
                                      {item?.message?.text}
                                    </p>
                                    <div className="time">
                                      {/* {moment(item.message.createdAt).format(
                                        'h:mm a',
                                      )} */}
                                      {formatTime(item.message.createdAt)}
                                    </div>
                                  </div>
                                )
                              )}
                            </div>
                          </>
                        );
                      })
                    ) : (
                      <p className="create-chat">
                        {pageRoute == 'direct'
                          ?
                          'Hi, Create new chat OR Select a chat'
                          : pageRoute == 'group' &&
                          'Hi, Create new group OR Select a group'
                        }
                      </p>
                    )}
                  </div>
                )}
              </div>
              <ChatInputWrapper
                setFileUpload={(e) => {
                  handleFileUpload(e);
                }}
                onSend={() => onSend()}
                onEmojiClick={onEmojiClick}
                emojiValue={emojiValue}
                setInputMessage={setInputMessage}
                inputMessage={inputMessage}
                setShowEmojiPicker={setShowEmojiPicker}
                showEmojiPicker={showEmojiPicker}
                onMicClick={setVoiceRecording}
                isRecording={voiceRecoording}
                status={status}
                startRecording={startRecording}
                stopRecording={stopRecording}
                sendingLoading={isRequesting}
                handleEnterKey={(e) => handleEnterKey(e)}
                checkMultiFile={multiFiles}
                setMultiFile={setMultiFiles}
                setImagesUpload={(e) => {
                  onMediaUpload(e);
                }}
                onClick={() => {
                  setShowEmojiPicker(false);
                  setVoiceRecording(false);
                }}
                onWrapperClick={() => {
                  handleTooltip();
                }}
                disabledField={selectedChat && chatChannels.length > 0 ? false : true}
                // chatFile={fileUpload}
                chatSelectedFile={chatFileName}
                selectedFiles={selectedFiles}
                handleRemoveFile={handleRemoveFile}
              />
            </ChatWrapper>

            <div
              className={`members-panel ${showMembers && !isUserBlocked ? 'shown' : 'hidden'
                }`}>
              <h2>
                Members
                <button
                  className="material-icons-outlined"
                  onClick={() => setShowMembers(false)}>
                  x
                </button>
              </h2>
              <div className="filter-input">
                <input
                  onChange={(e) => setMembersFilter(e.target.value)}
                  placeholder="Search in members"
                  type="text"
                  value={membersFilter}
                />
                <i className="material-icons-outlined">search</i>
              </div>
              <MemberList
                members={channelMembers.filter((c) =>
                  c.name
                    ?.toLowerCase()
                    .includes(membersFilter.toLowerCase()),
                )}
                presentMembers={presentUUIDs}
              />
            </div>
          </>
        )}
      </Chat>
      <ChatMessageModal
        setChatModalShow={setNewChatModal}
        chatModalShow={newChatModal}
        showGroupChat={showGroupChat}
        setShowGroupChat={setShowGroupChat}
        pubnub={pubnub}
        loginInfo={loginInfo}
        singleChatData={alldata ? alldata : []}
        getChannelsFunc={bootstrap}
        requesting={requesting}
        setCreateBtnClass={setCreateBtnClass}
        createBtnClass={createBtnClass}
      />
    </div>
    //   </div>
    // </HomeLayout>
  );
};

const mapStateToProps = (state) => ({
  alldata: state.PubNubChat.allUsersdata,
  requesting: state.PubNubChat.requesting,
  loginInfo: state.login.loginInfo,
  // groupUsers: state.PubNubChat.groupUsers,
  allChannelsData: state.PubNubChat.allChannelsData
});

const mapDispatchToProps = (dispatch) => ({
  getAllUsersData: (data) => dispatch(getAllUsersData(data)),
  getPubnubChannel: (data) => dispatch(getPubnubChannel(data)),
  removePubnubUser: (data) => dispatch(removePubnubUser(data)),
  searchListShow: (data) => dispatch(searchListShow(data)),
  setDirectUser: (data) => dispatch(setDirectUser(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModeratedChat);
