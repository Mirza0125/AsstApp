import moment from 'moment';
import {startingDateStyle, inBetweenStyle, endingDateStyle} from './constants';

export const addEllipsis = (string, characters = 2) => {
  if (string.length > characters * 2) {
    return (
      string.substr(0, characters) +
      '****' +
      string.substr(string.length - characters, string.length)
    );
  }
  return string;
};

export const emailEllipsis = (str, characters = 3) => {
  let splitedEmail = str.split('@');
  let username = splitedEmail[0];
  if (username.length > characters) {
    return username.substr(0, characters) + '****' + '@' + splitedEmail[1];
  }
};

export const getMinDate = () => {
  let date = new Date();
  date.setDate(date.getDate() + 1);
  return new Date(date).toDateString();
};

export const styledDataGenerator = (starting, ending) => {
  let datesList = [];
  const stylesData = {};
  let dt;

  // generating list of all dates between starting and ending dates.
  for (
    datesList, dt = new Date(starting);
    dt <= new Date(ending);
    dt.setDate(dt.getDate() + 1)
  ) {
    datesList.push(new Date(dt));
  }

  // applying starting date style to start date.
  const startDate = datesList[0].toISOString().slice(0, 10);
  stylesData[startDate] = startingDateStyle;

  // applying between date style to between dates.
  datesList.slice(1, -1).forEach((element) => {
    stylesData[element.toISOString().slice(0, 10)] = inBetweenStyle;
  });

  // applying end date style to end date.
  const endDate = datesList.slice(-1).pop().toISOString().slice(0, 10);
  stylesData[endDate] = endingDateStyle;

  const data = {stylesData: stylesData, endDate: endDate};

  // returnig styled data
  return data;
};

export const getMessageTime = (dateString) => {
  const messageDate = moment(new Date(dateString));
  return messageDate.format('DD/MM/YYYY') + ' - ' + messageDate.format('H:mm');
};

export const ParseDateStringForChat = (dateString) => {
  const messageDate = moment(dateString);
  const currentDate = moment(new Date());
  const diff = currentDate.diff(messageDate);
  const diffDuration = moment.duration(diff);

  const years = parseInt(diffDuration.years());
  const months = parseInt(diffDuration.months());
  const weeks = parseInt(diffDuration.weeks());
  const days = parseInt(diffDuration.days());
  const hours = parseInt(diffDuration.hours());
  const mins = parseInt(diffDuration.minutes());
  const secs = parseInt(diffDuration.seconds());

  var formattedString = '';

  if (years < 1) {
    if (months < 1) {
      if (weeks < 1) {
        if (days < 1) {
          formattedString = moment(dateString).format('hh:mm A');
        } else {
          if (days === 1) {
            formattedString = `${days} day ago`;
          } else {
            formattedString = `${days} days ago`;
          }
        }
      } else {
        if (weeks === 1) {
          formattedString = `${days} week ago`;
        } else {
          formattedString = `${days} weeks ago`;
        }
      }
    } else {
      if (months === 1) {
        formattedString = `${days} month ago`;
      } else {
        formattedString = `${days} months ago`;
      }
    }
  } else {
    if (years === 1) {
      formattedString = `${years} year ago`;
    } else {
      formattedString = `${years} years ago`;
    }
  }

  return formattedString;
};

export const formattedtDate = (timeString) => {
  //var timeString = '15:00:00';
  var hourEnd = timeString.indexOf(':');
  var H = +timeString.substr(0, hourEnd);
  var h = H % 12 || 12;
  var ampm = H < 12 ? 'AM' : 'PM';
  timeString = h + timeString.substr(hourEnd, 3) + ampm;
  return timeString;
};
