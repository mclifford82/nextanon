import moment from 'moment-timezone';
// src/utils/utils.js

export function convertUTCToLocalTime(utcDate) {
  // get users local timezone offset
  const local_tz = moment.tz.guess();
  const localOffsetMinutes = moment.tz(local_tz).utcOffset();
  return moment(utcDate).add(localOffsetMinutes, 'minutes');
}

export function getNextMeetingDate(meetingDay, meetingHour, meetingMinutes) {
  const today = new Date();
  const todayDayOfWeek = today.getDay();
  let daysUntilNextMeeting = meetingDay - todayDayOfWeek;

  if (daysUntilNextMeeting < 0) {
    daysUntilNextMeeting += 7;
  } else if (daysUntilNextMeeting === 0) {
    const currentHour = today.getHours();
    const currentMinutes = today.getMinutes();
    
    const currentTimeInMinutes = currentHour * 60 + currentMinutes;
    const meetingTimeInMinutes = meetingHour * 60 + meetingMinutes;

    if (currentTimeInMinutes >= meetingTimeInMinutes) {
      daysUntilNextMeeting += 7;
    }
  }

  // Create moment object for next meeting date
  const m = moment(today).add(daysUntilNextMeeting, 'days').set({hour: meetingHour+1, minute: meetingMinutes, second: 0, millisecond: 0});
  return m;
}

export function formatZoomMeetingCode(meetingCode) {
  const length = meetingCode.length;

  if (length === 9) {
    // Format as 'XXX XXX XXX'
    return `${meetingCode.slice(0, 3)} ${meetingCode.slice(3, 6)} ${meetingCode.slice(6)}`;
  } else if (length === 10) {
    // Format as 'XX XXXX XXXX'
    return `${meetingCode.slice(0, 2)} ${meetingCode.slice(2, 6)} ${meetingCode.slice(6)}`;
  } else if (length === 11) {
    // Format as 'XXX XXXX XXXX'
    return `${meetingCode.slice(0, 3)} ${meetingCode.slice(3, 7)} ${meetingCode.slice(7)}`;
  }

  return meetingCode;
}
  