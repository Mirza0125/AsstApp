import React from 'react';
import './style.scss';
import {Images} from '../../theme/Images';
import Rating from '@mui/material/Rating';

const ProfileReviewsCard = ({data}) => {
  // Import the Moment.js library
  const moment = require('moment');

  // Define the date and time you want to calculate the time passed from
  const fromDate = data.created_at;

  // Calculate the time passed using Moment.js
  const timePassed = moment(fromDate).fromNow();

  function convertTimeAgo(timeAgoStr) {
    const timeAgoRegex = /^(\d+)\s+(\w+)\s+ago$/;
    const match = timeAgoStr.match(timeAgoRegex);
    if (!match) {
      return timeAgoStr;
    }
    const [, timeValue, timeUnit] = match;
    switch (timeUnit) {
      case 'months':
        return `${timeValue} Mon Ago`;
      case 'minutes':
        return `${timeValue} Min Ago`;
      default:
        return timeAgoStr;
    }
  }

  const convertCreatedAt = (time) => {
    const inputDateTime = time;
    const outputDateTime = moment(inputDateTime).format('DD MMMM YYYY, hh:mmA');

    return outputDateTime; // Output: "05 May 2023, 08:01AM"
  }

  return (
    <div className="profile-reviews-card">
      <div className="profile-review-avatar">
        <div className="avatar">
          <img src={Images.profileAvatar} alt="" />
        </div>
        <p>{convertTimeAgo(timePassed)}</p>
      </div>
      <div className="profile-review-details">
        <div className="review-details-head flex-align-between">
          <div className="title">{data.user.name}</div>
          {/* <img src={Images.starImage} alt="" /> */}
          <Rating name="read-only" value={data.rating} readOnly />
        </div>
        <div className="review-details-text">{data.comments}</div>
        <div className="review-details-time">{convertCreatedAt(data.created_at)}</div>
      </div>
    </div>
  );
};

export default ProfileReviewsCard;
