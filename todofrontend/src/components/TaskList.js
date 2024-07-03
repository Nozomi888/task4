import React from 'react';
import Task from './Task';

const TaskList = ({ tasks, onToggle, onDelete, onEdit }) => {
  return (
    <div className="task-list">
      {tasks.map(task => (
        <Task 
          key={task.id} 
          task={task} 
          onToggle={onToggle} 
          onDelete={onDelete} 
          onEdit={onEdit} 
        />
      ))}
    </div>
  );
};

export default TaskList;


