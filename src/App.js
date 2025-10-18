import './App.scss';

function App() {
  // calculate days clean from 1/9/2024 at 9:30 am
  const startDate = new Date('2024-01-09T09:30:00');
  const currentDate = new Date();
  const diffTime = Math.abs(currentDate - startDate);
  const daysClean = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const dayWorkingOn = daysClean + 1;

  return (
    <>
      <img src="nokings.png" alt="Main" />
    </>
  );
}

export default App;
