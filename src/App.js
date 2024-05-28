import React, { useState, useEffect } from 'react';
import MeetingCard from './Components/MeetingCard/MeetingCard';
import { getLocalGMTOffset, getNextMeetingDate } from './utils/utils';
import './App.scss';

function App() {
  const [meetings, setMeetings] = useState([]);
  const [userTimeOffset, setUserTimeOffset] = useState('');
  
  useEffect(() => {
    // Set users local offset for other components to use
    const offset = getLocalGMTOffset();
    setUserTimeOffset(offset);

    fetch(process.env.PUBLIC_URL + '/data.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Use getNextMeetingDate to sort the meetings by date
        const sortedData = data.sort((a, b) => {
          const aDate = getNextMeetingDate(a.meeting_day, a.meeting_time);
          const bDate = getNextMeetingDate(b.meeting_day, b.meeting_time);
          return aDate - bDate;
        });
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
      
      <p className="lastupdated">Shoutout to my signal homies. Data last updated 5/23/2024.</p>
    
    </div>
  );
}

export default App;
