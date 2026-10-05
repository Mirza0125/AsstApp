import React, { useState, useEffect } from 'react'
import HomeLayout from '../../layout/HomeLayout'
import { Images } from '../../theme/Images'
import './style.scss'
import { history } from '../../reduxStore/store'
import { connect } from 'react-redux'
import {
    deleteNotificationRequest,
    deleteNotificationSuccess,
    getNotificationList,
    getNotificationListSuccess,
    postMarkReadNotification,
    postMarkReadNotificationSuccess
} from './redux/action'
import moment from 'moment'
import Popover from '@mui/material/Popover';
import { Spinner } from 'reactstrap'


const Notifications = (props) => {

    const {
        getNotificationList,
        getNotificationListSuccess,
        getNotifications,
        postMarkReadNotification,
        postMarkReadNotificationSuccess,
        loginInfo,
        deleteNotificationRequest,
        deleteNotificationSuccess,
        requesting
    } = props

    const [notificationOption, setNotificationOption] = useState(null);
    const [notificationId, setNotificationId] = useState(null)
    const [isSeen, setIsSeen] = useState(false);

    useEffect(() => {
        getNotificationList()
    }, [])

    const handleOptionClick = (event) => {
        setNotificationOption(event.currentTarget);
    };

    const handleOptionClose = () => {
        setNotificationOption(null);
    };
    const notificationOpen = Boolean(notificationOption);
    const openId = notificationOpen ? 'simple-popover' : undefined;

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

    return (
        <HomeLayout>
            <div className="notifications-section-wrapper">
                <div className="navigate-head flex-align-center">
                    <img src={Images.backArrow} onClick={() => history.goBack()} alt="" />
                    <p>Jessica Aloin</p>
                </div>
                <div className="notifications-list-wrapper">
                    {getNotifications && getNotifications.length > 0 ? getNotifications.map((item => (
                        <div className={`notification-item ${item.is_seen ? '' : 'active'}`} key={item.id}>
                            <div className="head flex-align-between">
                                <div className="notification-title flex-align-center">
                                    <div className="title">
                                        {item.title}
                                    </div>
                                    <div className="time">
                                        {moment(item.created).fromNow()}
                                    </div>
                                </div>
                                <div className="notification-options">
                                    <img src={Images.optionIcon} alt=""
                                        onClick={(event) => {
                                            handleOptionClick(event)
                                            setNotificationId(item.id)
                                            setIsSeen(item.is_seen)
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
                        :
                        requesting ?
                            <div className="spinner-style">
                                <Spinner />
                            </div>
                            :
                            <div className="no-data">
                                No Notifications
                            </div>

                    }
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
                        className={`option-menu-items flex-align-center ${isSeen ? 'disabled' : ''}`}
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
            </div>
        </HomeLayout>
    )
}


const mapStateToProps = (state) => ({
    loginInfo: state.login.loginInfo,
    getNotifications: state.notifications.getNotifications,
    requesting: state.notifications.requesting,
    postMarkReadData: state.notifications.postMarkReadData,
    notificationDeleted: state.notifications.notificationDeleted
})

const mapDispatchToProps = dispatch => ({
    getNotificationList: data => dispatch(getNotificationList(data)),
    getNotificationListSuccess: data => dispatch(getNotificationListSuccess(data)),
    postMarkReadNotification: data => dispatch(postMarkReadNotification(data)),
    postMarkReadNotificationSuccess: data => dispatch(postMarkReadNotificationSuccess(data)),
    deleteNotificationRequest: (data) => dispatch(deleteNotificationRequest(data)),
    deleteNotificationSuccess: (data) => dispatch(deleteNotificationSuccess(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Notifications)