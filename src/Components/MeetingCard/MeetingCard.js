import React from 'react';
import './MeetingCard.scss'; // Import CSS for styling
import { getDisplayTimeFromTwentyFourHourTime, formatZoomMeetingCode } from '../../utils/utils'; // Import function to convert 24-hour time to 12-hour time

// Function to convert day number to day name
function numberToDay(number) {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return days[(number) % 7];
}

function MeetingCard({ meeting: m }) {
  return (
    <article className="information card">
      <h2 className="title">{m.name}</h2>
      <span className="tag">{m.meeting_type}</span>
      <p className="smol">{numberToDay(m.meeting_day)} @ {getDisplayTimeFromTwentyFourHourTime(m.meeting_time)} {m.meeting_tz}</p>
      <p className="info">{m.meeting_notes}</p>
      <p className="smol">{m.meeting_service}: { m.meeting_service == "Zoom" ? formatZoomMeetingCode(m.meeting_service_code) : m.meeting_service_code }</p>
      <p className="smol">Password: {m.meeting_pw}</p>
      <a href={m.meeting_link} className="button" target="_blank">
        <span>Join Meeting</span>
      </a>
    </article>
  );
}

export default MeetingCard;