export default function Controls({ isRunning, onStart, onPause }) {
  return (
    <button onClick={isRunning ? onPause : onStart} className="control-btn">
      {isRunning ? "PAUSE" : "START"}
    </button>
  );
}
