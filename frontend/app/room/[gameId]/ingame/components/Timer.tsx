import clsx from "clsx";
import styles from "./Timer.module.scss";

import { HTMLAttributes, useState } from "react";
import { useInterval } from "usehooks-ts";

const REMAIN_TIME = 15;

interface TimerProps extends HTMLAttributes<HTMLDivElement> {
  onTerminate?: () => void;
}

export default function Timer({ onTerminate, ...props }: TimerProps) {
  const [seconds, setSeconds] = useState(REMAIN_TIME);

  useInterval(() => {
    if (seconds === 0) {
      onTerminate && onTerminate();
    }

    if (seconds > 0) {
      setSeconds(prev => prev - 1);
    }
  }, 1000);

  return (
    <div {...props} className={styles["base-timer"]}>
      <svg
        className={styles["base-timer__svg"]}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g className={styles["base-timer__circle"]}>
          <circle
            className={styles["base-timer__path-elapsed"]}
            cx="50"
            cy="50"
            r="45"
          ></circle>
          <_Path seconds={seconds} />
        </g>
      </svg>
      <span id="base-timer-label" className={styles["base-timer__label"]}>
        {formatTime(seconds)}
      </span>
    </div>
  );
}

const _Path = ({ seconds }: { seconds: number }) => {
  return (
    <path
      id="base-timer-path-remaining"
      strokeDasharray="283"
      className={clsx(
        "base-timer__path-remaining",
        setRemainingPathColor(seconds),
      )}
      d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
    ></path>
  );
};

// startTimer();

// function onTimesUp() {
//   clearInterval(timerInterval);
// }

// function startTimer() {
//   timerInterval = setInterval(() => {
//     timePassed = timePassed += 1;
//     timeLeft = TIME_LIMIT - timePassed;
//     document.getElementById("base-timer-label").innerHTML =
//       formatTime(timeLeft);
//     setCircleDasharray();
//     setRemainingPathColor(timeLeft);

//     if (timeLeft === 0) {
//       onTimesUp();
//     }
//   }, 1000);
// }

const WARNING_THRESHOLD = 10;
const ALERT_THRESHOLD = 5;
const COLOR_CODES = {
  info: {
    color: "green",
  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD,
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD,
  },
};

const pad = (time: number) => {
  if (time < 10) {
    return `0${time}`;
  }
  return String(time);
};

function formatTime(seconds: number) {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return `${pad(min)}:${pad(sec)}`;
}

function setRemainingPathColor(seconds: number) {
  const { alert, warning, info } = COLOR_CODES;
  if (seconds <= alert.threshold) {
    return alert.color;
  }

  if (seconds <= warning.threshold) {
    return warning.color;
  }

  return info.color;
}

// function calculateTimeFraction() {
//   const rawTimeFraction = timeLeft / TIME_LIMIT;
//   return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
// }
