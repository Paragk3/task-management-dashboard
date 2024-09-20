// components/TaskList.js

import React from 'react';
import useTaskStore from '../store/useTaskStore';

const TaskList = () => {
  const { tasks } = useTaskStore();

  return (
    <div>
      <h2>Task List</h2>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;