import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';
import MeetingCard from './Components/MeetingCard/MeetingCard';
import { convertUTCToLocalTime, getNextMeetingDate } from './utils/utils';
import './App.scss';

function App() {
  const [meetings, setMeetings] = useState([]);
  
  useEffect(() => {
    fetch(process.env.PUBLIC_URL + '/data_utc.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Update meetings with useful information
        data.forEach(meeting => {
          meeting.next_meeting_date_utc = getNextMeetingDate(meeting.meeting_day, meeting.meeting_time_hour, meeting.meeting_time_minute);
          meeting.next_meeting_date_local = moment(convertUTCToLocalTime(meeting.next_meeting_date_utc));
          meeting.next_meeting_date_local_end = meeting.next_meeting_date_local.clone().add(1, 'hour');
          // For display
          meeting.next_meeting_date_local_hour = meeting.next_meeting_date_local.format('H');
          meeting.next_meeting_date_local_minute = meeting.next_meeting_date_local.format('mm');
          meeting.next_meeting_date_local_ampm = meeting.next_meeting_date_local.format('A');
        });

        // Sort based on next_meeting_date_local_end, but only if the time is in the future. 
        // We use _end to sort by the end time, which allows in progress meetings to be visible
        const now = moment();
        const sortedData = data.filter(meeting => meeting.next_meeting_date_local_end.isAfter(now));
        sortedData.sort((a, b) => a.next_meeting_date_local_end - b.next_meeting_date_local_end);

        setMeetings(sortedData);
      })
      .catch(error => console.error('Error loading the data: ', error));
  }, []);

  return (
    <div className="App">
      
      <div className="header">
        NextAnon - find your next virtual support meeting, quick
      </div>

      <div className="cards">
        {meetings.map(meeting => (
          <MeetingCard key={meeting.id} meeting={meeting} />
        ))}
      </div>
      
      <p className="lastupdated">
        Shoutout to my signal/dopey homies. Data last updated 01/15/2025.<br />
        <img src={process.env.PUBLIC_URL + '/yosh.png'} alt="Yoshi the Nerd" />
      </p>
          
    </div>
  );
}

export default App;
