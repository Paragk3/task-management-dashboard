import { useState, useEffect } from 'react';
import { Task } from '../types/task';
import axios from 'axios';

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('/api/tasks', {
          headers: {
            'x-auth-token': localStorage.getItem('token'),
          },
        });
        setTasks(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTasks();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Task List</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tasks.map((task) => (
            <div key={task._id} className="p-4 bg-white rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">{task.title}</h3>
              <p className="text-gray-600 mb-2">{task.description}</p>
              <p className="text-gray-500">Status: {task.status}</p>
              <p className="text-gray-500">Priority: {task.priority}</p>
              <p className="text-gray-500">Due Date: {task.dueDate.toDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;