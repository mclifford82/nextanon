import React from 'react';
import moment from 'moment';
import './MeetingCard.scss';
import { formatZoomMeetingCode } from '../../utils/utils';

function MeetingCard({ meeting: m }) {
  
  const local_weekday = m.next_meeting_date_local.format('dddd')
  const local_hour = m.next_meeting_date_local_hour > 12 ? m.next_meeting_date_local_hour - 12 : m.next_meeting_date_local_hour;
  const local_minute = m.next_meeting_date_local_minute;
  const ampm = m.next_meeting_date_local_ampm;

  let time_until = moment().to(m.next_meeting_date_local);
  // remove 'in' and 'a' from time_until
  time_until = time_until.replace(/in|a/, '').trim();
  // if time_until contains 'ago', change it to 'in progress'. Only meetings that are in progress will have 'ago' in the time_until string
  time_until = time_until.includes('ago') ? 'in progress' : time_until;

  return (
    <article className="information card">
      <h2 className="title">{m.name}</h2>
      <span className="tag">{m.meeting_type}</span>
      <p className="smol">{local_weekday} @ {local_hour}:{local_minute} {ampm} <em className="smoler">({time_until})</em></p>
      <p className="info">{m.meeting_notes}</p>
      <p className="smol">{m.meeting_service}: { m.meeting_service === "Zoom" ? formatZoomMeetingCode(m.meeting_service_code) : m.meeting_service_code }</p>
      <p className="smol">Password: {m.meeting_pw}</p>
      <a href={m.meeting_link} className="button" target="_blank" rel="noreferrer">
        <span>Join Meeting</span>
      </a>
    </article>
  );
}

export default MeetingCard;