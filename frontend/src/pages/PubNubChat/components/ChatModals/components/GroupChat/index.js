import React, { useRef, useEffect, useState } from "react"
import { Toaster } from "react-hot-toast"
import { Spinner } from 'reactstrap'
import SearchField from '../../../../../../components/searchFeild/newindex'
import { Images } from '../../../../../../theme/Images'
import { connect } from 'react-redux'
import UInput from "../../../../../../components/UInput"

import { setGroupUsers, setDirectUser } from "../../../../redux/action"

const GroupChat = props => {
  const {
    isGroupChat,
    setGroupUsers,
    groupUsers,
    loginInfo,
    getAllUsersData,
    updateChannelUsers,
    searchListShow,
    alldata,
    setDirectUser,
    singleChatData,
    requesting,
    groupName,
    setGroupName
  } = props

  const fileRef = useRef(null)

  const handleUploadClick = () => {
    fileRef.current?.click()
    return false
  }

  const [selectedAvatar, setSelectedAvatar] = useState([])
  const [allUsersData, setAllUsersData] = useState([])
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    updateChannelUsers && searchListShow(false)
  }, [updateChannelUsers])

  useEffect(() => {
    alldata &&
      setAllUsersData(
        alldata.filter(val => val.eTag !== `${loginInfo.id}`)
      )
  }, [alldata])

  const handleSelectUser = item => {
    if (selectedAvatar.includes(item)) {
      const filterData = selectedAvatar.filter(val => val.id !== item.id)
      setSelectedAvatar(filterData)
      setGroupUsers(filterData)
    } else {
      setSelectedAvatar([...selectedAvatar, item])
      setGroupUsers([...groupUsers, item])
    }
  }

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
  }
  const filterUsers = (query) => {
    return singleChatData.filter(user => user.name && user.name.toLowerCase().includes(query.toLowerCase()));
  }
  const filteredUsers = filterUsers(searchQuery);

  return (
    <>
      <Toaster position="top-center" />
      <section className="group-chat-section">
        <SearchField value={searchQuery} onChange={handleSearch} />
        <UInput
          placeholder="Create Group Name"
          className={'email-field'}
          showIcon={true}
          src={Images.profileIcon}
          value={groupName}
          onChange={e => setGroupName(e.target.value)}
        />
        <div className="users-wrapper">
          {singleChatData && singleChatData.length > 0 ?
            filteredUsers.length > 0 ?
              filteredUsers.map((item, i) => (
                <div
                  className={`user-item ${selectedAvatar.includes(item) ? 'active' : ''}`}
                  onClick={() => handleSelectUser(item)}
                  key={i}
                >
                  <div className="avatar">
                    <img src={Images.userIcon} alt="" />
                  </div>
                  <div className="name">{item.name}</div>
                </div>

              ))
              :
              <div className="no-data">No Users Found</div>
            : requesting ?
              <div className="spinner-style">
                <Spinner />
              </div>
              :
              <div className="no-data">No Data</div>
          }
        </div>
        {/* <div className="group-creation-wrapper">
          <div className="group-input-wrapper">
            <Input
              type="text"
              placeholder="Create Group Name"
              showIcon={true}
              src={pencilIcon}
              value={groupName}
              onChange={e => setGroupName(e.target.value)}
              errorMessage="Please"
            />
            <TextArea
              placeholder="Create Group Description"
              value={groupDisc}
              onChange={e => setGroupDisc(e.target.value)}
            />
          </div>
        </div>
        <Search placeholder="Search to Add Recipients" isGroupChat={true} /> */}
      </section>
    </>
  )
}

const mapStateToProps = state => ({
  alldata: state.PubNubChat.allUsersdata,
  groupUsers: state.PubNubChat.groupUsers,
  updateChannelUsers: state.PubNubChat.updateChannelUsers,
  searchListStatus: state.PubNubChat.searchListStatus,
  loginInfo: state.login.loginInfo
})

const mapDispatchToProps = dispatch => ({
  setDirectUser: data => dispatch(setDirectUser(data)),
  setGroupUsers: data => dispatch(setGroupUsers(data)),
  // getAllUsersData: data => dispatch(getAllUsersData(data)),
  // searchListShow: data => dispatch(searchListShow(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(GroupChat)
