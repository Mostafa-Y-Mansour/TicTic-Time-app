import { useEffect, useState } from "react";

import "./App.css";

interface ITimeInputs {
  seconds: string;
  minutes: string;
  hours: string;
}

function App() {
  // ChangeEvent<HTMLInputElement>
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;

  function calculateTimeLeft() {
    const timeLeft = {
      hours: Math.floor(difference / (1000 * 60 * 60)),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };

    return timeLeft;
  }

  const [timeInputs, setTimeInputs] = useState<ITimeInputs>({
    hours: "",
    minutes: "",
    seconds: "",
  });

  const [timer, setTimer] = useState(+new Date());
  const difference = timer - +new Date();

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  const startHandler = () => {
    const { seconds, minutes, hours } = timeInputs;
    setTimer(
      +new Date(
        +new Date() + +seconds * second + +minutes * minute + +hours * hour
      )
    );
  };
  const stopHandler = () => {
    setTimer(+new Date());
  };

  useEffect(() => {
    if (difference <= 0) return;

    setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
  }, [calculateTimeLeft, difference, timeLeft]);

  return (
    <>
      <p className="timer">
        {timeLeft.hours} : {timeLeft.minutes} : {timeLeft.seconds}
      </p>
      <div>
        {Object.keys(timeInputs).map((key: string, index) => {
          return (
            <>
              <input
                className="time-input"
                key={index}
                type="number"
                min={0}
                max={60}
                placeholder={`-`}
                value={timeInputs[key as keyof typeof timeInputs]}
                onChange={(e) =>
                  setTimeInputs({ ...timeInputs, [key]: e.target.value })
                }
              />
            </>
          );
        })}
      </div>

      <button onClick={startHandler}>start</button>
      <button onClick={stopHandler}>stop</button>
    </>
  );
}

export default App;
