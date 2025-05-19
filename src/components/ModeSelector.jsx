export default function ModeSelector({ mode, setMode }) {
  return (
    <div className="mode-selector">
      {["pomodoro", "short", "long"].map((m) => (
        <button
          key={m}
          className={mode === m ? "active" : ""}
          onClick={() => setMode(m)}
        >
          {m === "pomodoro" ? "Pomodoro" : m === "short" ? "Short Break" : "Long Break"}
        </button>
      ))}
    </div>
  );
}
