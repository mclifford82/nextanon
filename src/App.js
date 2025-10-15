import './App.scss';

function App() {
  let daysClean;
  // calculate days clean from 1/9/2023
  const startDate = new Date('2024-01-09');
  const currentDate = new Date();
  const timeDiff = currentDate - startDate;
  daysClean = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

  return (
    <>
      <div class="noise"></div>
      <div class="overlay"></div>
      <div class="terminal">
        <h1><span class="errorcode">{daysClean}</span> service unavailable</h1>
        <p class="output">Nextanon has taken <span class="errorcode">42069</span> damage and has been felled.</p>
        <p class="output">I'm no longer part of the TIAWO community and have no interest in promoting their meetings. That's all the detail I'm going into.</p>
        <p class="output">Do whatever you need to do to stay off Kratom. Your recovery is your own. Guard it with your life.</p>
        <p class="output">Deuces. ✌</p>
      </div>
    </>
  );
}

export default App;
