import { useState } from "react";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");

  const addTask = () => {
    if (text.trim()) {
      setTasks([...tasks, text.trim()]);
      setText("");
    }
  };
  

  return (
    <div className="task-list">
      <h2>Tasks</h2>
      <input
        type="text"
        placeholder="Add Task"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={addTask}>+ Add Task</button>
      <ul>
        {tasks.map((task, i) => (
          <li key={i}>✅ {task}</li>
        ))}
      </ul>
    </div>
  );
}
