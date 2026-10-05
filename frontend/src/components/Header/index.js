import React, { useEffect, useState } from 'react';

// Components
import Popover from '@mui/material/Popover';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { Images } from '../../theme/Images';
import profileArrow from '../../assets/images/profileArrow.svg';
import moment from 'moment';
import { Spinner } from 'reactstrap'
import dummyProfile from '../../assets/images/dummyProfile.png'

// Style
import './style.scss';

//Redux
import { connect } from 'react-redux';
import { history } from '../../reduxStore/store';
import { logOut } from '../../pages/AuthScreens/Login/redux/action';
import {
  deleteNotificationRequest,
  deleteNotificationSuccess,
  getNotificationList,
  getNotificationListSuccess,
  postMarkReadNotification,
  postMarkReadNotificationSuccess
} from '../../pages/Notifications/redux/action';

import LogoutIcon from '@mui/icons-material/Logout';

import SearchField from '../searchFeild/newindex';

const Header = ({ className = '', ...props }) => {
  const {
    loginInfo,
    logOut,
    getNotificationList,
    getNotificationListSuccess,
    getNotifications,
    postMarkReadNotification,
    postMarkReadNotificationSuccess,
    postMarkReadData,
    deleteNotificationRequest,
    deleteNotificationSuccess,
    requesting
  } = props;

  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationId, setNotificationId] = useState(null)

  useEffect(() => {
    getNotificationList()
  }, [])

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopUpClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const [anchor, setAnchor] = useState(null);

  const handleOnClick = (event) => {
    setAnchor(event.currentTarget);
  };

  const [notificationOption, setNotificationOption] = useState(null);
  const handleOptionClick = (event) => {
    setNotificationOption(event.currentTarget);
  };


  const handleOptionClose = () => {
    setNotificationOption(null);
  };
  const notificationOpen = Boolean(notificationOption);
  const openId = notificationOpen ? 'simple-popover' : undefined;

  const handleClose = () => {
    setAnchor(null);
  };

  const menuOpen = Boolean(anchor);
  const ID = menuOpen ? 'simple-popover' : undefined;


  const handleLogout = () => {
    setTimeout(() => {
      logOut()
      localStorage.clear()
      history.push('/auth/login')
    }, [100]);
  }

  const handleMarkRead = () => {
    const data = {
      user: loginInfo.id,
      notification: notificationId
    }
    postMarkReadNotification(data)
    handleOptionClose()
  }

  const handleDeleteNotification = () => {
    deleteNotificationRequest(notificationId)
    handleOptionClose()
  }

  const unseenNotifications = getNotifications && getNotifications.filter(notification => !notification.is_seen)


  return (
    <section className={`header-section ${className}`}>
      <div className="main-head">
        <span className="welcome">Hello {loginInfo?.name}!</span>
        <div className="header-settings flex-align-center">
          <div className="title flex-align-center">
            <SearchField />
            <div className="notifications-icon" onClick={handleClick}>
              <NotificationsNoneIcon className='notification-icon' />
              {unseenNotifications?.length > 0 &&
                <div className="notification-badge flex-justify-center">
                  <div className="red"></div>
                </div>
              }
            </div>
            <div onClick={() => history.push('/admin/settings')}>
              <img className='avatar-picture' 
              src={loginInfo?.image ? loginInfo?.image : dummyProfile} alt='avatar' />
            </div>
            <div className='profile-text'>
              <div className="text" title={loginInfo?.name}>{loginInfo?.name}</div>
              <div className="role">{loginInfo?.role}</div>
            </div>
            <div className="header-options" onClick={handleOnClick}>
              <img src={profileArrow} alt='profileArrow' />
            </div>
          </div>
          <Popover
            id={openId}
            open={notificationOpen}
            anchorEl={notificationOption}
            className='profile-menu-popup notifications-options-popup'
            onClose={handleOptionClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            <div
              className='option-menu-items flex-align-center'
              onClick={handleMarkRead}
            >
              <div className="img-wrapper">
                <img src={Images.markReadIcon} alt="" />
              </div>
              Mark as read
            </div>
            <div
              className='option-menu-items flex-align-center'
              onClick={handleDeleteNotification}
            >
              <div className="img-wrapper">
                <img src={Images.deleteIcon} alt="" />
              </div>
              Delete
            </div>
          </Popover>
          <div className="header-options">
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handlePopUpClose}
              className="notifications-popup"
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <div
                className="top-option flex-align-between"
                onClick={() => {
                  handlePopUpClose();
                  history.push('/admin/notifications')
                }}
              >
                <div className="text">Show All Notifications</div>
                <img src={Images.notificationArrow} alt="" />
              </div>
              <div className="notification-items-wrapper">
                {/* {getNotifications && getNotifications.length > 0 ?
                  getNotifications.filter(item => !item.is_seen).map((item => (
                    <div className="notification-item" key={item.id}>
                      <div className="head flex-align-between">
                        <div className="notification-title flex-align-center">
                          <div className="title">
                            {item.title}
                          </div>
                          <div className="time">{moment(item.created).fromNow()}</div>
                        </div>
                        <div className="notification-options">
                          <img src={Images.optionIcon} alt=""
                            onClick={(event) => {
                              handleOptionClick(event)
                              setNotificationId(item.id)
                            }
                            }
                          />
                        </div>
                      </div>
                      <div className="notification-text">
                        {item.message}
                      </div>
                    </div>
                  )))
                  : requesting
                    ?
                    <div className="spinner-style">
                      <Spinner size={'sm'} />
                    </div>
                    :
                    unseenNotifications?.length < 1 &&
                    <small>No New Notifications</small>
                } */}
                {getNotifications && getNotifications.length > 0 ? (
                  unseenNotifications.length > 0 ? (
                    unseenNotifications.map((item => (
                      <div className="notification-item" key={item.id}>
                        <div className="head flex-align-between">
                          <div className="notification-title flex-align-center">
                            <div className="title">
                              {item.title}
                            </div>
                            <div className="time">{moment(item.created).fromNow()}</div>
                          </div>
                          <div className="notification-options">
                            <img src={Images.optionIcon} alt=""
                              onClick={(event) => {
                                handleOptionClick(event)
                                setNotificationId(item.id)
                              }
                              }
                            />
                          </div>
                        </div>
                        <div className="notification-text">
                          {item.message}
                        </div>
                      </div>
                    )))
                  ) : (
                    <small>No New Notifications</small>
                  )
                ) : (
                  requesting ? (
                    <div className="spinner-style">
                      <Spinner size={'sm'} />
                    </div>
                  ) : (
                    <small>No Notifications Found</small>
                  )
                )}
              </div>
            </Popover>
          </div>
          <div className="profile-menu-options">
            <Popover
              id={ID}
              open={menuOpen}
              anchorEl={anchor}
              className='profile-menu-popup'
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <div
                className='profile-menu-items'
                onClick={handleLogout}
              >
                <LogoutIcon sx={{marginRight: "10px"}} />
                Logout
              </div>
            </Popover>
          </div>
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = (state) => ({
  loginInfo: state.login.loginInfo,
  getNotifications: state.notifications.getNotifications,
  requesting: state.notifications.requesting,
  postMarkReadData: state.notifications.postMarkReadData
});
const mapDispatchToProps = dispatch => ({
  logOut: data => dispatch(logOut(data)),
  getNotificationList: data => dispatch(getNotificationList(data)),
  getNotificationListSuccess: data => dispatch(getNotificationListSuccess(data)),
  postMarkReadNotification: data => dispatch(postMarkReadNotification(data)),
  postMarkReadNotificationSuccess: data => dispatch(postMarkReadNotificationSuccess(data)),
  deleteNotificationRequest: (data) => dispatch(deleteNotificationRequest(data)),
  deleteNotificationSuccess: (data) => dispatch(deleteNotificationSuccess(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);
