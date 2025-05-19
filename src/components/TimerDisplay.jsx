export default function TimerDisplay({ seconds }) {
  const minutes = String(Math.floor(seconds / 60)).padStart(2, '0');
  const secs = String(seconds % 60).padStart(2, '0');
  return <h1 className="timer">{minutes}:{secs}</h1>;
}
