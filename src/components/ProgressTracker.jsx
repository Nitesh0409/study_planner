export default function ProgressTracker({ tasks }) {
  // Calculate completion percentage
  const calculateCompletion = () => {
    if (tasks.length === 0) return 0;
    const completedTasks = tasks.filter((task) => task.completed).length;
    return Math.round((completedTasks / tasks.length) * 100);
  };

  const completionPercentage = calculateCompletion();

  return (
    <div className="progress-tracker">
      <h2>Progress</h2>
      <div className="progress-container">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${completionPercentage}%` }}></div>
        </div>
        <div className="progress-percentage">{completionPercentage}%</div>
      </div>
      <div className="progress-stats">
        <div className="stat">
          <span className="stat-value">{tasks.length}</span>
          <span className="stat-label">Total Tasks</span>
        </div>
        <div className="stat">
          <span className="stat-value">{tasks.filter((task) => task.completed).length}</span>
          <span className="stat-label">Completed</span>
        </div>
        <div className="stat">
          <span className="stat-value">{tasks.filter((task) => !task.completed).length}</span>
          <span className="stat-label">Remaining</span>
        </div>
      </div>
    </div>
  );
}
