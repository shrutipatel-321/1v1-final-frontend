import React, { useEffect, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate } from 'react-router-dom';

const Timer = (gameState) => {
  const [seconds, setSeconds] = useState(60);
  const navigate=useNavigate();
  //console.log(gameState);
  useEffect(() => {
    if (seconds > 0) {
      const timer = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      navigate(`/game-start/${gameState.gameState.game_id}/${gameState.gameState.participant_id}`)
    }
  }, [seconds,navigate]);

  // Calculate the percentage for the progress bar
  const percentage = (seconds / 60) * 100;
  const displayText = `Game Start ${seconds}`;
  return (
    <>
    {/* //<p>Game ID: {gameState.gameState.game_id}</p>
    <p>Participant ID: {gameState.participant_id}</p> */}
    <p>Participant: {gameState.gameState.username}</p>
    <div style={{ width: 400, height: 400, margin: '0 auto' }}>
      <CircularProgressbar
        value={percentage}
        text={displayText}
        styles={buildStyles({
          textColor: '#333',
          pathColor: '#00bfff',
          trailColor: 'darkblue',
          textSize: '10px'
        })}
      />
      <div style={{ textAlign: 'center', marginTop: '20px', color: '#fff', fontSize: '24px' }}>MINUTES</div>
    </div>
    </>
  );
};

export default Timer;
