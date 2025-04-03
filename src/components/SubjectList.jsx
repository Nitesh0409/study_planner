import { useState } from "react";
import { Plus, Trash } from "lucide-react";

export default function SubjectList({
  subjects,
  addSubject,
  deleteSubject,
  selectedSubject,
  setSelectedSubject,
}) {
  const [newSubjectName, setNewSubjectName] = useState("");
  const [newSubjectColor, setNewSubjectColor] = useState("#3498db");

  const handleAddSubject = (e) => {
    e.preventDefault();
    if (newSubjectName.trim()) {
      addSubject({
        id: Date.now().toString(),
        name: newSubjectName,
        color: newSubjectColor,
      });
      setNewSubjectName("");
    }
  };

  return (
    <div className="subject-list">
      <h2>Subjects</h2>

      <form className="add-subject-form" onSubmit={handleAddSubject}>
        <input
          type="text"
          placeholder="Add new subject"
          value={newSubjectName}
          onChange={(e) => setNewSubjectName(e.target.value)}
          required
        />
        <input
          type="color"
          value={newSubjectColor}
          onChange={(e) => setNewSubjectColor(e.target.value)}
          className="color-picker"
        />
        <button type="submit" className="add-button">
          <Plus size={16} />
        </button>
      </form>

      <ul className="subjects">
        <li
          className={`subject-item ${
            selectedSubject === null ? "selected" : ""
          }`}
          onClick={() => setSelectedSubject(null)}
        >
          All Subjects
        </li>
        {subjects.map((subject) => (
          <li
            key={subject.id}
            className={`subject-item ${
              selectedSubject === subject.id ? "selected" : ""
            }`}
            onClick={() => setSelectedSubject(subject.id)}
          >
            <span
              className="subject-color"
              style={{ backgroundColor: subject.color }}
            ></span>
            <span className="subject-name">{subject.name}</span>
            <button
              className="delete-button"
              onClick={(e) => {
                e.stopPropagation();
                deleteSubject(subject.id);
              }}
            >
              <Trash size={14} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
