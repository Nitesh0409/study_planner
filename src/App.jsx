import { useState, useEffect } from "react";
import SubjectListComponent from "./components/SubjectList";
import TaskListComponent from "./components/TaskList";
import PomodoroTimerComponent from "./components/PomodoroTimer";
import ProgressTrackerComponent from "./components/ProgressTracker";
import HeaderComponent from "./components/Header";
import './styles/global.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);

  // Loading data from local storage.
  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    const savedSubjects = localStorage.getItem("subjects");
    const savedTasks = localStorage.getItem("tasks");

    if (savedDarkMode) setDarkMode(JSON.parse(savedDarkMode));
    if (savedSubjects) setSubjects(JSON.parse(savedSubjects));
    if (savedTasks) setTasks(JSON.parse(savedTasks));
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    localStorage.setItem("subjects", JSON.stringify(subjects));
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [darkMode, subjects, tasks]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Add a new subject
  const addSubject = (subject) => {
    setSubjects([...subjects, subject]);
  };

  // Delete a subject and its associated tasks
  const deleteSubject = (id) => {
    setSubjects(subjects.filter((subject) => subject.id !== id));
    setTasks(tasks.filter((task) => task.subjectId !== id));
    if (selectedSubject === id) {
      setSelectedSubject(null);
    }
  };

  // Add a new task
  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  // Update task status (complete/incomplete)
  const updateTaskStatus = (id, completed) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed } : task)));
  };

  // Delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Filter tasks by selected subject
  const filteredTasks = selectedSubject ? tasks.filter((task) => task.subjectId === selectedSubject) : tasks;

  return (
    <div className={`app-container ${darkMode ? "dark-mode" : ""}`}>
      <HeaderComponent darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <main className="main-content">
        <div className="sidebar">
          <SubjectListComponent
            subjects={subjects}
            addSubject={addSubject}
            deleteSubject={deleteSubject}
            selectedSubject={selectedSubject}
            setSelectedSubject={setSelectedSubject}
          />
          <PomodoroTimerComponent />
        </div>

        <div className="content">
          <ProgressTrackerComponent tasks={tasks} />
          <TaskListComponent
            tasks={filteredTasks}
            subjects={subjects}
            addTask={addTask}
            updateTaskStatus={updateTaskStatus}
            deleteTask={deleteTask}
            selectedSubject={selectedSubject}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
