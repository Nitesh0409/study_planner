import { useState } from "react";
import { Calendar, Plus, Trash } from "lucide-react";

export default function TaskList({ tasks, subjects, addTask, updateTaskStatus, deleteTask, selectedSubject }) {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskSubject, setNewTaskSubject] = useState("");
  const [newTaskDeadline, setNewTaskDeadline] = useState("");

  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTaskTitle.trim() && newTaskSubject) {
      addTask({
        id: Date.now().toString(),
        title: newTaskTitle,
        subjectId: newTaskSubject,
        deadline: newTaskDeadline ? new Date(newTaskDeadline) : null,
        completed: false,
        createdAt: new Date(),
      });
      setNewTaskTitle("");
      setNewTaskDeadline("");
    }
  };

  // Format date for display
  const formatDate = (date) => {
    if (!date) return "No deadline";
    return new Date(date).toLocaleDateString();
  };

  // Get subject color
  const getSubjectColor = (subjectId) => {
    const subject = subjects.find((s) => s.id === subjectId);
    return subject ? subject.color : "#ccc";
  };

  // Get subject name
  const getSubjectName = (subjectId) => {
    const subject = subjects.find((s) => s.id === subjectId);
    return subject ? subject.name : "Unknown";
  };

  return (
    <div className="task-list">
      <h2>Tasks</h2>

      {subjects.length > 0 ? (
        <form className="add-task-form" onSubmit={handleAddTask}>
          <input
            type="text"
            placeholder="Add new task"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            required
          />
          <select
            value={newTaskSubject || selectedSubject || ""}
            onChange={(e) => setNewTaskSubject(e.target.value)}
            required
          >
            <option value="" disabled>
              Select subject
            </option>
            {subjects.map((subject) => (
              <option key={subject.id} value={subject.id}>
                {subject.name}
              </option>
            ))}
          </select>
          <div className="deadline-input">
            <Calendar size={16} />
            <input type="date" value={newTaskDeadline} onChange={(e) => setNewTaskDeadline(e.target.value)} />
          </div>
          <button type="submit" className="add-button">
            <Plus size={16} />
          </button>
        </form>
      ) : (
        <p className="no-subjects-message">Add a subject first to create tasks</p>
      )}

      {tasks.length > 0 ? (
        <ul className="tasks">
          {tasks.map((task) => (
            <li key={task.id} className={`task-item ${task.completed ? "completed" : ""}`}>
              <div className="task-checkbox">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={(e) => updateTaskStatus(task.id, e.target.checked)}
                  id={`task-${task.id}`}
                />
                <label htmlFor={`task-${task.id}`}></label>
              </div>
              <div className="task-content">
                <div className="task-title">{task.title}</div>
                <div className="task-details">
                  <span className="task-subject" style={{ backgroundColor: getSubjectColor(task.subjectId) }}>
                    {getSubjectName(task.subjectId)}
                  </span>
                  <span className="task-deadline">{formatDate(task.deadline)}</span>
                </div>
              </div>
              <button className="delete-button" onClick={() => deleteTask(task.id)}>
                <Trash size={14} />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-tasks-message">No tasks yet</p>
      )}
    </div>
  );
}
