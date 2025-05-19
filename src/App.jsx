import { useEffect, useState, useRef } from "react";
import TimerDisplay from "./components/TimerDisplay";
import ModeSelector from "./components/ModeSelector";
import Controls from "./components/Controls";
import TaskList from "./components/TaskList";
import { POMODORO, SHORT_BREAK, LONG_BREAK, CYCLE } from "./config";
import "./styles/styles.css";

export default function App() {
  const [mode, setMode] = useState("pomodoro");
  const [seconds, setSeconds] = useState(POMODORO);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionCount, setSessionCount] = useState(0);
  const timerRef = useRef(null);
  const audioRef = useRef(new Audio("/beep.mp3")); // tempatkan beep.mp3 di public

  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => {
          if (prev <= 1) {
            audioRef.current.play();
            handleSessionEnd();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    const timeMap = {
      pomodoro: POMODORO,
      short: SHORT_BREAK,
      long: LONG_BREAK,
    };
    setSeconds(timeMap[mode]);
    setIsRunning(false);
  }, [mode]);

  const handleSessionEnd = () => {
    if (mode === "pomodoro") {
      setSessionCount((s) => s + 1);
      if ((sessionCount + 1) % CYCLE === 0) {
        setMode("long");
      } else {
        setMode("short");
      }
    } else {
      setMode("pomodoro");
    }
  };

  return (
    <main className={`app ${mode}`}>
      <h1>Pomofocus Clone</h1>
      <ModeSelector mode={mode} setMode={setMode} />
      <TimerDisplay seconds={seconds} />
      <Controls
        isRunning={isRunning}
        onStart={() => setIsRunning(true)}
        onPause={() => setIsRunning(false)}
      />
      <p># {sessionCount + 1} {mode === "pomodoro" ? "Time to focus!" : "Take a break!"}</p>
      <TaskList />
    </main>
  );
}
