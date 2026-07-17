import { useState } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [inputValue, setInputValue] = useState('')

  const addTask = (e) => {
    e.preventDefault()
    const text = inputValue.trim()
    if (!text) return
    setTasks((prev) => [
      ...prev,
      { id: crypto.randomUUID(), text, done: false },
    ])
    setInputValue('')
  }

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task,
      ),
    )
  }

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  return (
    <div className="task-board">
      <h1>タスクボード</h1>

      <form className="task-form" onSubmit={addTask}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="新しいタスクを入力"
          aria-label="新しいタスク"
        />
        <button type="submit">追加</button>
      </form>

      <ul className="task-list">
        {tasks.length === 0 && (
          <li className="empty-message">タスクはありません</li>
        )}
        {tasks.map((task) => (
          <li key={task.id} className={task.done ? 'task done' : 'task'}>
            <label>
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleTask(task.id)}
              />
              <span className="task-text">{task.text}</span>
            </label>
            <button
              type="button"
              className="delete-button"
              onClick={() => deleteTask(task.id)}
              aria-label={`${task.text}を削除`}
            >
              削除
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
