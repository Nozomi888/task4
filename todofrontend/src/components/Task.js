import React from 'react';

const Task = ({ task, onToggle, onDelete, onEdit }) => {
  const handleToggle = () => {
    onToggle(task.id);
  };

  const handleEdit = () => {
    const newTitle = prompt('Enter new title:', task.title);
    if (newTitle) {
      const updatedTask = { ...task, title: newTitle };
      onEdit(updatedTask);
    }
  };

  return (
    <div className={`task ${task.completed ? 'completed' : ''}`}>
      <div className="task-info">
        <input 
          type="checkbox" 
          checked={task.completed} 
          onChange={handleToggle}
        />
        <h3 className={task.completed ? 'completed' : ''}>{task.title}</h3>
      </div>
      <div className="button-group">
        <button className="edit-btn" onClick={handleEdit}>
          <i className="fas fa-edit"></i>
        </button>
        <button className="delete-btn" onClick={() => onDelete(task.id)}>
          <i className="fas fa-trash-alt"></i>
        </button>
      </div>
    </div>
  );
};

export default Task;




