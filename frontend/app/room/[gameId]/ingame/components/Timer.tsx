import styles from "./Timer.module.scss";
import { useEffect, useRef, useState } from "react";
import { useTimer } from "../stores/useTimer";

const DEFAULT_TIME = 15;

export default function Timer() {
  const { isShowTimer } = useTimer();
  if (!isShowTimer) {
    return null;
  }
  return <Clock />;
}

function Clock() {
  const [seconds, setSeconds] = useState(DEFAULT_TIME);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const { handleCloseTimer } = useTimer();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (seconds === 0) {
        handleCloseTimer();
        return;
      }

      if (seconds > 0) {
        setSeconds(prev => prev - 1);
      }
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [seconds, handleCloseTimer]);

  return (
    <div className={styles["container"]}>
      <div className={styles["base-timer"]}>
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
              r="46"
              stroke={getColor(seconds)}
            ></circle>
            <Path seconds={seconds} />
          </g>
        </svg>
        <span id="base-timer-label" className={styles["base-timer__label"]}>
          {seconds}
        </span>
      </div>
    </div>
  );
}

const Path = ({ seconds }: { seconds: number }) => {
  return (
    <path
      id="base-timer-path-remaining"
      strokeDasharray={setCircleDasharray(seconds)}
      stroke={getColor(seconds)}
      className={styles[`base-timer__path-remaining`]}
      color={getColor(seconds)}
      d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
    ></path>
  );
};

const FULL_DASH_ARRAY = 283;

function calculateTimeFraction(seconds: number) {
  const rawTimeFraction = seconds / DEFAULT_TIME;
  return rawTimeFraction - (1 / DEFAULT_TIME) * (1 - rawTimeFraction);
}

function setCircleDasharray(seconds: number) {
  return `${(calculateTimeFraction(seconds) * FULL_DASH_ARRAY).toFixed(0)} ${FULL_DASH_ARRAY}`;
}

function getColor(seconds: number) {
  if (seconds <= 5) {
    return "red";
  }
  if (seconds <= 10) {
    return "orange";
  }
  return "rgb(65, 184, 131)";
}
