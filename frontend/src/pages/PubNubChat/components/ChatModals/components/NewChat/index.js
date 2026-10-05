import React, { useEffect, useState } from "react"
import { connect } from 'react-redux'
import { Spinner } from 'reactstrap'
import SearchField from '../../../../../../components/searchFeild/newindex'
import { Images } from "../../../../../../theme/Images"
import { setDirectUser, setGroupUsers } from "../../../../redux/action"

const NewChat = props => {

  const [activeItem, setActiveItem] = useState(null)

  const {
    singleChatData,
    requesting,
    isGroupChat,
    setGroupUsers,
    groupUsers,
    loginInfo,
    getAllUsersData,
    updateChannelUsers,
    searchListShow,
    alldata,
    setDirectUser
  } = props

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
    if (isGroupChat) {
      if (selectedAvatar.includes(item)) {
        const filterData = selectedAvatar.filter(val => val.eTag !== item.eTag)
        setSelectedAvatar(filterData)
        setGroupUsers(filterData)
      } else {
        setSelectedAvatar([...selectedAvatar, item])
        setGroupUsers([...groupUsers, item])
      }
    } else {
      setSelectedAvatar([item])
      setDirectUser(item)
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
      <section className="new-chat-section">
        <h3 className="mb-3">Users</h3>
        <SearchField value={searchQuery} onChange={handleSearch} />
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

export default connect(mapStateToProps, mapDispatchToProps)(NewChat)
