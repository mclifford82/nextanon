import React, { useState, useEffect } from 'react';
import MeetingCard from './Components/MeetingCard/MeetingCard';
import { getNextMeetingDate } from './utils/utils';
import './App.scss';

function App() {
  const [meetings, setMeetings] = useState([]);
  
  useEffect(() => {
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
      <h1>NextAnon - find your next virtual support meeting, quick</h1>
      <div className="cards">
        {meetings.map(meeting => (
          <MeetingCard key={meeting.id} meeting={meeting} />
        ))}
      </div>
    </div>
  );
}

export default App;
