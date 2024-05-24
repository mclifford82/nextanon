// src/utils/utils.js

export function getNextMeetingDate(meetingDay, meeting_time) {
    const today = new Date();
    const todayDayOfWeek = today.getDay();
    let daysUntilNextMeeting = meetingDay - todayDayOfWeek;
  
    if (daysUntilNextMeeting < 0) {
      daysUntilNextMeeting += 7;
    } else if (daysUntilNextMeeting === 0) {
      const currentHour = today.getHours();
      const currentMinutes = today.getMinutes();
      const [meetingHour, meetingMinutes] = meeting_time.split(':').map(Number);
  
      const currentTimeInMinutes = currentHour * 60 + currentMinutes;
      const meetingTimeInMinutes = meetingHour * 60 + meetingMinutes;
  
      if (currentTimeInMinutes >= meetingTimeInMinutes) {
        daysUntilNextMeeting += 7;
      }
    }
  
    const nextMeetingDate = new Date(today);
    nextMeetingDate.setDate(today.getDate() + daysUntilNextMeeting);
    // Add the time to nextMeetingDate
    const [hours, minutes] = meeting_time.split(':').map(Number);
    nextMeetingDate.setHours(hours, minutes, 0);
    return nextMeetingDate;
  }
  
  export function getDisplayTimeFromTwentyFourHourTime(time) {
    const [hours, minutes] = time.split(':').map(Number);
    const isPM = hours >= 12;
    const displayHours = hours % 12 || 12;
    const displayMinutes = minutes.toString().padStart(2, '0');
    return `${displayHours}:${displayMinutes} ${isPM ? 'PM' : 'AM'}`;
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
  