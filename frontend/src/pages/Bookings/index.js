import dayjs from 'dayjs'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import UCalendar from '../../components/UCalendar'
import HomeLayout from '../../layout/HomeLayout'
import { Images } from '../../theme/Images'
// Redux
import { connect } from 'react-redux'
import { history } from '../../reduxStore/store'

import noData from '../../assets/images/noData.svg'

// Style
import { Spinner } from 'reactstrap'
import { 
    bookingsRequest, 
    dateValue, 
    monthValue, 
    yearValue, 
    cancelBookingRequest,
    getTimeSlotRequest,
    getTimeSlotFailure,
    serviceIDAction,
    setSlotsSuccessAction,
    setCancelSuccessAction,
    bookingsSuccess,
} from './redux/action'
import './style.scss'

import AddTimeModal from '../../components/Modals/AddTimeModal'

const Calendar = (props) => {
    const [showModal, setShowModal] = useState(false)
    const [cancelBookingID, setCancelBookingID] = useState(0)

    const {
        getDateValue,
        setDateValue,
        getYearValue,
        getMonthValue,
        setMonthValue,
        setYearValue,
        bookingsRequest,
        bookingsData,
        requesting,
        cancelBookingRequest,
        cancelledBookingsData,
        getTimeSlotRequest,
        serviceIDAction,
        setSlotsSuccessAction,
        setCancelSuccessAction,
        cancelSuccess,
        cancelBookingRequesting,
        bookingsSuccess
    } = props

    useEffect(() => {
        const currentDate = dayjs(new Date());
        setDateValue(currentDate)
        setMonthValue(currentDate)
        setYearValue(currentDate)
    }, [history])

    useEffect(() => {
        setSlotsSuccessAction(false)
        setCancelSuccessAction(false)
        if (getDateValue && getMonthValue && getYearValue) {
            const date = `${getYearValue?.$y}-${moment(getMonthValue?.$d).format('MM')}-${moment(getDateValue?.$d).format('DD')}`
            bookingDate(date)
            localStorage.setItem("booking_date", date)
        }
        bookingsRequest({"booking_date": localStorage.getItem("booking_date")})
    }, [getDateValue, getMonthValue, getYearValue])

    const handleDateChange = (newValue) => {
        setDateValue(newValue)
    }
    const handleYearChange = (newValue) => {
        setYearValue(newValue)
    }


    const handleMonthChange = (newValue) => {

        const newDate = dayjs(getDateValue).month(newValue.month());
        const maxDaysInMonth = newDate.daysInMonth();
        const newDateValue = newDate.date(Math.min(getDateValue.date(), maxDaysInMonth));
        setDateValue(newDateValue);
        setMonthValue(newValue);
    }

    const bookingDate = (val) => {
        const data = {
            booking_date: val
        }
        bookingsRequest(data)
    }

    const changeTimeFormat = (bookingTime) => {
        const moment = require('moment');

        const time = bookingTime;
        const time12 = moment(time, 'HH:mm:ss').format('h:mm A');

        return time12
    }

    const handleOnClick = (booking_id) => {
        setCancelBookingID(booking_id)
        cancelBookingRequest(booking_id)
        setCancelSuccessAction(true)
    }

    const handleAddTimeOnClick = (data) => {
        serviceIDAction(data.service_id)
        getTimeSlotRequest({"category_id": data.category_id, "booking_service_id": data.service_id})
        setShowModal(true)
    }

    const handleArrowOnClick = () => {
        history.goBack()
    }

    return (
        <HomeLayout contentClassName='calendar-content-section overflow-hidden'>
            <AddTimeModal showModal={showModal} setShowModal={setShowModal} />
            <div className="bookings-section-wrapper">
                <div className="navigate-head flex-align-center">
                    <img src={Images.backArrow} onClick={() => handleArrowOnClick()} alt="" />
                    <p>Bookings</p>
                </div>
                <div className="calendar-bookings-wrapper">
                    <div className="calendar-main-wrapper">
                        <UCalendar
                            yearValue={getYearValue}
                            onYearChange={(newValue) => {
                                handleYearChange(newValue)
                            }}
                            monthValue={getMonthValue}
                            onMonthChange={(newValue) => {
                                handleMonthChange(newValue)
                            }}
                            dateValue={getDateValue}
                            onDateChange={(newValue) => {
                                handleDateChange(newValue)
                            }}
                        />
                    </div>
                    <div className="upcoming-bookings">
                        <h3>Upcoming bookings</h3>
                        <div className="bookings-card-wrapper">
                            {(bookingsData?.events?.length > 0) || (bookingsData?.bookings?.length > 0)
                                ?
                                <>
                                    {bookingsData && bookingsData?.events.map((item, i) => (
                                        <div className="event-card" key={i}>
                                            <div className="title flex-align-between">
                                                <div className='name'>{item.event_name}</div>
                                                <div className="date">{item.event_date}</div>
                                            </div>
                                            <div className="sub-title">Free entry</div>
                                            <div className="text">
                                                {item.description}
                                            </div>
                                            <div className="events-type">
                                                <div className="type">
                                                    {item.event_type}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {bookingsData && bookingsData?.bookings?.map((item, i) => (
                                        <div className="booking-card" key={i}>
                                            <div className="top flex-align-center">
                                                <div className="left-details">
                                                    <div className="date">{moment(item.booking_date).format('MMM DD')}</div>
                                                    <div className="time">{changeTimeFormat(item.booking_time)}</div>
                                                </div>
                                                <div className="right-details flex-align-center">
                                                    <div className="avatar">
                                                        <img src={item.category_image} alt="" />
                                                    </div>
                                                    <div className="avatar-details">
                                                        <div className="name">{item.employee_name}</div>
                                                        <div className="event">{item.category_name}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="bottom">
                                                <div 
                                                className="action flex-justify-center" 
                                                onClick={() => handleAddTimeOnClick({
                                                    "category_id": item.category_id,
                                                    "service_id": item.booking_id})}>Add Time</div>
                                                <div 
                                                className={`action flex-justify-center ${cancelBookingRequesting || requesting ? "disabled" : ""}`} 
                                                onClick={() => handleOnClick(item.booking_id)}>
                                                    {requesting && item.booking_id === cancelBookingID || 
                                                    cancelBookingRequesting && item.booking_id === cancelBookingID ? <Spinner size={"sm"} /> : "Cancel"}
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                </>
                                :
                                (requesting
                                    ?
                                    <div className="spinner-style">
                                        <Spinner />
                                    </div> :
                                    (bookingsData?.events?.length == 0) && (bookingsData?.bookings?.length == 0) &&
                                    <div className="no-data">
                                        <img src={noData} alt="no-data" className="no-data-pic" />
                                        <span>No Data</span>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </HomeLayout>
    )
}

const mapStateToProps = (state) => ({
    bookingsData: state.calendar.bookingsData,
    getYearValue: state.calendar.getYearValue,
    getMonthValue: state.calendar.getMonthValue,
    getDateValue: state.calendar.getDateValue,
    cancelledBookingsData: state.calendar.cancelledBookingsData,
    requesting: state.calendar.requesting,
    cancelSuccess: state.calendar.setCancelSuccess,
    cancelBookingRequesting: state.calendar.cancelBookingRequesting,
})

const mapDispatchToProps = dispatch => ({
    bookingsRequest: data => dispatch(bookingsRequest(data)),
    bookingsSuccess: data => dispatch(bookingsSuccess(data)),
    setYearValue: data => dispatch(yearValue(data)),
    setMonthValue: data => dispatch(monthValue(data)),
    setDateValue: data => dispatch(dateValue(data)),
    cancelBookingRequest: booking_id => dispatch(cancelBookingRequest(booking_id)),
    getTimeSlotRequest: data => dispatch(getTimeSlotRequest(data)),
    getTimeSlotFailure: data => dispatch(getTimeSlotFailure(data)),
    serviceIDAction: data => dispatch(serviceIDAction(data)),
    setSlotsSuccessAction: data => dispatch(setSlotsSuccessAction(data)),
    setCancelSuccessAction: data => dispatch(setCancelSuccessAction(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Calendar)