import React, { useState, useEffect } from 'react'

// Components
import HomeLayout from '../../layout/HomeLayout'

// Image
import servicesArrow from '../../assets/images/servicesArrow.svg'
import residentNameIcon from '../../assets/images/residentNameIcon.svg'
import designerNameIcon from '../../assets/images/designerNameIcon.svg'
import dotDateTime from '../../assets/images/dotDateTime.svg'

// Style
import './style.scss'

// Routing
import { history } from '../../reduxStore/store'
import { connect } from 'react-redux';

// Redux Actions
import {
    ongoingBookingsRequest,
    ongoingBookingsFailure,
    upcomingBookingsRequest,
    upcomingBookingsFailure,
    completedBookingsRequest,
    completedBookingsFailure,
    activeStatusAction,
} from './redux/action'

// Material UI Components
import CircularProgress from '@mui/material/CircularProgress';

export const ManageBookings = (props) => {
    // const [activeStatus, setActiveStatus] = useState("pending")
    const [allServices, setAllServices] = useState([])

    const {
        // Actions
        ongoingBookingsRequest,
        upcomingBookingsRequest,
        completedBookingsRequest,
        activeStatusAction,

        // Requesting
        requesting,

        // States
        ongoingBookings,
        upcomingBookings,
        completedBookings,
        activeStatus,
    } = props;

    useEffect(() => {
        ongoingBookingsRequest()
        upcomingBookingsRequest()
        completedBookingsRequest()
    }, [])

    useEffect(() => {
        bookingsData()
    }, [activeStatus, ongoingBookings, allServices])

    const handleOngoingClick = (value) => {
        activeStatusAction(value)
    }

    const handleUpcomingClick = (value) => {
        activeStatusAction(value)
    }

    const handleCompletedClick = (value) => {
        activeStatusAction(value)
    }

    // Function to change format of date from November 30 to Nov 30
    const changeDateFormat = (date) => {
        const dateObj = new Date(date);
        return dateObj.toLocaleString('default', {
            month: 'short'
        }) + ' ' + dateObj.getDate()
    }

    // Function to change time format 13:00:00 to 1:00 PM
    const changeTimeFormat = (time) => {
        // Load Moment.js library (you need to have it installed)
        const moment = require('moment');

        // Convert time string from 24-hour format to 12-hour format with AM/PM
        const time24 = time;
        const time12 = moment(time24, 'HH:mm:ss').format('h:mm A');

        return time12
    }

    // Function to get updated ongoing, upcoming and completed data
    const bookingsData = () => {
        if (ongoingBookings && activeStatus === "pending") {
            setAllServices(ongoingBookings.map((data, index) => ({
                "id": data?.id,
                "booking_date": changeDateFormat(data?.booking_date),
                "booking_address": data?.booking_address,
                "resident_name": data?.resident_name,
                "designer_name": data?.designer_name,
                "service_image": data?.category.image,
                "service_name": data?.category.name,
                "time_slot": changeTimeFormat(data?.booking_time_slot[0]?.booking_time_slot?.start_time)
            })))
        }
        else if (upcomingBookings && activeStatus === "upcoming") {
            setAllServices(upcomingBookings.map((data, index) => ({
                "id": data?.id,
                "booking_date": changeDateFormat(data?.booking_date),
                "booking_address": data?.booking_address,
                "resident_name": data?.resident_name,
                "designer_name": data?.designer_name,
                "service_image": data?.category.image,
                "service_name": data?.category.name,
                "time_slot": changeTimeFormat(data?.booking_time_slot[0]?.booking_time_slot?.start_time)
            })))
        }
        else if (completedBookings && activeStatus === "completed") {
            setAllServices(completedBookings.map((data, index) => ({
                "id": data?.id,
                "booking_date": changeDateFormat(data?.booking_date),
                "booking_address": data?.booking_address,
                "resident_name": data?.resident_name,
                "designer_name": data?.designer_name,
                "service_image": data?.category.image,
                "service_name": data?.category.name,
                "time_slot": changeTimeFormat(data?.booking_time_slot[0]?.booking_time_slot?.start_time)
            })))
        }
    }

    return (
        <HomeLayout>
            <div className='bookings-wrapper'>
                <div className="navigate-head flex-align-center">
                    <img src={servicesArrow} onClick={() => history.goBack()} alt="arrow" />
                    <p>Bookings</p>
                </div>
                <div className="bookings-status-section">
                    <div className='status-name'>
                        <div
                            onClick={() => handleOngoingClick('pending')}
                            className={`status-text ${activeStatus === 'pending' ? 'active' : ''}`}>
                            {/* Ongoing ({bookings.filter(checkStatus).length}) */}
                            Ongoing ({ongoingBookings ? ongoingBookings.length : 0})
                        </div>
                        <div
                            onClick={() => handleUpcomingClick('upcoming')}
                            className={`status-text ${activeStatus === 'upcoming' ? 'active' : ''}`}>
                            Upcoming ({upcomingBookings ? upcomingBookings.length : 0})
                        </div>
                        <div
                            onClick={() => handleCompletedClick('completed')}
                            className={`status-text ${activeStatus === 'completed' ? 'active' : ''}`}>
                            Completed ({completedBookings ? completedBookings.length : 0})
                        </div>
                    </div>
                </div>
                <div className="bookings-content-section">
                    {requesting ? <CircularProgress sx={{ color: "#30D5C8", display: "flex", alignItems: "center" }} /> :
                        <>
                            {allServices &&
                                allServices.map((data, index) => (
                                    <div className='bookings-content'>
                                        <div className='left-content'>
                                            <div className="service-img-wrapper flex-align-center">
                                                {data?.service_image?.length > 0 ?
                                                    <img
                                                        className='service-image'
                                                        src={data?.service_image}
                                                        alt="service-icon" />
                                                    : <div className='no-image-bookings'></div>
                                                }
                                            </div>
                                            <div className="left-content-text">
                                                <span className='service-name'>{data?.service_name}</span>
                                                <div className='left-content-datetime'>
                                                    <span className='date'>{data?.booking_date}</span>
                                                    <div className='dot'>
                                                        <img src={dotDateTime} alt="dot" />
                                                    </div>
                                                    <span className='time'>{data?.time_slot}</span>
                                                </div>
                                                <span className='address'>{data?.booking_address}</span>
                                            </div>
                                        </div>
                                        <div className='right-content'>
                                            <div className='resident-name-section'>
                                                <img style={{ marginRight: "10px" }} src={residentNameIcon} alt="resident-name-icon" />
                                                <span>{data?.resident_name}</span>
                                            </div>
                                            <div className='designer-name-section'>
                                                <img style={{ marginRight: "10px" }} src={designerNameIcon} alt="designer-name-icon" />
                                                <span>{data?.designer_name}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </>
                    }
                </div>
            </div>
        </HomeLayout>
    )
}

const mapStateToProps = (state) => ({
    ongoingBookings: state.bookings.ongoingBookings,
    upcomingBookings: state.bookings.upcomingBookings,
    completedBookings: state.bookings.completedBookings,
    error: state.bookings.error,
    requesting: state.bookings.requesting,
    activeStatus: state.bookings.activeStatus,
});

const mapDispatchToProps = (dispatch) => ({
    ongoingBookingsRequest: () => dispatch(ongoingBookingsRequest()),
    ongoingBookingsFailure: () => dispatch(ongoingBookingsFailure()),
    upcomingBookingsRequest: () => dispatch(upcomingBookingsRequest()),
    upcomingBookingsFailure: () => dispatch(upcomingBookingsFailure()),
    completedBookingsRequest: () => dispatch(completedBookingsRequest()),
    completedBookingsFailure: () => dispatch(completedBookingsFailure()),
    activeStatusAction: (data) => dispatch(activeStatusAction(data))
});

// export default ManageServices;
export default connect(mapStateToProps, mapDispatchToProps)(ManageBookings);
