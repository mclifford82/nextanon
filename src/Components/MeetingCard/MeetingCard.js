import React from 'react';
import './MeetingCard.scss'; // Import CSS for styling
import { getDisplayTimeFromTwentyFourHourTime } from '../../utils/utils'; // Import function to convert 24-hour time to 12-hour time

// Function to convert day number to day name
function numberToDay(number) {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return days[(number) % 7];
}

function MeetingCard({ meeting: m }) {
  return (
    <article className="information card">
      <h2 class="title">{m.name}</h2>
      <span className="tag">{m.meeting_type}</span>
      <p>{numberToDay(m.meeting_day)} @ {getDisplayTimeFromTwentyFourHourTime(m.meeting_time)} {m.meeting_tz}</p>
      <p className="info">{m.meeting_notes}</p>
      <button class="button">
        <span>Join Meeting</span>
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="none">
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M16.01 11H4v2h12.01v3L20 12l-3.99-4v3z" fill="currentColor" />
          </svg>
      </button>
      <p>Password: {m.meeting_pw}</p>
    </article>
  );
}

export default MeetingCard;