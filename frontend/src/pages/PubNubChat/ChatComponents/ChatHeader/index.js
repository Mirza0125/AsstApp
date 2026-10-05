import React, {useEffect, useState} from 'react';
// import avatar from "../../../assets/images/avatar.svg"
// import optionIcon from "../../../assets/images/options.svg"
// import optionActive from "../../../assets/images/options-blue.svg"
// import addIcon from "../../../assets/images/add.svg"

import './style.scss';
// import Search from '../../Search';

import {removePubnubChannel} from '../../../../utils/utils';
import {connect} from 'react-redux';
import {
  deletePubnubChannel,
  removePubnubUser,
  searchListShow,
} from '../../redux/action';

const ChatHeader = (props) => {
  const {
    isGroupChat,
    userChannel,
    pubnub,
    currentUserId,
    getChannelsFunc,
    chatScreenData,
    isSearchChat,
    loginInfo,
    disabledAction,
    showOption,
    setShowOption,
    senderHeader,
    setSenderHeader,
    groupUsers,
    onAddButtonClick,
    deletePubnubChannel,
    ChatChannel,
    removePubnubUser,
    searchListShow,
  } = props;

  const [sideOption, setSideOption] = useState(false);

  useEffect(() => {
    showOption && setShowOption(showOption);
  }, [showOption]);

  const handleLeaveGroup = () => {
    removePubnubChannel(pubnub, currentUserId, userChannel?.id)
      .then((res) => {
        if (ChatChannel.chat_creation == 'user') {
          deletePubnubChannel(ChatChannel?.id);
        } else {
          removePubnubUser({
            data: {
              check: false,
              user_id: [loginInfo.user.id],
            },
            id: ChatChannel?.id,
          });
        }
        getChannelsFunc();
        chatScreenData([]);
      })
      .catch((err) => console.log('remove error', err));
    setSenderHeader(senderHeader);
  };

  return (
    <section className="chat-header-section">
      <div className="chat-header-wrapper">
        <div className="chat-header-left">
          <div className="header-title-wrapper">
            <div className="back"></div>
            <div className="title">
              {senderHeader && (
                <>
                  {/* {userChannel && ( */}
                  <h3 className="name">
                    {ChatChannel.chat_creation == 'user'
                      ? loginInfo.user.name == ChatChannel.group_name
                        ? ChatChannel.owner_name
                        : ChatChannel.group_name
                      : ChatChannel.group_name}
                  </h3>
                  {/* )} */}
                  {/* {isGroupChat && ( */}
                  <div className="selected-images">
                    <div className="img-wrapper selected-avatar">
                      <img
                        src={
                          ChatChannel.onwer_image
                            ? ChatChannel.onwer_image
                            : 'https://png.pngtree.com/png-vector/20220430/ourmid/pngtree-smiling-people-avatar-set-different-men-and-women-characters-collection-png-image_4526743.png'
                        }
                        alt=""
                      />
                    </div>
                    <div className="img-wrapper selected-avatar">
                      <img
                        src={
                          ChatChannel.thumbnail
                            ? ChatChannel.thumbnail
                            : 'https://png.pngtree.com/png-vector/20220430/ourmid/pngtree-smiling-people-avatar-set-different-men-and-women-characters-collection-png-image_4526743.png'
                        }
                        alt=""
                      />
                    </div>
                  </div>
                  {/* )} */}
                </>
              )}
            </div>
          </div>
        </div>
        <div className="chat-header-right">
          {/* {isSearchChat && (
            <div className="chat-search-wrapper">
              <div className="label">Add Members:</div>
              <Search
                placeholder="Search"
                setShowOption={setShowOption}
                isGroupChat={true}
              />
            </div>
          )} */}
          <div
            className={`add-users ${groupUsers.length > 0 ? 'opacity-1' : ''}`}
            onClick={onAddButtonClick}>
            {/* <img src={addIcon} alt="" /> */}
          </div>
          <div
            className={`options ${sideOption ? 'active' : ''} ${
              disabledAction ? 'disabled' : ''
            }`}
            onClick={() => {
              searchListShow(false);
              setSideOption(!sideOption);
            }}>
            {/* <img src={sideOption ? optionActive : optionIcon} alt="options" /> */}
            {sideOption && (
              <div
                onClick={() => {
                  handleLeaveGroup();
                }}
                className="option-item">
                {ChatChannel.chat_creation == 'user'
                  ? 'Delete Chat'
                  : 'Leave Group'}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = (state) => ({
  alldata: state.PubNubChat.allUsersdata,
  groupUsers: state.PubNubChat.groupUsers,
  loginInfo: state.login.loginInfo,
});

const mapDispatchToProps = (dispatch) => ({
  deletePubnubChannel: (data) => dispatch(deletePubnubChannel(data)),
  removePubnubUser: (data) => dispatch(removePubnubUser(data)),
  searchListShow: (data) => dispatch(searchListShow(data)),
  // setDirectUser: data => dispatch(setDirectUser(data)),
  // setGroupUsers: data => dispatch(setGroupUsers(data)),
  // getAllUsersData: data => dispatch(getAllUsersData(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatHeader);
