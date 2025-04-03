import { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";

export default function PomodoroTimer() {
  const [mode, setMode] = useState("focus");
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [cycles, setCycles] = useState(0);
  const timerRef = useRef(null);

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // Toggle timer
  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  // Reset timer
  const resetTimer = () => {
    setIsActive(false);
    setMode("focus");
    setTimeLeft(25 * 60);
    setCycles(0);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  // Switch between focus and break modes
  const switchMode = () => {
    if (mode === "focus") {
      setMode("break");
      setTimeLeft(5 * 60); // 5-minute break
      setCycles(cycles + 1);
    } else {
      setMode("focus");
      setTimeLeft(25 * 60); // 25-minute focus
    }
  };

  // Timer effect
  useEffect(() => {
    if (isActive) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timerRef.current);
            setTimeout(switchMode, 500);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isActive]);

  // Notification when timer ends
  useEffect(() => {
    if (timeLeft === 0) {
      if ("Notification" in window) {
        if (Notification.permission === "granted") {
          new Notification(
            `${mode === "focus" ? "Focus" : "Break"} time is up!`
          );
        } else if (Notification.permission !== "denied") {
          Notification.requestPermission();
        }
      }
    }
  }, [timeLeft, mode]);

  return (
    <div className="pomodoro-timer">
      <h2>Pomodoro Timer</h2>
      <div className={`timer-display ${mode}`}>
        <div className="timer-mode">
          {mode === "focus" ? "Focus Time" : "Break Time"}
        </div>
        <div className="timer-time">{formatTime(timeLeft)}</div>
        <div className="timer-cycles">Cycles: {cycles}</div>
      </div>
      <div className="timer-controls">
        <button className="timer-button" onClick={toggleTimer}>
          {isActive ? <Pause /> : <Play />}
        </button>
        <button className="timer-button" onClick={resetTimer}>
          <RotateCcw />
        </button>
      </div>
    </div>
  );
}
