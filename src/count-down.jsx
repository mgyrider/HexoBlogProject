import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './count-down.css'

const formatTime = (param) => {
  let str = String(Math.trunc(param));
  return str.padStart(2, '0');
};

const ShowTime = ({ countDown }) => {
  let count = countDown > 0 ? countDown : 0;
  const hh = count / (60 * 60);
  const mm = (count % (60 * 60) / 60);
  const ss = (count % 60);
  return (
      <p className="timeText"> <b>{`${formatTime(hh)}:${formatTime(mm)}:${formatTime(ss)}`} </b> </p>
    );
}


const CountDown = () => {
  const datetimeRef = React.useRef();
  const [countDown, setCountDown] = React.useState(0);
  const [deadline, setDeadLine] = React.useState(0);
  const [isTimerRunning, setIsTimerRunning] = React.useState(false);

  const handleConfirm = () => {
    const value = new Date(datetimeRef.current.value).getTime();
    if (value > Date.now()) {
      window.location.hash = `${datetimeRef.current.value}`;
      setDeadLine(value);
      setCountDown(0);
      setIsTimerRunning(true);
    } else {
      alert("Input is invalid!")
    }
  };

  const handleReset = () => {
    datetimeRef.current.value = "";
    window.location.hash = "";
    setCountDown(0);
    setIsTimerRunning(false);
  };

  React.useEffect(() => {
    // check value of hash
    if (window.location.hash.length <= 0) {
      return;
    }
    const timeText = window.location.hash.slice(1);
    let target = new Date(timeText).getTime();
    if (target) {
      datetimeRef.current.value = timeText;
      setDeadLine(target);
      setIsTimerRunning(true);
    } else {
      alert("Hash of url is invalid!")
    }
    return;
  }, []);

  React.useEffect(() => {
    if (countDown < 0) {
      setIsTimerRunning(false);
    }
  }, [countDown]);

  React.useEffect(() => {
    if (!isTimerRunning) {
      return;
    }
    const timer = setInterval(() => {
      setCountDown(Math.floor((deadline - Date.now()) / 1000));
    }, 1000);

    console.log("timer start");

    return () => {
      console.log("timer stop");
      clearInterval(timer);
    };
  }, [isTimerRunning, deadline]);

  return (
    <>
      <div className='timeContorl'>
        <label htmlFor="targetTime">Set a deadline:</label>
        <input type="datetime-local" ref={datetimeRef} id="targetTime" ></input>
        <button type="button" onClick={handleConfirm}> confirm </button>
        <button type="button" onClick={handleReset}> reset </button>
      </div>
      <div className={"countDown" + (countDown < 0 ? " timeoutFlash" : "")}>
        <ShowTime countDown={countDown} />
      </div>
    </>
  );
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CountDown />
  </StrictMode>,
)
