import moment from 'moment';

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
