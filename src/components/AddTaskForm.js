// components/AddTaskForm.js

import React, { useState } from 'react';
import useTaskStore from '../store/useTaskStore';

const AddTaskForm = () => {
  const [title, setTitle] = useState('');
  const { addTask } = useTaskStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask({ id: Math.random(), title, status: 'ToDo' });
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a task"
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default AddTaskForm;