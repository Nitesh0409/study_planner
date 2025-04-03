import { NotebookPen, Sun, Moon } from "lucide-react";

export default function Header({ darkMode, toggleDarkMode }) {
  return (
    <header className="header">
      <div className="logo">
        <NotebookPen className="logo-icon" />
        <h1>Study Planner</h1>
      </div>
      <button className="theme-toggle" onClick={toggleDarkMode}>
        {darkMode ? <Sun /> : <Moon />}
      </button>
    </header>
  );
}
