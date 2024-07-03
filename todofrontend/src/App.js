import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:8080/todo');
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("There was an error fetching the tasks!", error);
    }
  };

  const addTask = async () => {
    try {
      const newTask = { title, completed: false };
      const response = await fetch('http://localhost:8080/todo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      });
      if (!response.ok) {
        throw new Error('Failed to add task');
      }
      fetchTasks();
      setTitle('');
    } catch (error) {
      console.error("There was an error adding the task!", error);
    }
  };

  const toggleTask = async (id) => {
    try {
      const task = tasks.find(task => task.id === id);
      if (!task) return;

      const updatedTask = { ...task, completed: !task.completed };
      const response = await fetch(`http://localhost:8080/todo/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTask),
      });
      if (!response.ok) {
        throw new Error('Failed to toggle task');
      }
      fetchTasks();
    } catch (error) {
      console.error("There was an error toggling the task!", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/todo/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete task');
      }
      fetchTasks();
    } catch (error) {
      console.error("There was an error deleting the task!", error);
    }
  };

  const editTask = async (updatedTask) => {
    try {
      const response = await fetch(`http://localhost:8080/todo/${updatedTask.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTask),
      });
      if (!response.ok) {
        throw new Error('Failed to update task');
      }
      fetchTasks();
    } catch (error) {
      console.error("There was an error updating the task!", error);
    }
  };

  return (
    <div className="App">
      <div className="todo-container">
        <h1>Todo List</h1>
        <div className="task-input">
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            placeholder="Add a new task" 
          />
          <button onClick={addTask}>Add Task</button>
        </div>
        <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} onEdit={editTask} />
      </div>
    </div>
  );
};

export default App;

