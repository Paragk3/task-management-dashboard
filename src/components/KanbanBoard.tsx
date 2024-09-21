import { useState, useEffect } from 'react';
import { Task } from '../types/task';
import axios from 'axios';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const KanbanBoard: React.FC = () => {
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

  const handleOnDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTasks(items);

    // Update task status on the backend (add this logic)
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Kanban Board</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex gap-4">
          <Droppable droppableId="pending">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="bg-gray-100 rounded-lg p-4 flex flex-col gap-4"
              >
                <h2 className="text-xl font-semibold">Pending</h2>
                {tasks
                  .filter((task) => task.status === 'pending')
                  .map((task, index) => (
                    <Draggable key={task._id} draggableId={task._id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="bg-white rounded-lg p-3 shadow-md cursor-move"
                        >
                          {task.title}
                        </div>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          {/* Implement similar Droppable components for 'inProgress' and 'done' statuses */}
        </div>
      )}
  </div>
);
};

export default KanbanBoard;