import TaskList from '@/components/TaskList';
import TaskForm from '@/components/TaskForm';

const TasksPage: React.FC = () => {
  return (
    <div>
      <TaskList />
      <TaskForm />
    </div>
  );
};

export default TasksPage;