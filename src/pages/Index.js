// pages/index.js

import React from 'react';
import AddTaskForm from '../components/AddTaskForm';
import TaskList from '../components/TaskList';
import KanbanBoard from '../components/KanbanBoard';

const Home = () => {
  return (
    <div className="p-4">
      <AddTaskForm />
      <TaskList />
      <KanbanBoard />
    </div>
  );
};

export default Home;