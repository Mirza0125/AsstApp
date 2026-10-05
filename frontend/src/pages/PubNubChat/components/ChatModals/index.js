import React, { useState } from "react"
import Modal from "react-bootstrap/Modal"
import closeIcon from "../../../../assets/images/close-icon.svg"
import Button from "../../../../components/Button"
import multipleChatImg from "../../../../assets/images/profile-avatar.svg"
import NewChat from "./components/NewChat"
import { createDirectChannel, createGroupChannel } from "../../../../utils/utils"
import { searchListShow, setGroupChatPicture } from "../../redux/action"
import {
  postPubnubChannel,
  setGroupUsers
} from "../../redux/action"

import "./style.scss"
import GroupChat from "./components/GroupChat"
import { connect } from "react-redux"
import { toast } from "react-hot-toast"
import { history } from "../../../../reduxStore/store"

const ChatMessageModal = props => {
  const {
    chatModalShow,
    setChatModalShow,
    loginInfo,
    pubnub,
    singleChatData,
    dirctUser,
    groupUsers,
    getChannelsFunc,
    setGroupChatPicture,
    groupChatImage,
    postPubnubChannel,
    setGroupUsers,
    searchListShow,
    requesting,
    showGroupChat,
    setShowGroupChat,
    setCreateBtnClass,
    createBtnClass
  } = props
  // const [showGroupChat, setShowGroupChat] = useState(false)
  const [allusersIds, setAllusersIds] = useState(false)
  const [groupName, setGroupName] = useState("")
  const [groupDisc, setGroupDisc] = useState("")
  const [loading, setLoading] = useState(false)

  const prevGroupData = () => {
    setGroupName("")
    setGroupDisc("")
    setGroupChatPicture(false)
  }

  const createDirectChat = async () => {
    setCreateBtnClass('disabled')
    if (dirctUser) {
      setLoading(true)
      createDirectChannel(pubnub, loginInfo.id, dirctUser.id, {
        name: dirctUser.name,
        custom: {
          type: 0,
          owner: loginInfo.name,
          chat_name: "",
          direct: "true",
          image: dirctUser.profileUrl
            ? `${dirctUser.profileUrl}`
            : "https://idronline.org/wp-content/uploads/2021/01/Screen-Shot-2019-02-19-at-1.23.40-PM-300x300-3.jpg",
          createdAt: Date.now() / 1000
        }
      })
        .then(res => {
          postPubnubChannel({
            // thumbnail: "",
            // group_name: "Zakki",
            // group_description: "this is group",
            group_user: [parseInt(dirctUser.id)],
            chat_creation: "user",
            pubnub_channel: res.channel,
            date: `${Date.now() / 1000}`
          })
          setChatModalShow(false)
          getChannelsFunc()
          setLoading(false)
        })
        .catch(err => {
          setLoading(false)
          console.log('err', err);
        })
    } else {
      toast.error("Please select a user", {
        id: "card fields"
      })
    }
  }

  const createGroupChat = async () => {
    let tempArray = []
    let allUsersId
    if (groupUsers.length > 0 && groupName) {
      allUsersId = groupUsers.map(item => parseInt(item.id))
      let selectUsers =
        groupUsers.length > 0 &&
        groupUsers.map(item => ({
          id: `${item.id}`,
          isSelected: true,
          custom: {
            type: 0,
            owner: item,
            chat_name: "",
            image: `${item.profileUrl}`
          }
        }))
      tempArray = [
        ...selectUsers,
        {
          id: `${loginInfo.id}`,
          isSelected: true,
          custom: {
            type: 0,
            chat_name: "",
            owner: loginInfo,
            image: `${loginInfo.profile_picture}`
          }
        }
      ]
      if (tempArray) {
        setLoading(true)
        setCreateBtnClass('disabled')
        createGroupChannel(pubnub, tempArray, loginInfo.id, {
          name: groupName,
          custom: {
            type: 0,
            direct: "false",
            chat_name: "",
            owner: loginInfo.name,
            discription: groupDisc,
            id: `${loginInfo.id}`,
            email: loginInfo.email,
            picture: loginInfo.profile_picture,
            createdAt: Date.now() / 1000,
            image: groupChatImage
              ? groupChatImage?.group_chat
              : "https://cdn.pixabay.com/photo/2017/11/10/05/46/group-2935521_960_720.png"
          }
        })
          .then(res => {
            postPubnubChannel({
              thumbnail: groupChatImage.group_chat,
              group_name: groupName,
              group_description: groupDisc,
              group_user: allUsersId,
              chat_creation: "group",
              pubnub_channel: res.channel,
              date: `${Date.now() / 1000}`
            })
            setChatModalShow(!chatModalShow)
            setShowGroupChat(false)
            getChannelsFunc()
            prevGroupData()
            setLoading(false)
            setCreateBtnClass('')
            setGroupUsers([])
          })
          .catch(err => {
            setLoading(false)
          })
      }
    } else {
      toast.error("Group Name and Users Required", {
        id: "card fields"
      })
    }
  }


  const handlePictureChange = e => {
    if (
      e.target.files[0].type == "image/jpeg" ||
      e.target.files[0].type == "image/jpg" ||
      e.target.files[0].type == "image/png"
    ) {
      const data = new FormData()
      data.append("group_chat", e.target.files[0])
      setGroupChatPicture(data)
    } else {
      toast.error("File Select Image File (.jpeg, .jpg, .png)")
    }
  }

  const pageRoute = history.location.pathname

  return (
    <>
      <Modal
        show={chatModalShow}
        onHide={() => {
          setChatModalShow(false)
          setShowGroupChat(false)
        }}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="chat-message-modal"
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            {/* <div className="top-img">
              <img src={multipleChatImg} alt="" />
            </div> */}
            <div className="head-title">
              {pageRoute == '/admin/messages'
                ?
                'New Chat'
                : pageRoute == '/admin/group_chat' &&
                'Group Chat'
              }
            </div>
            <div
              className="close-icon"
              onClick={() => {
                setChatModalShow(false)
                setShowGroupChat(false)
                // searchListShow(false)
              }}
            >
              <img src={closeIcon} alt="" />
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-body-details-wrapper">
            {showGroupChat ? (
              <GroupChat
                singleChatData={singleChatData}
                groupName={groupName}
                setGroupName={setGroupName}
                groupDisc={groupDisc}
                setGroupDisc={setGroupDisc}
                groupChatData={groupUsers}
                onPictureChange={handlePictureChange}
                groupImage={groupChatImage ? groupChatImage?.group_chat : false}
                requesting={requesting}
              />
            ) : (
              <NewChat singleChatData={singleChatData} requesting={requesting} />
            )}
            {!showGroupChat ? (
              <div className="button-wrapper chat-button">
                <Button
                  onClick={() => createDirectChat()}
                  title="Create Chat"
                  showSpinner={loading}
                  className={`${createBtnClass}`}
                />
                {/* <Button
                  onClick={() => setShowGroupChat(true)}
                  title="Create Group"
                  className="transparent-btn"
                /> */}
              </div>
            ) : (
              <div className="button-wrapper chat-button">
                <Button
                  title="Create Group"
                  onClick={() => {
                    createGroupChat()
                    searchListShow(false)
                  }}
                  className={`${createBtnClass}`}
                  showSpinner={loading}
                />
              </div>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

const mapStateToProps = state => ({
  loginInfo: state.login.loginInfo,
  dirctUser: state.PubNubChat.dirctUser,
  groupUsers: state.PubNubChat.groupUsers,
  groupChatImage: state.PubNubChat.groupChatImage
})

const mapDispatchToProps = dispatch => ({
  setGroupChatPicture: data => dispatch(setGroupChatPicture(data)),
  postPubnubChannel: data => dispatch(postPubnubChannel(data)),
  setGroupUsers: data => dispatch(setGroupUsers(data)),
  searchListShow: data => dispatch(searchListShow(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(ChatMessageModal)
